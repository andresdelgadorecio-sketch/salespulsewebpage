# Ejemplo: Landing Page Futurista "Space Neon"

Este documento detalla la estructura y prompt para generar la landing page solicitada.

## Especificación Técnica

### Estructura de Componentes
1.  **Header:**
    - Logo: Icono de red + "SPACE-UI" (Púrpura neón).
    - Nav: Links con efecto underline sutil al hover.
    - CTA: Botón con gradiente y border-radius suave.
2.  **Hero Section:**
    - Background: `radial-gradient` púrpura/azul con `blur-[120px]` centrado.
    - Título: "Construye el Futuro" (Gradient text).
    - Botones: "Empezar" (Relleno) y "Saber más" (Outline).
3.  **Social Proof:**
    - Logotipos de partners en blanco/gris claro con opacidad al 50%.

### Configuración Tailwind Recomendada
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'púrpura-neon': '#A855F7',
      'azul-profundo': '#1E3A8A',
      'espacio': '#030617',
    },
    backgroundImage: {
      'arco-luz': 'conic-gradient(from 180deg at 50% 50%, #A855F7 0deg, #3B82F6 180deg, #A855F7 360deg)',
    }
  }
}
```

### Visualización del "Arco de Luz"
Se logra posicionando un div absoluto con `rounded-full`, `blur-3xl`, y opacidad baja, detrás del contenido del Hero, creando un marco luminoso.
