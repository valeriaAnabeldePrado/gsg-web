# WhatsApp Floating Widget Design

**Date:** 2026-06-26  
**Status:** Approved

## Overview

Floating WhatsApp widget with multi-step flow. Botón flotante verde en esquina inferior derecha (todas las páginas). Al hacer clic abre panel flotante que persiste al navegar. Panel inicial con 4 opciones:
- Opciones 1 y 2: Abre WhatsApp con mensaje prellenado
- Opciones 3 y 4: Muestra selector de provincia, redirige a `/distribuidores`

## Components

### WhatsAppWidget (Main)
- Renderizado en `src/app/layout.js` (global)
- Controlado por `useState`: `isOpen`, `step` ("initial" | "provinces")
- Retorna botón flotante + panel condicional

### WhatsAppPanel
- Header: logo/nombre GSG + botón X para cerrar
- Paso 1 (initial): Texto + 4 botones de opciones
- Paso 2 (provinces): Texto + dropdown provincias + botón "Ver distribuidores"
- Persiste al navegar (estado en layout)

### ProvinceSelector
- Dropdown (select HTML) con 24 provincias argentinas
- Valor controlado por parent component
- No redirige directamente

## Flow

```
Widget Click
├─ Panel Opens (initial step)
│  └─ 4 Options:
│     ├─ Opción 1 → window.open(WA_LINK_EZEQUIEL)
│     ├─ Opción 2 → window.open(WA_LINK_TOMAS)
│     ├─ Opción 3 → step = "provinces"
│     └─ Opción 4 → step = "provinces"
│
└─ Province Selector (provinces step)
   ├─ Select Province
   └─ "Ver distribuidores" → router.push('/distribuidores')
```

## Data

**WhatsApp Links:**
- Ezequiel: +5491136366599
  - Texto: "Hola, tengo un negocio de iluminación y me gustaría conocer sus productos y condiciones comerciales"
- Tomás: +5491162926392
  - Texto: "Hola, soy cliente de GSG y necesito ayuda con mi pedido"

**Provincias:** Array de 24 provincias argentinas (Buenos Aires, Córdoba, Santa Fe, etc.)

## Design System

**Colors:**
- WhatsApp Green: #25D366
- Orange (hover): #E05A2B
- Background: white
- Border/Shadow: gray (#ccc, rgba)

**Button Styles:**
- Floating button: circle, green, white icon, shadow
- Panel buttons: outline style, gray border, orange text on hover, padding 12px 16px
- Close button (X): top-right corner, gray icon, hover darker

**Panel:**
- Width: 320px (mobile), 360px (desktop)
- Position: fixed bottom-right, margin 16px
- Border-radius: 12px
- Box-shadow: 0 4px 12px rgba(0,0,0,0.15)

## Responsive

- Mobile: Full viewport width (minus padding), centered
- Tablet/Desktop: Fixed 320-360px width, bottom-right

## Implementation Notes

- Use `useState` for `isOpen` and `step`
- Use `useRouter` from `next/navigation` for `/distribuidores` redirect
- WhatsApp links use `window.open()` with `noopener` for security
- No external dependencies beyond React/Next.js
- Keyboard: ESC to close panel (optional, but nice)
- Panel doesn't block page scroll (use `position: fixed` with `z-index`)

## Testing

- Panel opens/closes on button click
- Links work correctly for opciones 1 y 2
- Province selector shows all 24 options
- Redirect to `/distribuidores` works
- Panel persists on page navigation
- Responsive on mobile/desktop
- X button closes panel

## Files to Create

- `src/components/whatsapp/WhatsAppWidget.jsx`
- `src/components/whatsapp/WhatsAppPanel.jsx`
- `src/components/whatsapp/ProvinceSelector.jsx`
- `src/lib/whatsapp/provinces.js` (data)
- `src/lib/whatsapp/constants.js` (WA numbers, messages)

## Files to Modify

- `src/app/layout.js` — Add WhatsAppWidget component
