import requests
import json

headers = {
    'X-N8N-API-KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM'
}

try:
    res = requests.get('https://n8n.testn8n.online/api/v1/node-types', headers=headers)
    if res.status_code == 200:
        node_types = res.json()
        print(f"Found {len(node_types)} node types.")
        # Search for form related nodes
        form_nodes = [n for n in node_types if 'form' in n.get('name', '').lower() or 'form' in n.get('displayName', '').lower()]
        for n in form_nodes:
            print(f"Name: {n.get('name')}, Display: {n.get('displayName')}, Ver: {n.get('version')}")
            # print(json.dumps(n, indent=2)) 
    else:
        print(f"Error getting node types: {res.status_code} - {res.text}")

except Exception as e:
    print(f"Exception: {e}")
