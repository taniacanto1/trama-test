# Trama — Design System v3

> Fuente de verdad del sistema de diseño. Refleja el estado actual del código en `trama/src/index.css` y los CSS Modules en `trama/src/`.

---

## Stack técnico

- **Framework:** React (JSX) + Vite
- **Estilos:** CSS Modules por componente / página
- **Tokens web:** CSS Custom Properties en `src/index.css` (`--color-*`, `--space-*`, etc.)
- **Fuentes:** Google Fonts — Manrope (UI) · Crimson Text (editorial)

---

## Fuentes

| Token CSS          | Valor                         | Uso                        |
|--------------------|-------------------------------|----------------------------|
| `--font-ui`        | `'Manrope', sans-serif`       | Todo el UI, etiquetas, botones |
| `--font-editorial` | `'Crimson', Georgia, serif`   | Títulos editoriales, hero  |

> La fuente cargada desde Google Fonts es **Crimson Text**. El token usa `'Crimson'` como alias; si no resuelve, cae a Georgia.

---

## Escala tipográfica

| Token          | Valor | Uso típico                        |
|----------------|-------|-----------------------------------|
| `--text-xs`    | 12px  | Metadata, conteos, etiquetas tiny |
| `--text-sm`    | 13px  | Texto secundario, labels          |
| `--text-md`    | 15px  | Cuerpo de texto base              |
| `--text-base`  | 16px  | Títulos de cards (BookCard)       |
| `--text-lg`    | 18px  | Subtítulos de sección             |
| `--text-xl`    | 22px  | Headings de página, modales       |
| `--text-2xl`   | 24px  | Hero headings (mínimo clamp)      |
| `--text-3xl`   | 28px  | Display / reserved                |

### Pesos

| Token               | Valor |
|---------------------|-------|
| `--weight-regular`  | 400   |
| `--weight-medium`   | 500   |
| `--weight-semibold` | 600   |
| `--weight-bold`     | 700   |
| `--weight-extrabold`| 800   |

---

## Colores

### Marca — naranja principal

| Token                      | Valor                        |
|----------------------------|------------------------------|
| `--color-brand-primary`    | `#e86b30`                    |
| `--color-brand-dark`       | `#c9581f`                    |
| `--color-brand-light`      | `#f5e4d8`                    |
| `--color-brand-muted`      | `#e8a882`                    |
| `--color-brand-deep`       | `#A83D0A`                    |
| `--color-brand-ember`      | `#C44E12`                    |

### Alpha variants — brand (tinte naranja)

Usadas para estados interactivos con énfasis de marca (hover, active, selected).

| Token                        | Valor                        |
|------------------------------|------------------------------|
| `--color-brand-alpha-subtle` | `rgba(232, 107, 48, 0.06)`   |
| `--color-brand-alpha-muted`  | `rgba(232, 107, 48, 0.08)`   |
| `--color-brand-alpha-medium` | `rgba(232, 107, 48, 0.12)`   |

### Alpha variants — neutral (UI chrome)

Usadas para elementos sin énfasis de marca: chevrones, badges de conteo, fondos de superficie neutral.

| Token                          | Valor                       |
|--------------------------------|-----------------------------|
| `--color-neutral-alpha-light`  | `rgba(44, 36, 32, 0.04)`    |
| `--color-neutral-alpha-subtle` | `rgba(44, 36, 32, 0.06)`    |
| `--color-neutral-alpha-muted`  | `rgba(44, 36, 32, 0.08)`    |
| `--color-neutral-alpha-medium` | `rgba(44, 36, 32, 0.14)`    |

> **Regla:** usar `brand-alpha-*` cuando el elemento comunica una acción de marca. Usar `neutral-alpha-*` para chrome/UI sin relevancia de marca (filtros, conteos, separadores).

### Status

| Token                   | Valor                        |
|-------------------------|------------------------------|
| `--color-success`       | `#5a7a60`                    |
| `--color-success-bg`    | `rgba(90, 122, 96, 0.10)`    |
| `--color-success-border`| `#8da890`                    |
| `--color-error`         | `#b83232`                    |
| `--color-error-bg`      | `rgba(184, 50, 50, 0.08)`    |
| `--color-error-border`  | `rgba(184, 50, 50, 0.35)`    |
| `--color-info`          | `#6B7F9E`                    |
| `--color-info-bg`       | `#dde4ee`                    |

