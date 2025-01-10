from concurrent.futures import ThreadPoolExecutor
import pandas as pd
import time 
from datetime import datetime
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from recaptcha_extension import get_driver
from drive_upload import upload_to_drive
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import argparse
import os 



def process_id_range(start,end,year):
    TIMEOUT = 10
    current_id = start
    driver = get_driver()
    time.sleep(5)
    data_list = []
    error_log = []

    while current_id <= end:
            
        print(f"Procesando ID {current_id}")

        entry_num = WebDriverWait(driver, timeout=TIMEOUT).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "input#numeroEntrada"))
        )
        entry_num.clear()
        entry_num.send_keys(f"{current_id}")

        year_input = WebDriverWait(driver, timeout=TIMEOUT).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "input#anio"))
        )
        year_input.clear()
        year_input.send_keys(year)

        search_button = WebDriverWait(driver, timeout=TIMEOUT).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.btn.btn-primary.btn-lg.btn-block"))
        )
        search_button.click()
        print(f'Busqueda del ID {current_id}')

        try:
            # Verificar y extraer datos si cumple la condición
            guardar_datos = False
            row_data = {}

                # time.sleep(4)
            h5_elements = WebDriverWait(driver, timeout=TIMEOUT).until(
                    EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.tabestado h5'))
            )
            ul_elements = driver.find_elements(By.CSS_SELECTOR, 'div.tabestado ul')

            for h5, ul in zip(h5_elements[1:], ul_elements):
                li_elements = ul.find_elements(By.TAG_NAME, 'li')
                li_text = [li.text.strip() for li in li_elements]

                if "Registro Constitución o Transferencia de Dominio de Bien Inmueble" in li_text:
                    guardar_datos = True
                    break

            if guardar_datos:
                dl_element = WebDriverWait(driver, timeout=TIMEOUT).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'div.tabestado dl.dl-horizontal'))
                )
                dt_elements = dl_element.find_elements(By.TAG_NAME, 'dt')
                dd_elements = dl_element.find_elements(By.TAG_NAME, 'dd')
                for dt, dd in zip(dt_elements, dd_elements):
                    row_data[dt.text.strip()] = dd.text.strip()

                data_list.append(row_data)

            # Limpiar para el siguiente ID

            close_modal(driver,current_id)
            clean_query(driver)

        except (NoSuchElementException, TimeoutException) as e:
            print(f"ID {current_id} no encontrado: {e}")
            error_log.append({"id": current_id, "error": f"Data no encontrada, o no se pudo scrapear."})
            try:
                close_modal(driver,current_id)
                clean_query(driver)
            except:
                try:
                    clean_query(driver)
                except:
                    driver.refresh()
            time.sleep(5)

        finally:
            current_id += 1


    return data_list, error_log


def close_modal(driver,current_id):
    """Cierra el modal si está abierto."""
    try:
        TIMEOUT = 5
        close_button = WebDriverWait(driver, timeout=TIMEOUT).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.blazored-modal-close"))
        )
        driver.execute_script("arguments[0].click();", close_button)
        
    except Exception:
        print(f"No se pudo cerrar la ventana en ID {current_id}. Puede que nunca se abrio")


def clean_query(driver):
    """Limpia la consulta para procesar un nuevo ID."""
    TIMEOUT = 5
    try:
        clean_button = WebDriverWait(driver, timeout=TIMEOUT).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
        )
        driver.execute_script("arguments[0].click();", clean_button)   
    except Exception as e:   
        print(f"No se pudo limpiar la consulta: {e}")
        
        

def parallel_scraping(start, end, year, workers=4):
    """Divide el rango de IDs y los procesa en paralelo."""

    step = (end - start) // workers
    ranges = [(start + i * step, start + (i + 1) * step - 1) for i in range(workers)]
    ranges[-1] = (ranges[-1][0], end)  # Asegura que el último subrango termine en 'end'
    print(ranges)

    all_data = []
    all_errors = []
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = [executor.submit(process_id_range, r[0], r[1], year) for r in ranges]
        for future in futures:
            data,error = future.result()
            all_data.extend(data)
            all_errors.extend(error)           
    return all_data,all_errors

def main(start_point,end_point,year,month_folder): 
    print(f"Scraping fron {start_point} to {end_point}")
    workers = 1 


    run_dt = datetime.now().strftime("%y-%m-%d_%H-%M-%S")
    start_time = time.time()

    all_data, all_errors = parallel_scraping(start_point, end_point, year, workers=workers)

    is_docker = os.getenv("DOCKER", "false").lower() == "true"
    if is_docker:
        SERVICE_ACCOUNT_FILE = '/app/service_account.json'
    else:
        SERVICE_ACCOUNT_FILE = r'C:\Users\carlo\Projects\registro_publico\service_account.json'
        
    # Autenticación
    credentials = Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=["https://www.googleapis.com/auth/drive"],
    )
    service = build('drive', 'v3', credentials=credentials)

    if month_folder == 'nov' and year == 2024: 
        FOLDER_ID_DATA = '1Ixw4cWU7XZucXc1BLiXgZzyDMh7NqwAW'
        FOLDER_ID_ERRORS = '1E4TSVxx0gb_GfZm4t6rxhLwgQWSB-Qq1'
    elif month_folder == 'jan' and year == 2025:
        FOLDER_ID_DATA = '1oSvCw5qfMq3VXxUfno46IiTpTrJW8dgd'
        FOLDER_ID_ERRORS = '1Op0Emhs7oAw8BR8WUMverg8s0z2Nc_yj'


    # Send scraped data to the API server
    if all_data:
        local_path_data = f'files/{year}/{month_folder}/data/rp_scrape_{run_dt}.csv'
        df = pd.DataFrame(all_data)
        df.to_csv(local_path_data, index=False)
        print(f'Data saved! Runtime: {run_dt}')

        # Subir a Google Drive
        try:
            upload_to_drive(service, local_path_data, FOLDER_ID_DATA)
        except:
            print('Data could not be saved to Drive..')

    else:
        print(f"No data to send. In Runtime: {run_dt}")

    if all_errors:
        local_path_errors = f'files/{year}/{month_folder}/errors/rp_scrape_errors_{run_dt}.csv'
        df_errors = pd.DataFrame(all_errors)
        df_errors.to_csv(local_path_errors, index=False)
        print(f'Error log saved! Runtime: {run_dt}')

         # Subir a Google Drive
        try:
            upload_to_drive(service, local_path_errors, FOLDER_ID_ERRORS)
        except:
            print('Errors could not be saved to Drive..')
            
    else:
        print(f"No errors logged. In Runtime: {run_dt}")

    end_time = time.time()
    print(f"Tiempo de ejecución: {(end_time - start_time)} segundos en total")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Script para scraping con argparse")
    parser.add_argument("--start_point", type=int, help="El punto de inicio del scrape",required=True)
    parser.add_argument("--end_point", type=int, help="Punto final del scrape")
    parser.add_argument("--year", type=int, help="Año del scrape", required=True)
    parser.add_argument("--month_folder", type=str, help="Carpeta de mes en la cual guardar", required=True)

    args = parser.parse_args()

    main(
        start_point=args.start_point,
        end_point=args.end_point,
        year=args.year,
        month_folder=args.month_folder
    )