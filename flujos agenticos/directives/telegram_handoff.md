# Directiva: Handoff a Ventas (Telegram)

## Objetivo
Redirigir a los usuarios del bot de soporte al bot de atención personalizada de ventas para cerrar el trato.

## Entradas
- Datos del usuario de Telegram (ID, Username).

## Herramientas de Ejecución
- `execution/get_sales_link.py`: Obtiene el enlace dinámico del bot de ventas.

## Flujo
1. El usuario solicita hablar con ventas.
2. El sistema consulta `execution/get_sales_link.py`.
3. Se presenta al usuario un botón claro de "Ir a Ventas" que abre la conversación con el bot especializado.
4. **Seguimiento en n8n**: El bot envía un POST al webhook de n8n (`/webhook/sales-handoff`) con los datos del usuario para registro y seguimiento comercial.

## Salidas
- Enlace de redirección a Telegram.
- Registro de evento en n8n para seguimiento.