> `--color-error` es deliberadamente oscuro (`#b83232`) para comunicar acción peligrosa sin invitar a pulsarlo.

### Superficies

| Token                       | Valor                        |
|-----------------------------|------------------------------|
| `--color-bg-page`           | `#FAFAF8`                    |
| `--color-bg-section`        | `#f5f2ee`                    |
| `--color-surface-secondary` | `#f0ece8`                    |
| `--color-bg-card`           | `rgba(255, 255, 255, 0.72)`  |
| `--color-bg-card-solid`     | `#ffffff`                    |
| `--color-bg-overlay`        | `rgba(244, 238, 233, 0.85)`  |
| `--color-bg-synopsis`       | `rgba(252, 242, 236, 0.85)`  |

### Texto

| Token                    | Valor      |
|--------------------------|------------|
| `--color-text-primary`   | `#2c2420`  |
| `--color-text-secondary` | `#6B635A`  |
| `--color-text-tertiary`  | `#9C9488`  |
| `--color-text-on-brand`  | `#ffffff`  |
| `--color-text-on-dark`   | `#faf6f1`  |

### Bordes

| Token                  | Valor                       |
|------------------------|-----------------------------|
| `--color-border-subtle`| `rgba(44, 36, 32, 0.08)`    |
| `--color-border-medium`| `rgba(44, 36, 32, 0.18)`    |
| `--color-border-strong`| `rgba(44, 36, 32, 0.30)`    |
| `--color-border-warm`  | `rgba(175, 138, 120, 0.40)` |

### Géneros

| Token                       | Valor      |
|-----------------------------|------------|
| `--color-genre-fiction`     | `#d4500f`  |
| `--color-genre-nonfiction`  | `#b8745a`  |
| `--color-genre-mystery`     | `#7a8fa3`  |
| `--color-genre-romance`     | `#c47a8a`  |
| `--color-genre-scifi`       | `#6b7f9e`  |
| `--color-genre-default`     | `#e3ddd5`  |

---

## Espaciado

Grid de 4px. Nomenclatura: `--space-{n}` donde el valor es `n × 4px`.

| Token        | Valor  | Token        | Valor  |
|--------------|--------|--------------|--------|
| `--space-1`  | 4px    | `--space-10` | 40px   |
| `--space-2`  | 8px    | `--space-12` | 48px   |
| `--space-3`  | 12px   | `--space-14` | 56px   |
| `--space-4`  | 16px   | `--space-16` | 64px   |
| `--space-5`  | 20px   | `--space-20` | 80px   |
| `--space-6`  | 24px   | `--space-24` | 96px   |
| `--space-7`  | 28px   | `--space-30` | 120px  |
| `--space-8`  | 32px   | `--space-40` | 160px  |
| `--space-9`  | 36px   |              |        |

---

## Border radius

| Token          | Valor   | Uso típico                  |
|----------------|---------|-----------------------------|
| `--radius-sm`  | 8px     | Inputs, chips pequeños, portadas en cards |
| `--radius-md`  | 12px    | Thumbnails, synopsis cards, dropdowns |
| `--radius-lg`  | 20px    | Cards, botones, rows, navbar |
| `--radius-xl`  | 24px    | Modales, paneles grandes, infoCard |
| `--radius-pill`| 9999px  | Toggles, badges, pills, avatares, iconButtons |

---

## Sombras

