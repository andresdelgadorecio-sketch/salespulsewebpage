import requests
import json
import os

BASE_URL = "https://n8n.testn8n.online"
API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM"
HEADERS = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

def create_credential():
    print("1. Creating Credential 'n8n API Key'...")
    # Verificar si ya existe
    res = requests.get(f"{BASE_URL}/api/v1/credentials", headers=HEADERS)
    if res.status_code == 200:
        for cred in res.json()['data']:
            if cred['name'] == "n8n API Key":
                print("   Credential already exists. Skipping.")
                return cred['id']
    
    # Crear nueva
    payload = {
        "name": "n8n API Key",
        "type": "httpHeaderAuth",
        "data": {
            "name": "X-N8N-API-KEY",
            "value": API_KEY
        }
    }
    res = requests.post(f"{BASE_URL}/api/v1/credentials", headers=HEADERS, json=payload)
    if res.status_code == 200:
        cred_id = res.json()['id']
        print(f"   Success! Credential ID: {cred_id}")
        return cred_id
    else:
        print(f"   Failed to create credential: {res.text}")
        return None

def import_workflow(cred_id):
    print("2. Importing Workflow 'n8n_mcp_server_workflow.json'...")
    try:
        with open("n8n_mcp_server_workflow.json", "r", encoding="utf-8") as f:
            workflow_json = json.load(f)
    except FileNotFoundError:
        print("   Error: File n8n_mcp_server_workflow.json not found!")
        return None

    # Inject settings if missing (Required by API)
    if 'settings' not in workflow_json:
        workflow_json['settings'] = {}

    # Inject Credential ID (Consolidated logic)
    print(f"   Injecting Credential ID '{cred_id}' into local JSON...")
    wf_str = json.dumps(workflow_json).replace('"id": "n8n_api_key"', f'"id": "{cred_id}"')
    workflow_json = json.loads(wf_str)

    # Check if exists
    res = requests.get(f"{BASE_URL}/api/v1/workflows", headers=HEADERS)
    if res.status_code == 200:
        for wf in res.json()['data']:
            if wf['name'] == workflow_json['name']:
                print(f"   Workflow exists (ID: {wf['id']}). Updating...")
                # PUT to update
                update_res = requests.put(f"{BASE_URL}/api/v1/workflows/{wf['id']}", headers=HEADERS, json=workflow_json)
                if update_res.status_code == 200:
                    print("   Update success.")
                    return wf['id']
                else:
                    print(f"   Update failed: {update_res.text}")
                    return None

    # Create if not exists
    res = requests.post(f"{BASE_URL}/api/v1/workflows", headers=HEADERS, json=workflow_json)
    if res.status_code == 200:
        wf_id = res.json()['id']
        print(f"   Create success! ID: {wf_id}")
        return wf_id
    else:
        print(f"   Create failed: {res.text}")
        return None

def activate_workflow(wf_id):
    print(f"3. Activating Workflow {wf_id}...")
    res = requests.post(f"{BASE_URL}/api/v1/workflows/{wf_id}/activate", headers=HEADERS)
    if res.status_code == 200:
        print("   Success! Workflow is ACTIVE.")
    else:
        print(f"   Failed to activate: {res.text}")

if __name__ == "__main__":
    cred_id = create_credential() # We try to create creds to ensure dependencies met
    if cred_id:
        wf_id = import_workflow(cred_id)
        if wf_id:
            activate_workflow(wf_id)
