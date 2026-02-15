---
description: Manage n8n workflows (list, get, create, update, activate) using the n8n_manager.py CLI.
---

# n8n Automation Skill

This skill allows Antigravity to manage an n8n instance using a local Python CLI wrapper.

## Capability
- List all workflows
- Get workflow details (JSON)
- Create new workflows from JSON
- Update existing workflows
- Activate/Deactivate workflows

## Usage
When the user wants to interact with n8n, use the `run_command` tool to execute `n8n_manager.py`.

### Commands

**1. List Workflows**
```bash
python n8n_manager.py list
```

**2. Get Workflow Details**
```bash
python n8n_manager.py get <WORKFLOW_ID>
```

**3. Create Workflow**
First, create a JSON file with the workflow definition. Then:
```bash
python n8n_manager.py create <PATH_TO_JSON_FILE>
```

**4. Update Workflow**
```bash
python n8n_manager.py update <WORKFLOW_ID> <PATH_TO_JSON_FILE>
```

**5. Activate/Deactivate**
```bash
python n8n_manager.py activate <WORKFLOW_ID>
python n8n_manager.py deactivate <WORKFLOW_ID>
```

## Dependencies
- `python` must be installed.
- `requests` library must be installed (`pip install requests`).
- `n8n_manager.py` must be present in the root of the workspace.
- Environment variables `N8N_BASE_URL` and `N8N_API_KEY` should be set or hardcoded in the script (currently hardcoded for this session).
