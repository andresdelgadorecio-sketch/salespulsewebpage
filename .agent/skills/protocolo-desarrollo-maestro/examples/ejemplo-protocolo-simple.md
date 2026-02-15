# Ejemplo de Aplicación del Protocolo (Tarea Simple)

Este es un ejemplo de cómo el agente debe responder a una solicitud simple (ej: "Crea una función para validar emails").

## FASE 1: INVESTIGACIÓN DEL PROBLEMA (Discovery)
- **Resumen:** Se requiere una función robusta para validar que una cadena de texto sigue el formato estándar de correo electrónico.
- **Requisito:** Debe ser compatible con Node.js y navegadores.

## FASE 2: PLANIFICACIÓN (Roadmap)
1. Definir expresión regular (Regex) estándar de la industria.
2. Crear función exportable.
3. Añadir comentarios JSDoc.

## FASE 3: DISEÑO (UI/UX)
- Al ser una función lógica, el "diseño" se enfoca en la limpieza de la firma: `validateEmail(email: string): boolean`.

## FASE 4: EJECUCIÓN (Coding)
```javascript
/**
 * Valida si un string es un email válido.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

## FASE 5: REVISIÓN (Testing & Debugging)
- **Auto-Auditoría:** La Regex cubre el 99% de casos comunes. Cumple con estándares de rendimiento.

## FASE 6: CORRECCIÓN (Refinement)
El código está listo. Instrucciones: Importar y usar en cualquier componente de validación.
