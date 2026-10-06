# Diseño: Pulido visual premium (Opción 1 — sin cambios estructurales)

Fecha: 2026-10-06 · Estado: validado con el usuario

## Objetivo

Refinar toda la interfaz de la app MGA SST a una estética **flat & sobrio** (referencia: Linear/Vercel), manteniendo la paleta azul/gris actual (refinada) y **sin cambiar la disposición** de ninguna pantalla.

## Decisiones validadas

1. **Alcance**: toda la app de una vez (login, registro, dashboard/listados, renderizador + métricas, 22 formularios artesanales, página pública de QR).
2. **Paleta**: refinar la azul/gris actual; no hay marca corporativa que respetar por ahora.
3. **Estética**: flat & sobrio — bordes finos, sombras mínimas, radios medianos, sin gradientes.
4. **Arquitectura (Opción A)**: capa de diseño en CSS (`globals.css` con `@theme` + `@layer components`) y barrido mecánico de classNames en las páginas. Sin componentes React nuevos ni refactor de estructura.

## Sistema de diseño

### Tipografía
- `body`: Geist (ya cargada con `next/font`) en lugar de Arial.
- Jerarquía: títulos `text-xl font-semibold text-gray-900`; labels `text-sm font-medium text-gray-700`; secundario `text-gray-500`.
- `lang="en"` → `lang="es"` en `layout.tsx`.

### Paleta (tokens)
- `--color-primary: #2563eb` (hover `#1d4ed8`, activo `#1e40af`) — botones, links, nav activo.
- `--color-primary-subtle: #eff6ff` — fondos de hover/selección.
- Bordes: tarjetas/divisores `gray-200`; campos `gray-300`.
- Semánticos: éxito `green-600`, error `red-600`, aviso `yellow-500` (la app ya usaba green/yellow; se mantiene).

### Sombras y radios
- Tarjetas: `rounded-xl` + borde `gray-200` + `shadow-sm`.
- Campos y botones: `rounded-lg`.
- `shadow-lg` solo en modales.

### Clases compartidas (`@layer components`)
`.btn` + `.btn-primary` / `.btn-secondary` / `.btn-danger` / `.btn-danger-outline`, `.card`, `.input`, `.label`, `.link`, `.badge`, `.table-base`. Focus: botones `ring-2 ring-blue-500 + ring-offset-2`; campos `ring-2 ring-blue-500 + focus:border-blue-500`.

## Barrido (orden)

1. Base: `globals.css` (tokens + clases), `layout.tsx`.
2. Entrada/navegación: login, registro, home, listados (empresas, proyectos, formatos, usuarios).
3. Renderizador: `[codigo]`, `renderizador-formato.tsx`, `metricas-formato.tsx`.
4. 22 formularios artesanales (sustitución repetitiva de clases).
5. Página pública `/qr/[token]` (prioridad móvil).

**Fuera de alcance**: rutas, API, lógica de estado, esquemas BD, el fix de autenticación del QR (ya resuelto en `src/proxy.ts`).

## Verificación

- `npm run typecheck && npm run lint && npm test && npm run build` en verde (79 tests).
- `npx react-doctor` en los archivos tocados.
- Revisualización visual por el usuario con `npm run dev` (los tests no cubren estilos).

## Riesgos

- Barrido amplio (~30 archivos) con diffs mecánicos: un archivo a medias lo atrapan typecheck/lint/build.
- `@apply` en Tailwind v4 es la base de las clases compartidas; si un util no está disponible se usa la utility cruda como fallback.
