import json
import sys

def get_sales_link():
    # En el futuro, esto podría rotar entre varios vendedores o bots
    # según disponibilidad, carga de trabajo o región.
    sales_bot_username = "ventassalespulse"
    sales_link = f"https://t.me/{sales_bot_username}"
    
    result = {
        "status": "success",
        "link": sales_link,
        "username": sales_bot_username
    }
    
    print(json.dumps(result))

if __name__ == "__main__":
    get_sales_link()
