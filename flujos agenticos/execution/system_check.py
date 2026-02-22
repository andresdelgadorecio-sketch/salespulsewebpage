import os

def check_structure():
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    required_dirs = ['directives', 'execution', '.tmp']
    
    print(f"--- Verifying Agentic Core Structure at {base_path} ---")
    
    for d in required_dirs:
        dir_path = os.path.join(base_path, d)
        if os.path.exists(dir_path):
            print(f"[OK] Directory found: {d}/")
        else:
            print(f"[ERROR] Missing directory: {d}/")
            
    print("\n--- System Check Complete ---")

if __name__ == "__main__":
    check_structure()
