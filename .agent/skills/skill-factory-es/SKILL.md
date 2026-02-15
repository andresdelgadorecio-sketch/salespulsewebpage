---
name: skill-factory-es
description: Capacidad para crear y organizar nuevas habilidades (skills) en el workspace siguiendo los estándares de Antigravity, con documentación y explicaciones en español.
---

# Fábrica de Habilidades (Skill Factory)

Esta habilidad permite al agente crear nuevas habilidades estructuradas correctamente dentro del directorio `.agent/skills/`.

## Cuándo usar esta habilidad
- Cuando el usuario solicita una nueva capacidad o funcionalidad específica que puede ser encapsulada como una habilidad.
- Cuando se necesita estandarizar la creación de habilidades en el workspace.
- Cuando el usuario pide crear una habilidad en idioma español.

## Instrucciones para el Agente

Para crear una nueva habilidad, sigue estos pasos:

1.  **Definir el nombre y propósito:** El nombre debe ser descriptivo, en minúsculas y usar guiones para separar palabras (ej: `validador-codigo-python`).
2.  **Crear la estructura de directorios:**
    - `.agent/skills/[nombre-habilidad]/`
    - `.agent/skills/[nombre-habilidad]/scripts/` (opcional)
    - `.agent/skills/[nombre-habilidad]/examples/` (opcional)
    - `.agent/skills/[nombre-habilidad]/resources/` (opcional)
3.  **Crear el archivo SKILL.md:**
    - Debe incluir el frontmatter YAML con `name` y `description`.
    - El cuerpo del archivo debe estar en español (si se solicita) y detallar el "Cuándo usar", "Instrucciones" y "Restricciones".
4.  **Generar Boilerplate:** Utilizar el script `scripts/create_skill.py` (si está disponible) para generar la estructura básica rápidamente.

## Restricciones
- Siempre verifica si el folder `.agent/skills/` existe antes de crear la subcarpeta.
- Asegúrate de que la descripción en el frontmatter sea clara, ya que Antigravity la usa para descubrir la habilidad.
- No sobrescribas habilidades existentes sin permiso explícito.
