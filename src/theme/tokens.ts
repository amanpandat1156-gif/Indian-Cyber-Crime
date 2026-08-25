/**
 * NCRP / I4C Design System Centralized Tokens
 * Strictly adherence to the visual source of truth guidelines.
 */

export const colors = {
  primaryNavy: '#12304A',
  darkNavy: '#0B2235',
  warmBg: '#F8F7F3',
  white: '#FFFFFF',
  primaryText: '#1C252C',
  secondaryText: '#5E6B73',
  border: '#DDE2E4',
  successGreen: '#237A57',
  warningAmber: '#B7791F',
  emergencyRed: '#B33A3A',
  restrainedSaffron: '#D8891C',
} as const;

export const radii = {
  card: '10px',
  subtle: '8px',
  badge: '6px',
} as const;

export const typography = {
  eyebrow: 'text-xs font-semibold tracking-wider uppercase text-ncrp-muted',
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ncrp-navy leading-tight',
  h2: 'text-2xl sm:text-3xl font-bold text-ncrp-navy tracking-tight',
  h3: 'text-lg sm:text-xl font-semibold text-ncrp-navy',
  body: 'text-base text-ncrp-text leading-relaxed',
  bodyMuted: 'text-sm sm:text-base text-ncrp-muted leading-relaxed',
  small: 'text-xs sm:text-sm text-ncrp-muted',
} as const;
