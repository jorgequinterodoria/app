# Pulido Visual Premium — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Aplicar el sistema de diseño flat & sobrio (tokens + clases compartidas) a toda la app MGA SST sin cambiar disposición ni lógica.

**Architecture:** Capa de diseño en `globals.css` (tokens `@theme` + clases `@layer components`) y barrido mecánico de classNames en ~30 archivos. Cero cambios estructurales en React, rutas, API o estado.

**Tech Stack:** Next.js 16 (Tailwind v4, `@apply` en CSS), Vitest, react-doctor.

**Restricciones del usuario:** NO commits sin petición explícita (omite los pasos "Commit" de la plantilla); NO worktrees. Verificación tras cada task: `npm run typecheck && npm run lint && npm test` (debe mantenerse 75/75) y `npm run build` al final de cada task.

**Design doc:** `docs/plans/2026-10-06-ui-pulido-premium-design.md`

---

### Task 1: Sistema de diseño en `globals.css` + test de existencia

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/__tests__/design-system.test.ts`

**Step 1: Test fallando**

```ts
// src/__tests__/design-system.test.ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(resolve(__dirname, "../app/globals.css"), "utf8");

describe("sistema de diseño (globals.css)", () => {
  it("define los tokens de color primario", () => {
    expect(css).toContain("--color-primary: #2563eb");
    expect(css).toContain("--color-primary-hover: #1d4ed8");
    expect(css).toContain("--color-primary-active: #1e40af");
    expect(css).toContain("--color-primary-subtle: #eff6ff");
  });

  it("fuerza tema claro y tipografía Geist en el body", () => {
    expect(css).toContain("color-scheme: light");
    expect(css).toContain("var(--font-geist-sans)");
    expect(css).not.toContain("prefers-color-scheme: dark");
    expect(css).not.toContain("font-family: Arial");
  });

  it("define las clases compartidas del sistema", () => {
    for (const cls of [
      ".card", ".btn", ".btn-primary", ".btn-secondary", ".btn-danger",
      ".input", ".label", ".link", ".badge", ".table-base",
    ]) {
      expect(css, `falta la clase ${cls}`).toContain(cls);
    }
  });
});
```

Run: `npx vitest run src/__tests__/design-system.test.ts` — Expected: FAIL (clases inexistentes).

**Step 2: Implementar `src/app/globals.css` completo**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
  color-scheme: light;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-active: #1e40af;
  --color-primary-subtle: #eff6ff;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}

@layer components {
  .card {
    @apply bg-white rounded-xl border border-gray-200 shadow-sm;
  }
  .btn {
    @apply inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed;
  }
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-hover active:bg-primary-active;
  }
  .btn-secondary {
    @apply bg-white text-gray-700 border border-gray-300 hover:bg-gray-50;
  }
  .btn-danger {
    @apply bg-red-600 text-white hover:bg-red-700;
  }
  .input {
    @apply w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
  .label {
    @apply block text-sm font-medium text-gray-700 mb-1;
  }
  .link {
    @apply font-medium text-primary hover:text-primary-hover;
  }
  .badge {
    @apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium;
  }
  .table-base {
    @apply w-full text-sm text-left border-collapse;
  }
  .table-base th {
    @apply font-medium text-gray-500 border-b border-gray-200 px-3 py-2;
  }
  .table-base td {
    @apply border-b border-gray-100 px-3 py-2 text-gray-700;
  }
}
```

Nota: si `@apply` con un util desconocido falla en build (Tailwind v4 lo reporta), reemplazar por la utility cruda equivalente.

**Step 3:** `npx vitest run src/__tests__/design-system.test.ts` — Expected: PASS 3/3.
**Step 4:** `npm run build` — Expected: "✓ Compiled successfully" (valida que `@apply` compila).
**Step 5:** `npm run typecheck && npm run lint && npm test` — 0 errores, 79 tests (75 + 4: los 3 originales + el guard de composición `btn` añadido en la ronda de review).

---

### Task 2: Layouts (raíz + dashboard)

