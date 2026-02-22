import os
import json
import requests

BASE_URL = os.getenv("N8N_BASE_URL", "https://n8n.testn8n.online")
API_KEY = os.getenv("N8N_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM")
TOKEN_TO_FIND = "8396733671:AAGiooSOs-lMC90sjo17JsSjJ_a5JjEYP6o"

HEADERS = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

def deep_search():
    res = requests.get(f"{BASE_URL}/api/v1/workflows", headers=HEADERS)
    if res.status_code != 200: return
    
    workflows = res.json()['data']
    conflicts = []
    
    for w in workflows:
        if w['active']:
            w_res = requests.get(f"{BASE_URL}/api/v1/workflows/{w['id']}", headers=HEADERS)
            if w_res.status_code == 200:
                full_w = w_res.json()
                content = json.dumps(full_w)
                if TOKEN_TO_FIND in content or "telegram" in content.lower():
                    conflicts.append(w)
                    
    if conflicts:
        print("Potential Conflict Workflows (Active):")
        for c in conflicts:
            print(f"- {c['name']} (ID: {c['id']})")
    else:
        print("No active TG-related workflows found.")

if __name__ == "__main__":
    deep_search()
