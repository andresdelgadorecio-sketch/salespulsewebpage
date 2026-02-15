import os
import sys
import json
import requests
import argparse

# Config
# Note: In a real environment, export these.
# export N8N_BASE_URL="https://n8n.testn8n.online"
# export N8N_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM"

BASE_URL = os.getenv("N8N_BASE_URL", "https://n8n.testn8n.online")
API_KEY = os.getenv("N8N_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNTMzOS0zMzc5LTQwZTgtOWZmNS03Y2E5YzU2ZmZiMWUiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY5NTkwNzQ4fQ.PolRb_sIYhV-qWEmjMv99k89fIZogAxl0D_oqXh5grM")

HEADERS = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

def list_workflows():
    res = requests.get(f"{BASE_URL}/api/v1/workflows", headers=HEADERS)
    if res.status_code == 200:
        data = res.json()
        print(json.dumps(data, indent=2))
        print(f"Total Workflows: {len(data['data'])}")
    else:
        print(f"Error {res.status_code}: {res.text}")

def get_workflow(w_id):
    res = requests.get(f"{BASE_URL}/api/v1/workflows/{w_id}", headers=HEADERS)
    if res.status_code == 200:
        print(json.dumps(res.json(), indent=2))
    else:
        print(f"Error {res.status_code}: {res.text}")

def create_workflow(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        payload = json.load(f)
    
    # Extract only what n8n needs or send raw
    res = requests.post(f"{BASE_URL}/api/v1/workflows", headers=HEADERS, json=payload)
    if res.status_code == 200:
        print("Workflow Created Successfully:")
        print(json.dumps(res.json(), indent=2))
    else:
        print(f"Error {res.status_code}: {res.text}")

def update_workflow(w_id, file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        payload = json.load(f)
    
    res = requests.put(f"{BASE_URL}/api/v1/workflows/{w_id}", headers=HEADERS, json=payload)
    if res.status_code == 200:
        print("Workflow Updated Successfully:")
        print(json.dumps(res.json(), indent=2))
    else:
        print(f"Error {res.status_code}: {res.text}")

def activate_workflow(w_id):
    res = requests.post(f"{BASE_URL}/api/v1/workflows/{w_id}/activate", headers=HEADERS)
    if res.status_code == 200:
        print(f"Workflow {w_id} ACTIVATED.")
    else:
        print(f"Error {res.status_code}: {res.text}")

def deactivate_workflow(w_id):
    res = requests.post(f"{BASE_URL}/api/v1/workflows/{w_id}/deactivate", headers=HEADERS)
    if res.status_code == 200:
        print(f"Workflow {w_id} DEACTIVATED.")
    else:
        print(f"Error {res.status_code}: {res.text}")

def main():
    parser = argparse.ArgumentParser(description="n8n Manager CLI")
    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("list", help="List all workflows")
    
    get_p = subparsers.add_parser("get", help="Get a workflow")
    get_p.add_argument("id", help="Workflow ID")

    create_p = subparsers.add_parser("create", help="Create a workflow")
    create_p.add_argument("file", help="JSON file path")

    update_p = subparsers.add_parser("update", help="Update a workflow")
    update_p.add_argument("id", help="Workflow ID")
    update_p.add_argument("file", help="JSON file path")

    act_p = subparsers.add_parser("activate", help="Activate a workflow")
    act_p.add_argument("id", help="Workflow ID")

    deact_p = subparsers.add_parser("deactivate", help="Deactivate a workflow")
    deact_p.add_argument("id", help="Workflow ID")

    args = parser.parse_args()

    if args.command == "list":
        list_workflows()
    elif args.command == "get":
        get_workflow(args.id)
    elif args.command == "create":
        create_workflow(args.file)
    elif args.command == "update":
        update_workflow(args.id, args.file)
    elif args.command == "activate":
        activate_workflow(args.id)
    elif args.command == "deactivate":
        deactivate_workflow(args.id)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