| Token               | Valor CSS                                                                 | Uso                                      |
|---------------------|---------------------------------------------------------------------------|------------------------------------------|
| `--shadow-card`     | `0 1px 3px rgba(44,36,32,0.06), 0 4px 12px rgba(44,36,32,0.04)`         | Estado reposo de BookCard                |
| `--shadow-card-hover`| `0 4px 16px rgba(44,36,32,0.10), 0 1px 4px rgba(44,36,32,0.06)`        | Estado hover de BookCard                 |
| `--shadow-nav`      | `0 4px 20px rgba(44,36,32,0.08), 0 1px 4px rgba(44,36,32,0.04)`         | Navbar                                   |
| `--shadow-modal`    | `0 24px 64px rgba(44,36,32,0.16), 0 8px 24px rgba(44,36,32,0.08)`       | Modales y paneles flotantes              |
| `--shadow-book`     | `0 8px 24px rgba(44,36,32,0.18), 0 2px 6px rgba(44,36,32,0.10)`         | Elementos destacados tipo libro (hover)  |
| `--shadow-cover`    | `0 4px 16px rgba(44,36,32,0.20), 0 1px 4px rgba(44,36,32,0.10)`         | Portadas de libros (imagen)              |

> Todas las sombras usan `rgba(44, 36, 32, α)` — tono cálido oscuro, no negro frío.

---

## Transiciones

| Token               | Valor           |
|---------------------|-----------------|
| `--transition-fast` | 150ms ease-out  |
| `--transition-base` | 200ms ease-out  |
| `--transition-slow` | 300ms ease-out  |

---

## Layout

| Token                | Valor                       |
|----------------------|-----------------------------|
| `--navbar-height`    | 50px                        |
| `--page-max-width`   | 1200px                      |
| `--page-padding-x`   | 40px (responsive)           |
| `--page-padding-y`   | 48px → 24px (sm)            |
| `--page-top-padding` | 120px → 80px (sm)           |
| `--grid-cols`        | 3 → 2 (lg) → 1 (sm)        |
| `--cover-size`       | 174px → 160px (lg) → 120px (sm) |

### Breakpoints

| Nombre | Valor  | Cambios principales                                                            |
|--------|--------|--------------------------------------------------------------------------------|
| lg     | 1024px | `--page-padding-x` a 24px, `--grid-cols` a 2, `--cover-size` a 160px          |
| md     | 768px  | `--page-padding-x` a 20px                                                      |
| sm     | 640px  | `--page-padding-x` a 16px, `--page-padding-y` a 24px, `--page-top-padding` a 80px, `--grid-cols` a 1, `--cover-size` a 120px |

> **Explorar:** usa `padding-top: var(--space-20)` (80px) en lugar de `--page-top-padding` (120px) porque su hero requiere menos separación del navbar. También tiene un breakpoint extra a **900px** donde los grids de cards cambian a scroll horizontal (2 filas para secciones estándar, 1 fila para Tendencias).

---

## Convenciones de componentes

### "Ver más" / enlaces de sección
Todos los enlaces "Ver más" en secciones usan el mismo estilo (`.verTodo`, `.sectionLink`):
- Color: `--color-text-secondary` en reposo → `--color-brand-primary` en hover
- Peso: `--weight-semibold`
- Tamaño: `--text-sm`
- Icono: chevron derecho SVG 14×14px
- Sin text-decoration

### NavbarFull — estructura y comportamiento

`NavbarFull.module.css` — barra superior fija, visible en ≥640px.

- **Posición:** `position: fixed; top: 10px; left: 50%` centrada con `transform: translateX(-50%)`
- **Tamaño:** `width: calc(100% - 80px); max-width: 1200px; max-height: 50px`
- **Padding:** `8px 28px`
- **Fondo:** `var(--color-brand-primary)` — naranja sólido
- **Border-radius:** `var(--radius-lg)` (20px)
- **Sombra:** `var(--shadow-nav)`
- **Oculto (scroll):** `opacity: 0; transform: translateX(-50%) translateY(-12px)` con `transition: 280ms ease-out`
- **Links de navegación (`.navLinks`):** centrados absolutamente con `position: absolute; left: 50%; transform: translateX(-50%)`. Gap entre links: 28px. Color: `rgba(255,255,255,0.85)` → blanco completo en hover/active. Active con subrayado `height: 2px; background: rgba(255,255,255,0.8)` posicionado `bottom: -4px`.
- **Botón "Registrar lectura" (`.registerBtn`):** estado colapsado — `34×34px`, `border-radius: pill`, fondo blanco sólido. En hover expande a `max-width: 180px` con `gap: 5px; padding-right: 14px; border-radius: var(--radius-lg)`. El texto aparece con `opacity` y `max-width` animados (delay de 120ms en entrada). Transición total: 300ms.
- **Iconos de acción (`.iconBtn`):** `34×34px`, `border-radius: pill`, fondo `rgba(255,255,255,0.18)` → `0.28` en hover
- **Avatar (`.avatar`):** `32×32px`, `border-radius: pill`, fondo `rgba(255,255,255,0.25)`, borde `2px solid rgba(255,255,255,0.6)`

