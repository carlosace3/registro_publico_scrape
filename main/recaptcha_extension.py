from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import time


username = "carlosace3@gmail.com"
pswd  = "Acedo.12345"

def get_driver():
    extension_path = os.path.abspath('./CapSolver.Browser.Extension')
    chrome_options = Options()
    chrome_options.add_argument(f'--load-extension={extension_path}')
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")



    # Connects to Selenium Grid Hub 
    #selenium_url = os.getenv("SELENIUM_URL", "http://localhost:4444")
    driver = webdriver.Chrome(
        #command_executor=selenium_url,
        options=chrome_options
        )
    
    # Connects to the webpage
    driver.get('https://www.rp.gob.pa/')


    # Wait for the reCAPTCHA element to be present
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "g-recaptcha-response"))
            ) 

        recaptcha = driver.find_element(By.CLASS_NAME,"g-recaptcha-response") 
        print(f"Recaptcha: {recaptcha}")

        time.sleep(5)
    except:
        print('Recaptcha not found..')

    # Wait for the reCAPTCHA to be solved
    solved = False
    while not solved:
        injected_value = driver.execute_script(
            "return document.getElementsByClassName('g-recaptcha-response')[0].value;"
        )
        if injected_value:
            solved = True
        else:
            print("Waiting for reCAPTCHA to be solved...")
            time.sleep(5)  # Wait for 5 seconds before checking again

    print(f"Recaptcha solved: {injected_value}")

    # Here, you can proceed with your form submission or any other actions post-captcha solving
    if injected_value:
        user_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input#itNombreUsuario"))
            )
        user_box.send_keys(username)
        psw_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='password']"))
        )

        psw_box.send_keys(pswd)
        
        login_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.btn.btn-primary.btn-block"))
        )
        login_btn.click()
    else:
        print("Failed to solve reCAPTCHA")
        exit()
    time.sleep(1)
    return driver

