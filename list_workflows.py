import requests
import json
import os

headers = {
    'X-N8N-API-KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM'
}
res = requests.get('https://n8n.testn8n.online/api/v1/workflows', headers=headers)
if res.status_code == 200:
    for w in res.json()['data']:
        print(f"{w['id']} : {w['name']}")
else:
    print(f"Error: {res.status_code}")