### NavbarMini — navegación flotante inferior

`NavbarMini.module.css` — pill flotante que aparece al hacer scroll, visible en mobile y como alternativa en desktop.

- **Posición:** `position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%)`
- **Animación de entrada:** `transform: translateY(80px); opacity: 0` → visible con `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring, 350ms) y `opacity: 250ms ease-out`
- **Padding interno:** 6px; `border-radius: pill`
- **Items (`.item`):** `padding: 10px 28px; border-radius: var(--radius-xl)`. Icono SVG 20×20px + label `--text-xs` `--weight-semibold`. Transition: 180ms.
- **Indicador activo (`.itemActive::before`):** punto circular `4×4px` en `border-radius: pill`, posicionado `top: 4px; left: 50%`

#### Variantes de estilo

| Variante  | Fondo                                   | Item inactivo              | Item hover                          | Item activo                        |
|-----------|-----------------------------------------|----------------------------|-------------------------------------|-------------------------------------|
| `.glass`  | `rgba(250,250,248,0.82)` + blur(20px)  | `--color-text-secondary`   | `--color-text-primary` + brand alpha subtle | `--color-brand-primary`    |
| `.warm`   | `var(--color-brand-primary)`            | `rgba(255,255,255,0.7)`   | blanco completo + `rgba(255,255,255,0.10)` bg | blanco + `rgba(255,255,255,0.15)` bg |
| `.dark`   | `var(--color-text-primary)`             | `rgba(250,246,241,0.5)`   | `--color-text-on-dark` + `rgba(255,255,255,0.06)` bg | `--color-brand-primary` + brand alpha medium |

#### OptionBar (panel de filtros/orden)

Panel flotante asociado: `position: fixed; top: 72px; right: 16px`. Fondo `rgba(255,255,255,0.92)` + `blur(12px)`. Labels en `--text-xs --weight-bold uppercase`. Botones: `padding: 7px 13px; border-radius: var(--radius-sm)`. Estados: hover → borde y color brand-primary; activo → fondo brand-primary sólido.

### Estrellas de valoración

Componente `StarRating` en DetalleLibro. Colores:
- Estrella llena: `var(--color-brand-primary)`
- Estrella vacía: stroke `var(--color-text-tertiary)`
- Media estrella: gradiente 50% `var(--color-brand-primary)` / 50% transparente

### Conteo de valoraciones — contexto

El estilo varía según el componente:

| Componente     | Tamaño | Color                          |
|----------------|--------|--------------------------------|
| DetalleLibro   | 10px   | `var(--color-brand-primary)`   |
| BookCard       | `--text-xs` (12px) | `var(--color-text-tertiary)` |
| Explorar resultados | `--text-xs` (12px) | `var(--color-text-tertiary)` |

> En DetalleLibro el conteo usa naranja de marca para reforzar la credibilidad del rating. En BookCard y results es más discreto (terciario).

### Chevron button (`.chevronBtn`)

Patrón compartido en MiBiblioteca para navegación de estantería:
- `36×36px`, `border-radius: pill`
- Fondo: `var(--color-neutral-alpha-muted)` → `var(--color-neutral-alpha-medium)` en hover
- Icono SVG 16×16px; versión izquierda con `transform: rotate(180deg)`

### Botones — patrones principales

| Clase        | Apariencia                                           | Hover                          |
|--------------|------------------------------------------------------|--------------------------------|
| `.btnFill`   | Fondo `--color-brand-primary`, texto blanco          | Fondo `--color-brand-dark`     |
| `.btnOutline`| Borde `1.5px solid --color-border-medium`, transparent | Brand alpha subtle + borde brand-primary |
| `.btnVer`    | Igual que `.btnFill`, `padding: 7–8px 16–20px`      | Fondo `--color-brand-dark`     |

Todos los botones: `border-radius: var(--radius-lg)`, `--text-sm --weight-bold`, `transition: fast`. Activo: `transform: scale(0.97)`. Focus-visible: `outline: 2px solid --color-brand-primary; outline-offset: 3px`. Disabled: fondo `--color-text-tertiary`.

### Save button + Dropdown

El botón de guardado existe en dos variantes:

**Compacto (BookCard, Explorar):** `32×32px pill`, borde `1.5px solid --color-border-medium`, fondo semi-transparente. Hover → borde/color brand-primary. Activo → `--color-brand-alpha-muted`. Guardado → vuelve a borde neutro.

**Expandido (DetalleLibro):** `padding: 9px 20px`, `border-radius: var(--radius-xl)`. Estado guardado → fondo transparente, borde y texto brand-primary. Chevron aparece en hover (animación `width + opacity`).

**Dropdown de estante:** fondo `--color-bg-page`, borde `1px solid --color-brand-primary`, `border-radius: var(--radius-md)`, `blur(20px) saturate(1.4)`. Items: `padding: 7–8px 13–14px; border-radius: var(--radius-sm); border: 1.5px solid --color-border-subtle`. Item activo: fondo brand-primary sólido, texto blanco. Animación: `dropdownIn` (opacity + translateY/X + scale(0.98→1), 180–200ms).

### Modales

Patrón compartido en DetalleLibro, Explorar y ProgressModal:

- **Backdrop:** `rgba(44, 36, 32, 0.45)` + `blur(4px)`, `animation: fadeIn 200ms`
- **Caja (`.modalBox`):** fondo `--color-bg-card-solid`, borde `1px solid --color-border-subtle`, `border-radius: var(--radius-xl)`, `max-width: 560px`, `max-height: 85vh`, `animation: slideUp 220ms cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Header:** `padding: 20px 24px 16px`, separador `1px solid --color-border-subtle`
- **Título:** `--text-lg --weight-bold`, `letter-spacing: -0.01em`
- **Botón cerrar:** `32×32px pill`, borde `1px solid --color-border-subtle` → brand alpha subtle en hover
- **Body:** `padding: 20px 24px 24px`, texto `--text-md`, `line-height: 1.75`

