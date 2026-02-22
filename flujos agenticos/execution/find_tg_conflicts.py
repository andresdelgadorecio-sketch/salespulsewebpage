import os
import json
import requests

BASE_URL = os.getenv("N8N_BASE_URL", "https://n8n.testn8n.online")
API_KEY = os.getenv("N8N_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM")

HEADERS = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

def find_telegram_conflicts():
    res = requests.get(f"{BASE_URL}/api/v1/workflows", headers=HEADERS)
    if res.status_code != 200:
        print(f"Error: {res.text}")
        return

    workflows = res.json()['data']
    active_tg_workflows = []

    for w in workflows:
        if w['active']:
            # Get full workflow to check nodes
            w_res = requests.get(f"{BASE_URL}/api/v1/workflows/{w['id']}", headers=HEADERS)
            if w_res.status_code == 200:
                full_w = w_res.json()
                for node in full_w.get('nodes', []):
                    if 'telegram' in node.get('type', '').lower():
                        active_tg_workflows.append({
                            'id': w['id'],
                            'name': w['name'],
                            'node': node['name'],
                            'type': node['type']
                        })
                        break

    if active_tg_workflows:
        print("Found active workflows with Telegram nodes:")
        for w in active_tg_workflows:
            print(f"- {w['name']} (ID: {w['id']}) - Node: {w['node']}")
    else:
        print("No active workflows found with Telegram nodes.")

if __name__ == "__main__":
    find_telegram_conflicts()
