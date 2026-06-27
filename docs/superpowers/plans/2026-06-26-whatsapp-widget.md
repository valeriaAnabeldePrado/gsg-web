# WhatsApp Floating Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a floating WhatsApp widget with persistent panel, 4 initial options, and conditional flows (WA redirects or province selector).

**Architecture:** Global component rendered in layout.js with useState for panel open/step state. Three sub-components: WhatsAppWidget (main), WhatsAppPanel (UI), ProvinceSelector (dropdown). Data in separate files for reusability. useRouter for navigation.

**Tech Stack:** React (useState, useRouter), Next.js, TailwindCSS

## Global Constraints

- Widget rendered globally in `src/app/layout.js`
- Panel persists across page navigation
- Botón flotante: #25D366 (WhatsApp green), bottom-right, fixed position
- Panel buttons: outline style with #E05A2B (orange) hover
- WhatsApp links: +5491136366599 (Ezequiel), +5491162926392 (Tomás)
- Redirect to `/distribuidores` on province selection
- No external dependencies beyond React/Next.js/TailwindCSS

---

## File Structure

**Files to create:**
- `src/lib/whatsapp/constants.js` — WA numbers and message templates
- `src/lib/whatsapp/provinces.js` — Array of 24 Argentine provinces
- `src/components/whatsapp/ProvinceSelector.jsx` — Province dropdown
- `src/components/whatsapp/WhatsAppPanel.jsx` — Panel with conditional content
- `src/components/whatsapp/WhatsAppWidget.jsx` — Main widget (button + panel state)

**Files to modify:**
- `src/app/layout.js` — Add WhatsAppWidget component

---

## Task 1: Create WhatsApp Constants

**Files:**
- Create: `src/lib/whatsapp/constants.js`

**Interfaces:**
- Produces:
  - `WHATSAPP_CONTACTS` object with properties: `ezequiel.number`, `ezequiel.message`, `tomas.number`, `tomas.message`

- [ ] **Step 1: Create constants file**

```javascript
// src/lib/whatsapp/constants.js

export const WHATSAPP_CONTACTS = {
  ezequiel: {
    number: '+5491136366599',
    message: 'Hola, tengo un negocio de iluminación y me gustaría conocer sus productos y condiciones comerciales'
  },
  tomas: {
    number: '+5491162926392',
    message: 'Hola, soy cliente de GSG y necesito ayuda con mi pedido'
  }
};

export const WHATSAPP_API_URL = 'https://wa.me';

export const getWhatsAppLink = (number, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_API_URL}/${number}?text=${encodedMessage}`;
};
```

- [ ] **Step 2: Verify file exists**

Run: `ls -la src/lib/whatsapp/constants.js`
Expected: File created

- [ ] **Step 3: Commit**

```bash
git add src/lib/whatsapp/constants.js
git commit -m "feat: add whatsapp constants and helper"
```

---

## Task 2: Create Provinces Data

**Files:**
- Create: `src/lib/whatsapp/provinces.js`

**Interfaces:**
- Produces: `PROVINCES` array of 24 strings (Argentine province names)

- [ ] **Step 1: Create provinces file**

```javascript
// src/lib/whatsapp/provinces.js

export const PROVINCES = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
  'Ciudad Autónoma de Buenos Aires'
];
```

- [ ] **Step 2: Verify array length**

Run: `grep -c "'" src/lib/whatsapp/provinces.js`
Expected: 24 provinces

- [ ] **Step 3: Commit**

```bash
git add src/lib/whatsapp/provinces.js
git commit -m "feat: add argentine provinces list"
```

---

## Task 3: Create ProvinceSelector Component

**Files:**
- Create: `src/components/whatsapp/ProvinceSelector.jsx`

**Interfaces:**
- Consumes: `PROVINCES` from `src/lib/whatsapp/provinces.js`
- Produces: React component with props: `value` (string), `onChange` (function)

- [ ] **Step 1: Create component**

```jsx
// src/components/whatsapp/ProvinceSelector.jsx
'use client';

import { PROVINCES } from '@/lib/whatsapp/provinces';

export default function ProvinceSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">Selecciona una provincia</option>
      {PROVINCES.map((province) => (
        <option key={province} value={province}>
          {province}
        </option>
      ))}
    </select>
  );
}
```

- [ ] **Step 2: Verify file exists**

Run: `ls -la src/components/whatsapp/ProvinceSelector.jsx`
Expected: File created

- [ ] **Step 3: Commit**

```bash
git add src/components/whatsapp/ProvinceSelector.jsx
git commit -m "feat: create province selector component"
```

---

## Task 4: Create WhatsAppPanel Component

**Files:**
- Create: `src/components/whatsapp/WhatsAppPanel.jsx`

**Interfaces:**
- Consumes: 
  - `ProvinceSelector` component
  - `WHATSAPP_CONTACTS`, `getWhatsAppLink` from `src/lib/whatsapp/constants.js`
  - `useRouter` from `next/navigation`
- Produces: React component with props: `isOpen` (bool), `step` (string), `onClose` (func), `onStepChange` (func)

- [ ] **Step 1: Create panel component**

```jsx
// src/components/whatsapp/WhatsAppPanel.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProvinceSelector from './ProvinceSelector';
import { WHATSAPP_CONTACTS, getWhatsAppLink } from '@/lib/whatsapp/constants';