### Synopsis card (inline)

Patrón para mostrar sinopsis en cards (BookCard y Explorar results):
- Fondo `--color-bg-card`, borde `1px solid --color-border-medium`, `border-radius: var(--radius-md)`
- `padding: 10px 14px 0; overflow: hidden`
- `max-height` limitado (170px en DetalleLibro, 162px en Explorar) con gradiente de fade al fondo
- Gradiente de fade: `linear-gradient(to bottom, rgba(255,248,244,0) 0%, --color-bg-synopsis 45%, rgba(250,238,228,0.97) 100%)`
- Botón "Leer más": `--text-xs --weight-bold`, color `--color-brand-primary`, `opacity: 0.75` en hover

### FilterTabs (MiBiblioteca)

Contenedor: `background: --color-bg-card`, borde `1px solid --color-border-subtle`, `border-radius: var(--radius-lg)`, `padding: 6px 8px`, `box-shadow: var(--shadow-card)`.

Tab: `padding: 7px 18px; border-radius: pill; border: 1.5px solid transparent`. Hover → borde brand-primary + brand-alpha-subtle bg. Activo → solo borde brand-primary (sin fondo). Badge de conteo (`.filterCount`): `min-width: 18px; height: 18px; border-radius: pill; background: --color-neutral-alpha-muted`. Activo → `--color-neutral-alpha-medium`.

### Skeleton / loading states

Animación `shimmer` (MiBiblioteca): gradiente horizontal de `--color-border-subtle → --color-border-medium → --color-border-subtle` sobre 800px, animado en 1.4s lineal.

Animación `shimmer` (Explorar): `opacity: 1 → 0.5 → 1` en 1.4s, fondo `--color-surface-secondary`.

