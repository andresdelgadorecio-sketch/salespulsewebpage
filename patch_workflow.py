import json
import sys

def patch_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        changed = False
        for node in data.get('nodes', []):
            if node.get('type') in ['n8n-nodes-base.httpRequest', 'n8n-nodes-base.webhook']:
                if 'parameters' not in node:
                    node['parameters'] = {}
                if 'options' not in node['parameters']:
                    print(f"Adding options to {node['name']} in {file_path}")
                    node['parameters']['options'] = {}
                    changed = True
                
        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Patched {file_path}")
        else:
            print(f"No changes needed for {file_path}")
            
    except Exception as e:
        print(f"Error patching {file_path}: {e}")

if __name__ == "__main__":
    for f in sys.argv[1:]:
        patch_file(f)
