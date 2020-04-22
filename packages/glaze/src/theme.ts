import type { Theme as ThemeUI } from '@theme-ui/css';
import { CSSProperties } from 'react';
import { createTheme as createStaticTheme, ThemeRef } from 'treat';
import { ThemeOrAny } from 'treat/theme';

import { isDev } from './env';
import { warnOnce } from './logger';
import { defaultTokens } from './presets/defaultTokens';
import { emptyTokens } from './presets/emptyTokens';

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;

export interface ScaleTokens<T extends keyof CSSProperties> {
  [key: string]: NonNullable<CSSProperties[T]>;
}

export interface CommonTheme {
  breakpoints: readonly number[];
  shorthands: { [key: string]: ReadonlyArray<keyof CSSProperties> };
  aliases: { [key: string]: keyof CSSProperties | Tokens<'shorthands'> };
}

export interface RuntimeTheme extends CommonTheme {
  ref: ThemeRef;
}

export interface StaticTheme extends CommonTheme {
  scales: {
    spacing: ScaleTokens<'margin'>;
    size: ScaleTokens<'width'>;
    fontFamily: ScaleTokens<'fontFamily'>;
    fontSize: ScaleTokens<'fontSize'>;
    fontWeight: ScaleTokens<'fontWeight'>;
    lineHeight: ScaleTokens<'lineHeight'>;
    color: ScaleTokens<'color'>;
    letterSpacing: ScaleTokens<'letterSpacing'>;
    border: ScaleTokens<'border'>;
    borderWidth: ScaleTokens<'borderWidth'>;
    radius: ScaleTokens<'borderRadius'>;
    shadow: ScaleTokens<'boxShadow'>;
    opacity: ScaleTokens<'opacity'>;
    zIndex: ScaleTokens<'zIndex'>;
    duration: ScaleTokens<'animationDuration'>;
  };
  matchers: {
    [property in keyof CSSProperties]: keyof this['scales'] | Tokens<'scales'>;
  };
}

export function createTheme(
  tokens: ThemeOrAny,
  localDebugName?: string,
): RuntimeTheme {
  // All tokens are optional, but must have an empty value by default
  const extendedTokens = {
    ...emptyTokens,
    ...tokens,
    scales: {
      ...emptyTokens.scales,
      ...tokens.scales,
    },
  };
  const { breakpoints, shorthands, aliases } = extendedTokens;

  if (breakpoints.some((breakpoint, i) => breakpoint > breakpoints[i + 1])) {
    warnOnce(
      '`breakpoints` of a theme should be in ascending order to avoid issues with CSS specificity.',
    );
  }

  return {
    ref: createStaticTheme(extendedTokens, localDebugName),
    breakpoints,
    shorthands,
    aliases,
  };
}

export function fromThemeUI(theme: ThemeUI): StaticTheme {
  /** Breakpoints
   *  Theme UI allows any string value. Treat only wants pixel values in numbers.
   */
  const breakpoints = theme.breakpoints?.map((breakpoint) => {
    const glazeBreakpoint = Number(breakpoint.replace('px', ''));
    if (glazeBreakpoint > -1) {
      return glazeBreakpoint;
    }
    if (isDev) {
      warnOnce(`Could not convert breakpoint value '${breakpoint}' to number`);
    }
    return undefined;
  });

  /** Color
   * We just ignore color modes for now and show a warning
   */
  if (theme.colors?.modes) {
    warnOnce('Color Modes are not currently supported in glaze.');
  }

  const color = {};
  // glaze only supports strings for color tokens
  Object.keys(theme.colors).forEach((colorKey) => {
    if (typeof theme.colors[colorKey] === 'string') {
      color[colorKey] = theme.colors[colorKey];
    }
  });

  return {
    ...emptyTokens,
    breakpoints,
    scales: {
      ...emptyTokens.scales,
      color,
      spacing: theme.space as StaticTheme['scales']['spacing'],
      border: theme.borders as StaticTheme['scales']['border'],
      borderWidth: theme.borderWidths as StaticTheme['scales']['borderWidth'],
      size: theme.sizes as StaticTheme['scales']['size'],
      fontFamily: theme.fonts as StaticTheme['scales']['fontFamily'],
      fontSize: theme.fontSizes as StaticTheme['scales']['fontSize'],
    },
    // shorthands: defaultTokens.shorthands,
    // aliases: defaultTokens.aliases,
    // matchers: defaultTokens.matchers,
  };
}

const convertedTheme = fromThemeUI({
  breakpoints: ['576px', '768px', '992px', '1200px', '100%'],
  colors: {
    white: '#fff',
    black: '#000',
    gray: [
      '#fff',
      '#f8f9fa',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#6c757d',
      '#495057',
      '#343a40',
      '#212529',
    ],
    blue: '#007bff',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#e83e8c',
    red: '#dc3545',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#28a745',
    teal: '#20c997',
    cyan: '#17a2b8',
    grayDark: '#343a40',
    text: '#212529',
    background: '#fff',
    primary: '#007bff',
    secondary: '#6c757d',
    muted: '#dee2e6',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
    textMuted: '#6c757d',
  },
  space: ['0rem', '0.25rem', '0.5rem', '1rem', '1.5rem', '3rem'],
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    heading: 'inherit',
    monospace:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    sans:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  fontSizes: [
    '0.75rem',
    '0.875rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '1.75rem',
    '2rem',
    '2.5rem',
    '3.5rem',
    '4.5rem',
    '5.5rem',
    '6rem',
  ],
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 700,
    light: 300,
    normal: 400,
    display: 300,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  sizes: {
    sm: 540,
    md: 720,
    lg: 960,
    xl: 1140,
  },
  shadows: {
    default: '0 .5rem 1rem rgba(0, 0, 0, .15)',
    sm: '0 .125rem .25rem rgba(0, 0, 0, .075)',
    lg: '0 1rem 3rem rgba(0, 0, 0, .175)',
  },
  radii: {
    default: '0.25rem',
    sm: '0.2rem',
    lg: '0.3rem',
    pill: '50rem',
  },
  typeStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
    },
    display: {
      fontWeight: 'display',
      lineHeight: 'heading',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline',
      },
    },
    p: {
      mb: 3,
      lineHeight: 'body',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 7,
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 6,
    },
    h3: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 5,
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 4,
    },
    h5: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 3,
    },
    h6: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: 0,
      mb: 2,
      fontSize: 2,
    },
    blockquote: {
      fontSize: 3,
      mb: 3,
    },
    table: {
      width: '100%',
      marginBottom: 3,
      color: 'gray.9',
      borderCollapse: 'collapse',
    },
    th: {
      verticalAlign: 'bottom',
      borderTopWidth: 2,
      borderTopStyle: 'solid',
      borderTopColor: 'gray.3',
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: 'gray.3',
      padding: '.75rem',
      textAlign: 'inherit',
    },
    td: {
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
      borderBottomColor: 'gray.3',
      verticalAlign: 'top',
      padding: '.75rem',
    },
    inlineCode: {
      color: 'pink',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
});

// console.log(convertedTheme);
console.log(convertedTheme.scales.size.md);