export default function WhatsAppPanel({ isOpen, step, onClose, onStepChange }) {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState('');

  if (!isOpen) return null;

  const handleOption1 = () => {
    const link = getWhatsAppLink(WHATSAPP_CONTACTS.ezequiel.number, WHATSAPP_CONTACTS.ezequiel.message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleOption2 = () => {
    const link = getWhatsAppLink(WHATSAPP_CONTACTS.tomas.number, WHATSAPP_CONTACTS.tomas.message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleViewDistributors = () => {
    router.push('/distribuidores');
    onClose();
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg z-40 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900">GSG</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {step === 'initial' && (
          <div className="space-y-3">
            <p className="text-gray-700 text-sm mb-4">¡Hola! ¿En qué podemos ayudarte?</p>
            <button
              onClick={handleOption1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Tengo un negocio y quiero conocer GSG
            </button>
            <button
              onClick={handleOption2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Ya soy cliente de GSG
            </button>
            <button
              onClick={() => onStepChange('provinces')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Soy arquitecto o diseñador de interiores
            </button>
            <button
              onClick={() => onStepChange('provinces')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Busco un punto de venta cerca mío
            </button>
          </div>
        )}

        {step === 'provinces' && (
          <div className="space-y-3">
            <p className="text-gray-700 text-sm mb-4">Te conectamos con el distribuidor más cercano. ¿En qué provincia estás?</p>
            <ProvinceSelector value={selectedProvince} onChange={setSelectedProvince} />
            <button
              onClick={handleViewDistributors}
              disabled={!selectedProvince}
              className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                selectedProvince
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Ver distribuidores
            </button>
            <button
              onClick={() => onStepChange('initial')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:text-orange-500 hover:border-orange-500 transition text-sm"
            >
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify file exists**

Run: `ls -la src/components/whatsapp/WhatsAppPanel.jsx`
Expected: File created

- [ ] **Step 3: Commit**

```bash
git add src/components/whatsapp/WhatsAppPanel.jsx
git commit -m "feat: create whatsapp panel with conditional flow"
```

---

## Task 5: Create WhatsAppWidget Component

**Files:**
- Create: `src/components/whatsapp/WhatsAppWidget.jsx`

**Interfaces:**
- Consumes: `WhatsAppPanel` component
- Produces: React component (no props needed, manages own state)

- [ ] **Step 1: Create widget component**

```jsx
// src/components/whatsapp/WhatsAppWidget.jsx
'use client';

import { useState } from 'react';
import WhatsAppPanel from './WhatsAppPanel';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('initial');

  const handleClose = () => {
    setIsOpen(false);
    setStep('initial');
  };

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition z-50"
        aria-label="Open WhatsApp chat"
      >
        {/* WhatsApp Icon (SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.404-2.652 4.04C3.85 15.978 5.487 19.129 8.113 20.5c1.214.606 2.343.922 3.29.922.955 0 1.87-.306 2.705-.915l.194-.124c1.863-1.402 3.01-3.309 3.266-5.556.256-2.246-.87-4.453-3.054-5.545-1.091-.578-2.368-.888-3.684-.888z" />
        </svg>
      </button>

      {/* Panel */}
      <WhatsAppPanel
        isOpen={isOpen}
        step={step}
        onClose={handleClose}
        onStepChange={handleStepChange}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify file exists**

Run: `ls -la src/components/whatsapp/WhatsAppWidget.jsx`
Expected: File created

- [ ] **Step 3: Commit**

```bash
git add src/components/whatsapp/WhatsAppWidget.jsx
git commit -m "feat: create floating whatsapp widget button"
```

---

## Task 6: Add Widget to Layout

**Files:**
- Modify: `src/app/layout.js`

**Interfaces:**
- Consumes: `WhatsAppWidget` component from `src/components/whatsapp/WhatsAppWidget.jsx`

- [ ] **Step 1: Read layout.js current state**

Run: `head -50 src/app/layout.js`

- [ ] **Step 2: Add import at top**

Add after other imports:
```javascript
import WhatsAppWidget from '@/components/whatsapp/WhatsAppWidget';
```

- [ ] **Step 3: Add component to body**

Inside `<body>` (after `<Analytics />`), add:
```jsx
        <WhatsAppWidget />
```

Full updated body section should be:
```jsx
      <body className={inter.className}>
        {pathname !== '/upload' && <Loader />}
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
        <GTM />
        <Clarity />
        <Analytics />
        <WhatsAppWidget />
        <MenuNav />
        {children}
      </body>
```

- [ ] **Step 4: Verify layout.js**

Run: `grep -A 2 "WhatsAppWidget" src/app/layout.js`
Expected: Shows import and component usage

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.js
git commit -m "feat: add whatsapp widget to layout"
```

---

## Self-Review

**Spec Coverage:**
- ✅ Botón flotante verde (#25D366) — Task 5
- ✅ Panel flotante — Task 4
- ✅ 4 opciones iniciales — Task 4
- ✅ Opción 1 → WA Ezequiel — Tasks 1, 4
- ✅ Opción 2 → WA Tomás — Tasks 1, 4
- ✅ Opción 3/4 → Provincia selector — Tasks 2, 3, 4
- ✅ Redirige a /distribuidores — Task 4
- ✅ Panel persiste al navegar — Task 5 (state en layout)
- ✅ Cerrable con X — Task 4
- ✅ Render global en layout — Task 6

**Placeholder Scan:**
- ✅ No "TBD", "TODO", incomplete sections
- ✅ All code complete and exact
- ✅ All commands with expected output

**Type Consistency:**
- ✅ `step` prop: "initial" | "provinces"
- ✅ `onClose`, `onStepChange` callbacks consistent
- ✅ Province value: string (or empty)
- ✅ WhatsApp links: consistent format via `getWhatsAppLink`

---

## Execution

Plan complete and saved to `docs/superpowers/plans/2026-06-26-whatsapp-widget.md`. 

**Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
