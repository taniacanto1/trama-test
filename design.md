# Trama — Design System v3

> Fuente de verdad del sistema de diseño. Refleja el estado actual del código en `trama/src/index.css` y `trama/src/tokens.ts`.

---

## Stack técnico

- **Framework:** React (JSX) + Vite
- **Estilos:** CSS Modules por componente / página
- **Tokens web:** CSS Custom Properties en `src/index.css` (`--color-*`, `--space-*`, etc.)
- **Tokens JS/TS:** objeto exportado en `src/tokens.ts` (para futura compatibilidad React Native)
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

### Accent — ámbar dorado

| Token                  | Valor       |
|------------------------|-------------|
| `--color-accent`       | `#C68A2E`   |
| `--color-accent-light` | `#f7ead8`   |

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
| `--radius-sm`  | 8px     | Inputs, chips pequeños      |
| `--radius-md`  | 12px    | Portadas, thumbnails        |
| `--radius-lg`  | 20px    | Cards, botones, rows        |
| `--radius-xl`  | 24px    | Modales, paneles grandes    |
| `--radius-pill`| 9999px  | Toggles, badges, pills      |

---

## Sombras

| Token               | Uso                                      |
|---------------------|------------------------------------------|
| `--shadow-card`     | Estado reposo de BookCard                |
| `--shadow-card-hover`| Estado hover de BookCard               |
| `--shadow-nav`      | Navbar al hacer scroll                   |
| `--shadow-modal`    | Modales y paneles flotantes              |
| `--shadow-book`     | Elementos destacados tipo libro          |
| `--shadow-cover`    | Portadas de libros (imagen)              |

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
| `--navbar-height`    | 56px                        |
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

> La página **Explorar** usa `padding-top: var(--space-20)` (80px) en lugar del token global `--page-top-padding` (120px) porque su hero requiere menos separación del navbar.

---

## Convenciones de componentes

### "Ver más"
Todos los enlaces "Ver más" en secciones usan el mismo estilo:
- Color: `--color-text-secondary` en reposo → `--color-brand-primary` en hover
- Peso: `--weight-semibold`
- Tamaño: `--text-sm`
- Icono: chevron derecho SVG 14×14px
- Sin text-decoration

### Estrellas de valoración
Componente `StarRating` en DetalleLibro. Colores:
- Estrella llena: `var(--color-brand-primary)`
- Estrella vacía: stroke `var(--color-text-tertiary)`
- Media estrella: gradiente 50% `var(--color-brand-primary)` / 50% transparente

### Conteo de valoraciones
- Tamaño: 10px (por debajo de `--text-xs`)
- Color: `--color-brand-primary`
- `white-space: nowrap`

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

## Decisiones de diseño registradas

- **`--color-error: #b83232`** — rojo oscuro para acciones peligrosas. Intencional: el color oscuro desincentiva el clic.
- **`--text-base: 16px`** — añadido como token para BookCard titles. La escala estándar saltaba de 15px a 18px sin incluir 16px, valor deliberado de diseño.
- **`--font-editorial`** — el token usa `'Crimson'` (sin "Text") como nombre de familia. Google Fonts sirve la fuente como "Crimson Text" pero la familia CSS se resuelve correctamente; el fallback es `Georgia, serif`.
- **Alpha families distintas** — `--color-brand-alpha-*` (naranja) para estados con marca vs `--color-neutral-alpha-*` (oscuro neutro) para chrome sin énfasis. Confundirlos produce tintes naranjas indeseados en elementos neutros.
- **`--color-neutral-alpha-light: rgba(44, 36, 32, 0.04)`** — nivel por debajo de `subtle` (0.06). Usado para hover/active pasivos (p.ej. leyenda de donut) donde un fondo muy tenue es suficiente.
- **`--color-surface-secondary: #f0ece8`** — tono cálido intermedio entre `--color-bg-section` (#f5f2ee) y `--color-border-medium`. Usado para skeleton loaders y fondos de fallback en portadas sin imagen.
