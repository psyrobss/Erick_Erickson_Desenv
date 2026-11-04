/**
 * @file theme.ts
 * Tema central para styled-components alinhado às diretrizes de design acadêmico e acessibilidade
 */

export const theme = {
  colors: {
    primary: '#4338ca', // Indigo 700 (accessible contrast)
    primaryLight: '#e0e7ff',
    primaryDark: '#312e81',
    secondary: '#0f766e', // Teal 700
    secondaryLight: '#ccfbf1',
    accent: '#d97706', // Amber 600
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceSubtle: '#f1f5f9',
    textMain: '#0f172a',
    textMuted: '#475569',
    border: '#e2e8f0',
    borderHover: '#cbd5e1',
    success: '#15803d',
    successBg: '#f0fdf4',
    warning: '#b45309',
    warningBg: '#fffbeb',
    error: '#b91c1c',
    errorBg: '#fef2f2',
  },
  typography: {
    fontSans: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontDisplay: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', monospace",
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
    cardHover: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
    modal: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
};

export type AppTheme = typeof theme;
