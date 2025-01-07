from recaptcha_extension import get_driver
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time


def process_id_range(start, end, year):
    """Función para procesar un rango de IDs."""
    driver = get_driver()
    data_list = []

    for current_id in range(start, end):
        try:
            entry_num = WebDriverWait(driver, 3).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "input#numeroEntrada"))
            )
            entry_num.clear()
            entry_num.send_keys(f"{current_id}")

            year_input = WebDriverWait(driver, 3).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "input#anio"))
            )
            year_input.clear()
            year_input.send_keys(year)

            search_button = WebDriverWait(driver, 3).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "button.btn.btn-primary.btn-lg.btn-block"))
            )
            search_button.click()
        except:
            continue 
        try:    
            print(f"Procesando ID: {current_id}")

            guardar_datos = False
            try:
                h5_elements = WebDriverWait(driver, 3).until(
                    EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.tabestado h5'))
                )
                ul_elements = driver.find_elements(By.CSS_SELECTOR, 'div.tabestado ul')
            except:
                print(f"No se encontro la tabla para el ID {current_id}")
                try:
                    driver.execute_script("window.scrollTo(0, 0);")
                    
                    clean_query = WebDriverWait(driver, 10).until(
                        EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
                    )
                    clean_query.click()

                    driver.execute_script("arguments[0].click();", clean_query)
                except:
                    print(f"No se encontró el botón de limpiar consulta para el ID {current_id}")
                continue  # Continúa con el siguiente current_id

            for h5, ul in zip(h5_elements[1:], ul_elements):
                li_elements = ul.find_elements(By.TAG_NAME, 'li')
                li_text = ','.join([li.text.strip() for li in li_elements])
                
                if li_text == "Registro Constitución o Transferencia de Dominio de Bien Inmueble":
                    guardar_datos = True
                    break

            if guardar_datos:
                row_data = {}
                dl_element = WebDriverWait(driver, 3).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'div.tabestado dl.dl-horizontal'))
                )
                dt_elements = dl_element.find_elements(By.TAG_NAME, 'dt')
                dd_elements = dl_element.find_elements(By.TAG_NAME, 'dd')

                for dt, dd in zip(dt_elements, dd_elements):
                    row_data[dt.text.strip().replace(":", "")] = dd.text.strip()

                for h5, ul in zip(h5_elements[1:], ul_elements):
                    h5_text = h5.text.strip().replace(":", "")
                    li_elements = ul.find_elements(By.TAG_NAME, 'li')
                    li_text = [li.text.strip() for li in li_elements]
                    row_data[h5_text] = li_text

                data_list.append(row_data)
            try:
                close_button = WebDriverWait(driver, 3).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, 'button.blazored-modal-close'))
                )
                close_button.click()

                clean_query = WebDriverWait(driver, 3).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
                )
                clean_query.click() 
            except:
                clean_query = WebDriverWait(driver, 3).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
                )
                clean_query.click() 
            else:
                time.sleep(1)
            try:
                close_button = WebDriverWait(driver, 3).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, 'button.blazored-modal-close'))
                )
                close_button.click()

                driver.execute_script("window.scrollTo(0, 0);")

                clean_query = WebDriverWait(driver, 3).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
                )
                clean_query.click()
            except:
                clean_query = WebDriverWait(driver, 3).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
                )
                clean_query.click()

        except (NoSuchElementException, TimeoutException):
            print(f"No se encontro el. ID: {current_id}") 
            try:
                close_button = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'button.blazored-modal-close'))
                )
                close_button.click()

                clean_query = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
                )
                clean_query.click()
            except:
                clean_query = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-primary.a-btn"))
                )
                clean_query.click()
            continue
    return data_list