Usos: `cardSkeleton` (Explorar, `height: 188px`), `coverPlaceholder` (MiBiblioteca, `120×174px`), `skeletonText` (altura 1em), `shelfBookSkeleton` (160px alto).

### Barra de progreso de lectura (MiBiblioteca)

Track: `height: 18px; border-radius: var(--radius-md); border: 1px solid --color-border-warm; background: rgba(255,255,255,0.3)`.

Fill: gradiente `linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(247,212,196,0.6) 30%, rgba(238,169,137,0.7) 60%, rgba(223,92,32,0.85) 100%)`. Etiqueta de porcentaje: `--text-sm --weight-bold`, color `--color-brand-dark`. Transición: 600ms ease-out.

---

## Clases globales de utilidad

Definidas en `index.css` y disponibles en todos los módulos.

| Clase                  | Descripción                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `.is-loading`          | Oculta el texto del elemento y muestra un spinner de 16px centrado          |
| `.empty-state`         | Contenedor centrado para estados vacíos (flex-column, gap `--space-3`)      |
| `.empty-state__icon`   | Icono 48×48px en `--color-text-tertiary`                                    |
| `.empty-state__title`  | Título de estado vacío: `--text-lg`, `--weight-semibold`                    |
| `.empty-state__text`   | Texto descriptivo: `--text-md`, `--color-text-secondary`, max-width 320px   |

---

## Animaciones

| Nombre         | Definición                                                    | Uso                         |
|----------------|---------------------------------------------------------------|-----------------------------|
| `spin`         | `rotate(360deg)` en 0.6s lineal                              | Spinner `.is-loading`       |
| `dropdownIn`   | `opacity 0→1` + `translateY/X(-6px)→0` + `scale(0.98→1)`    | Dropdowns de estante        |
| `fadeIn`       | `opacity 0→1`                                                 | Backdrop de modales         |
| `slideUp`      | `translateY(12px)→0` + `opacity 0→1`, 220ms spring           | Caja de modales             |
| `savedPop`     | `scale(1→1.08→1)`                                             | Feedback al guardar libro   |
| NavbarMini in  | `translateY(80px)→0` + `opacity 0→1`, spring `(0.34,1.56,0.64,1)` | NavbarMini visible    |

---

## Decisiones de diseño registradas

- **`--color-error: #b83232`** — rojo oscuro para acciones peligrosas. Intencional: el color oscuro desincentiva el clic.
- **`--text-base: 16px`** — añadido como token para BookCard titles. La escala estándar saltaba de 15px a 18px sin incluir 16px, valor deliberado de diseño.
- **`--font-editorial`** — el token usa `'Crimson'` (sin "Text") como nombre de familia. Google Fonts sirve la fuente como "Crimson Text" pero la familia CSS se resuelve correctamente; el fallback es `Georgia, serif`.
- **Alpha families distintas** — `--color-brand-alpha-*` (naranja) para estados con marca vs `--color-neutral-alpha-*` (oscuro neutro) para chrome sin énfasis. Confundirlos produce tintes naranjas indeseados en elementos neutros.
- **`--color-neutral-alpha-light: rgba(44, 36, 32, 0.04)`** — nivel por debajo de `subtle` (0.06). Usado para hover/active pasivos (p.ej. leyenda de donut) donde un fondo muy tenue es suficiente.
- **`--color-surface-secondary: #f0ece8`** — tono cálido intermedio entre `--color-bg-section` (#f5f2ee) y `--color-border-medium`. Usado para skeleton loaders y fondos de fallback en portadas sin imagen.
- **NavbarMini spring** — usa `cubic-bezier(0.34, 1.56, 0.64, 1)` para la entrada (efecto rebote), mientras la transición de opacidad es `ease-out` más suave para no chocar visualmente.
- **Explorar breakpoint 900px** — punto adicional fuera de la escala global (lg/md/sm) exclusivo para Explorar, donde los grids cambian a scroll horizontal antes de que el layout colapse completamente.
- **10px hardcodeado en DetalleLibro** — `.ratingCount` usa `10px` literal (por debajo de `--text-xs` que es 12px) para que el conteo de valoraciones quede jerárquicamente por debajo de las estrellas sin consumir demasiado espacio.
