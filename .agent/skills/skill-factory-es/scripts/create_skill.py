import os
import sys
import argparse

def create_skill(name, description, base_path=".agent/skills"):
    skill_dir = os.path.join(base_path, name)
    scripts_dir = os.path.join(skill_dir, "scripts")
    examples_dir = os.path.join(skill_dir, "examples")
    resources_dir = os.path.join(skill_dir, "resources")
    
    # Create directories
    os.makedirs(scripts_dir, exist_ok=True)
    os.makedirs(examples_dir, exist_ok=True)
    os.makedirs(resources_dir, exist_ok=True)
    
    skill_md_path = os.path.join(skill_dir, "SKILL.md")
    
    content = f"""---
name: {name}
description: {description}
---

# {name.replace('-', ' ').title()}

## Cuándo usar
- Describe aquí los escenarios en los que esta habilidad es útil.

## Instrucciones
1. Paso uno...
2. Paso dos...

## Restricciones
- Restricción uno...
"""
    
    with open(skill_md_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"Skill '{name}' creada exitosamente en {skill_dir}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Genera el boilerplate para una nueva habilidad de Antigravity.")
    parser.add_argument("name", help="Nombre de la habilidad (ej: mi-habilidad)")
    parser.add_argument("description", help="Descripción breve de la habilidad")
    
    args = parser.parse_args()
    
    # Ensure we are in a context where we can find .agent or specify the full path if needed
    # For this exercise, we assume the cwd is the workspace root.
    create_skill(args.name, args.description)
