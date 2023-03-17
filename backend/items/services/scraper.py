from bs4 import BeautifulSoup
import requests
import re
from time import sleep
from selenium import webdriver


def extract_price(url: str, attributes: str) -> float | None:
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument(
        'user-agent=Mozilla/5.0 (Windows NT 10.0Win64x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36')
    driver = webdriver.Chrome(options=options)
    driver.get(url)

    (class_, id) = attributes.split(',')
    if class_:
        class_ = '.' + class_.replace(' ', '.')
    if id:
        id = '#' + id.replace(' ', '#')

    with open('wish.html', 'w') as f:
        f.write(driver.page_source)

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    for element in soup.select(class_ + id):
        match = re.search(r'\$(\d+(?:\.\d+)?)', element.get_text())
        if match:
            driver.close()
            return float(match.group(1))

    driver.close()
    return None
