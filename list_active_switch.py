import requests
import json
import os

headers = {
    'X-N8N-API-KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM'
}
res = requests.get('https://n8n.testn8n.online/api/v1/workflows', headers=headers)
if res.status_code == 200:
    found = False
    for w in res.json()['data']:
        if w['active']:
            print(f"ACTIVE: {w['id']} : {w['name']}")
            res2 = requests.get(f"https://n8n.testn8n.online/api/v1/workflows/{w['id']}", headers=headers)
            if res2.status_code == 200:
                wf = res2.json()
                # Check for Switch node
                for node in wf['nodes']:
                    if node['type'] == 'n8n-nodes-base.switch':
                        print(f"Found Switch in {w['name']}")
                        print(json.dumps(node, indent=2))
                        found = True
                        break
            if found: break
    if not found:
        print("No active workflow with Switch node found.")
else:
    print(f"Error: {res.status_code}")