**Files:**
- Modify: `src/app/layout.tsx` — `lang="en"` → `lang="es"`.
- Modify: `src/app/(dashboard)/layout.tsx`

**Cambios en `(dashboard)/layout.tsx` (classNames solamente):**

| Antes | Después |
|---|---|
| `bg-blue-50 text-blue-700` (nav activo desktop) | `bg-primary-subtle text-primary` |
| `text-gray-700 hover:bg-gray-100` (nav inactivo) | igual (ya cumple) |
| resto (`bg-white border-r border-gray-200`, h-16, marca `text-lg font-bold`) | sin cambio |

Mobile nav idem: activo `text-blue-700` → `text-primary`.

**Verify:** `npm run typecheck && npm run lint && npm test` — verde.

---

### Task 3: Auth — login y registro

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/(auth)/register/page.tsx`

**Mapeo (aplicar en ambos):**

| Antes | Después |
|---|---|
| label: `mb-1 block text-sm font-medium text-gray-700` | `label` |
| input: `w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500` | `input` |
| botón: `w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50` | `btn btn-primary w-full py-2.5` |
| link "Registrarse": `font-medium text-blue-600 hover:text-blue-500` | `link` |
| card del form (register si tiene `bg-white rounded-2xl shadow-lg`) | `card p-6` |
| h1 título de página `text-2xl font-bold text-gray-900` | `text-xl font-semibold text-gray-900` (marca "MGA SST" se queda `text-2xl font-bold`) |

Mantener los estados de error (`bg-red-50 … text-red-600`) como están.

**Verify:** `npm run typecheck && npm run lint && npm test` — verde.

---

### Task 4: Listados del dashboard

**Files:**
- Modify: `src/app/(dashboard)/empresas/page.tsx`, `empresas/nueva/page.tsx`, `empresas/[id]/page.tsx`
- Modify: `src/app/(dashboard)/proyectos/page.tsx`, `proyectos/nueva/page.tsx`, `proyectos/[id]/page.tsx`, `proyectos/[id]/empleados/page.tsx`
- Modify: `src/app/(dashboard)/formatos/page.tsx`
- Modify: `src/app/(dashboard)/admin/usuarios/page.tsx`

**Mapeo:**

| Antes | Después |
|---|---|
| Tarjeta: `rounded-xl border border-gray-200 bg-white p-5 shadow-sm` / `bg-white rounded-lg border border-gray-200 shadow-sm p-4` | `card p-5` / `card p-4` (agregar padding como variente: `card` no incluye padding) |
| Botón/link primario: `rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors` | `btn btn-primary` |
| Link azul suelto: `text-blue-600 font-medium hover:underline` | `link` |
| Badges (proyectos ×2): `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${…}` | `badge ${…}` (conservar el color condicional) |
| Spinner: `border-blue-600` | `border-primary` |
| h1: `text-2xl font-bold text-gray-900` | `text-xl font-semibold text-gray-900` |
| Botón borrado/peligro rojo ad-hoc | `btn btn-danger` |
| Botón gris `bg-gray-100 hover:bg-gray-200 text-gray-700 …` | `btn btn-secondary` |

`.card` no incluye padding a propósito: mantener el padding actual de cada tarjeta (`p-4`/`p-5`).

**Verify:** `npm run typecheck && npm run lint && npm test` — verde.

---

### Task 5: Renderizador de formatos + métricas

**Files:**
- Modify: `src/app/(dashboard)/formatos/[codigo]/page.tsx`
- Modify: `src/components/formatos/contenido-formato.tsx`
- Modify: `src/components/formatos/renderizador-formato.tsx`
- Modify: `src/components/formatos/metricas-formato.tsx`

**Mapeo adicional (además del de Task 4):**

| Antes | Después |
|---|---|
| Contenedor de sección `bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4` | `card p-4 space-y-4` |
| Inputs/textarea del renderizador (clase input repetida) | `input` (textarea: misma clase) |
| Focus ad-hoc `focus:ring-2 focus:ring-blue-500 focus:border-blue-500` (144 ocurrencias en app) | eliminar — vive dentro de `.input` |
| Tabla: `min-w-full border border-gray-200 rounded-lg` + th/td ad-hoc | `table-base` (envolver en `overflow-x-auto rounded-lg border border-gray-200` si no existía) |
| Tabs pestañas "Diligenciar"/"Métricas" | mantener estructura; activo → `border-primary text-primary`, inactivo → `text-gray-500 hover:text-gray-700` |
| Botón primario del formulario | `btn btn-primary` |

**Verify:** `npm run typecheck && npm run lint && npm test` (79 tests) — verde.

---

### Task 6: Barrido de los 22 formularios artesanales

**Files (22):** todos en `src/app/(dashboard)/formatos/` excepto `page.tsx` y `[codigo]`:
`analisis-trabajo-seguro`, `asistencia-capacitacion`, `asistencia-diaria`, `autorreporte-salud`, `control-autorreporte`, `control-salud-especial`, `encuesta-preexistencias`, `inspeccion-epp`, `inspeccion-extintores`, `inspeccion-maquinaria`, `inspeccion-orden-limpieza`, `inspeccion-volquetas`, `investigacion-accidente`, `matriz-control-sst`, `matriz-peligros`, `notificacion-riesgos`, `permiso-alturas`, `permiso-soldadura`, `registro-enfermedad-laboral`, `registro-incidentes`, `reporte-incidentes`, `seguimiento-salud-especial`.

**Aplicar el mapeo unificado (Tasks 3-5) a cada archivo:**

1. `h1` → `text-xl font-semibold text-gray-900`
2. Contenedores tarjeta → `card` (+ su padding actual)
3. Labels → `label`; inputs/textarea/select → `input` (select conserva `text-base` si lo tenía por móvil: permitido agregar `text-base` después de `input`)
4. Botones primarios → `btn btn-primary`; secundarios → `btn btn-secondary`; peligro → `btn btn-danger`; texto azul suelto → `link`
5. Eliminar todos los `focus:ring-*`/`focus:border-blue-*` ad-hoc de campos (ya están en `.input`)
6. Tablas → `table-base`
7. `shadow-lg`/`rounded-2xl` en tarjetas no-modales → `card`

**Estrategia:** este task es mecánico y paralelizable — conviene subagentes en lotes de 4-5 archivos (subagent-driven-development), con `typecheck+lint+test` tras cada lote.

**Verify:** `grep -rn "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" src/app` → 0 resultados; suite verde.

---

### Task 7: Página pública de QR (prioridad móvil)

**Files:**
- Modify: `src/app/qr/[token]/page.tsx`

**Cambios:**
- Card principal y estados de éxito/error: `bg-white rounded-2xl shadow-lg p-8` → `card p-6` (mantener centrado)
- Selectores SI/NO: conservar estructura de botones grandes; armonizar bordes/estados con la paleta (`border-red-500`→ mantener semántico, ok)
- Botón "Registrar Asistencia": → `btn btn-primary w-full py-3` (mantener `py-3` por touch)
- Select de empleado: → `input`
- Labels → `label`
- Errores → mantener `bg-red-50 border-red-200 text-red-700`

**Verify:** `npm run typecheck && npm run lint && npm test` — verde.

---

### Task 8: Verificación final

**Steps:**
1. `npm run typecheck && npm run lint && npm test && npm run build` — todo verde (esperado: 79 tests, build OK).
2. `grep -rn "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" src/` → 0.
3. `grep -rn "font-family: Arial" src/app/globals.css` → 0 (solo fallback).
4. `npx react-doctor` — sin warnings nuevos en archivos tocados.
5. Entregar al usuario: `npm run dev` y recorrido visual de login, listados, un formulario artesanal, un formato genérico con métricas, y `/qr/[token]` en móvil. Ajustes finos según su feedback.

---

## Notas de ejecución

- **Commits**: solo si el usuario lo pide explícitamente.
- **TDD**: solo Task 1 tiene test de verdad (CSS/estilos no son unit-testables en jsdom; excepción documentada). El resto se verifica con suite + build + revisión visual del usuario.
- Si `@apply` rechaza algún util en Tailwind v4, usar la utility cruda equivalente y actualizar el test si cambia el token.
