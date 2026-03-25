/**
 * TRAMA — Design Tokens v3
 *
 * Fuente de verdad compartida para web (CSS custom properties en index.css)
 * y futuro uso en React Native (StyleSheet, theme providers).
 *
 * En web: los valores CSS viven en index.css como --color-*, --space-*, etc.
 * En React Native: importar este objeto directamente en lugar de CSS.
 */

export const tokens = {

  // ── Fuentes ──────────────────────────────────────────────
  font: {
    ui:       "'Manrope', sans-serif",
    editorial: "'Crimson', Georgia, serif",
  },

  // ── Colores ──────────────────────────────────────────────
  color: {
    // Marca — naranja principal
    brandPrimary: '#e86b30',
    brandDark:    '#c9581f',
    brandLight:   '#f5e4d8',
    brandMuted:   '#e8a882',
    brandDeep:    '#A83D0A',
    brandEmber:   '#C44E12',

    // Accent — ámbar dorado
    accent:       '#C68A2E',
    accentLight:  '#f7ead8',

    // Alpha variants del brand (hover / active / selected)
    brandAlphaSubtle: 'rgba(232, 107, 48, 0.06)',
    brandAlphaMuted:  'rgba(232, 107, 48, 0.08)',
    brandAlphaMedium: 'rgba(232, 107, 48, 0.12)',

    // Status
    success:       '#5a7a60',
    successBg:     'rgba(90, 122, 96, 0.10)',
    successBorder: '#8da890',

    error:         '#b83232',
    errorBg:       'rgba(184, 50, 50, 0.08)',
    errorBorder:   'rgba(184, 50, 50, 0.35)',

    info:          '#6B7F9E',
    infoBg:        '#dde4ee',

    // Superficies
    bgPage:       '#FAFAF8',
    bgSection:    '#f5f2ee',
    bgCard:       'rgba(255, 255, 255, 0.72)',
    bgCardSolid:  '#ffffff',
    bgOverlay:    'rgba(244, 238, 233, 0.85)',
    bgSynopsis:   'rgba(252, 242, 236, 0.85)',

    // Texto
    textPrimary:   '#2c2420',
    textSecondary: '#6B635A',
    textTertiary:  '#9C9488',
    textOnBrand:   '#ffffff',
    textOnDark:    '#faf6f1',

    // Bordes
    borderSubtle: 'rgba(44, 36, 32, 0.08)',
    borderMedium: 'rgba(44, 36, 32, 0.18)',
    borderStrong: 'rgba(44, 36, 32, 0.30)',
    borderWarm:   'rgba(175, 138, 120, 0.40)',

    // Géneros
    genreFiction:    '#d4500f',
    genreNonfiction: '#b8745a',
    genreMystery:    '#7a8fa3',
    genreRomance:    '#c47a8a',
    genreScifi:      '#6b7f9e',
    genreDefault:    '#e3ddd5',
  },

  // ── Tipografía — tamaños (en px, usar como number en RN) ─
  text: {
    xs:   12,
    sm:   13,
    md:   15,
    base: 16,
    lg:   18,
    xl:   22,
    '2xl': 24,
    '3xl': 28,
  },

  // ── Tipografía — pesos ───────────────────────────────────
  weight: {
    regular:   '400' as const,
    medium:    '500' as const,
    semibold:  '600' as const,
    bold:      '700' as const,
    extrabold: '800' as const,
  },

  // ── Espaciado (en px, usar como number en RN) ────────────
  space: {
    1:   4,
    2:   8,
    3:  12,
    4:  16,
    5:  20,
    6:  24,
    7:  28,
    8:  32,
    9:  36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    30: 120,
    40: 160,
  },

  // ── Border radius ────────────────────────────────────────
  radius: {
    sm:   8,
    md:   12,
    lg:   20,
    xl:   24,
    pill: 9999,
  },

  // ── Sombras (para React Native usar el objeto shadow) ────
  shadow: {
    // React Native shadow format
    card: {
      shadowColor:  '#2c2420',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius:  6,
      elevation: 2,
    },
    cardHover: {
      shadowColor:  '#2c2420',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.10,
      shadowRadius:  8,
      elevation: 4,
    },
    cover: {
      shadowColor:  '#2c2420',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius:  8,
      elevation: 5,
    },
    book: {
      shadowColor:  '#2c2420',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
      elevation: 8,
    },
    modal: {
      shadowColor:  '#2c2420',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.16,
      shadowRadius: 32,
      elevation: 20,
    },
  },

  // ── Duración de transiciones (ms) ───────────────────────
  duration: {
    fast:     150,
    base:     200,
    slow:     300,
    progress: 600,
  },

  // ── Breakpoints (px) ────────────────────────────────────
  breakpoint: {
    sm:  640,   // mobile
    md:  768,   // tablet portrait
    lg: 1024,   // tablet landscape / desktop pequeño
    xl: 1200,   // max-width layouts
  },

  // ── Layout ──────────────────────────────────────────────
  layout: {
    navbarHeight:   56,
    pageMaxWidth:  1200,
    pageTopPadding: 120,  // desktop; 80px en mobile (<640px)
  },

} as const;

export type Tokens = typeof tokens;

// Helpers tipados para acceder a valores frecuentes
export const { color, space, text, radius, shadow, duration } = tokens;
