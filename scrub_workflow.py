import json
import sys

def scrub_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        changed = False
        for node in data.get('nodes', []):
            if 'parameters' in node:
                if 'options' in node['parameters']:
                    print(f"Removing options from {node['name']}")
                    del node['parameters']['options']
                    changed = True

        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4)
            print(f"Scrubbed {file_path}")
        else:
            print(f"No changes for {file_path}")
            
    except Exception as e:
        print(f"Error scrubbing {file_path}: {e}")

if __name__ == "__main__":
    for f in sys.argv[1:]:
        scrub_file(f)
