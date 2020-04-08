import { CSSProperties } from 'react';
import { createTheme as createStaticTheme, ThemeRef } from 'treat';
import { ThemeOrAny } from 'treat/theme';

import { modularScale } from './scales';

export interface ScaleTokens<T extends keyof CSSProperties> {
  [key: string]: NonNullable<CSSProperties[T]>;
}

export interface CommonTheme {
  breakpoints: readonly number[];
  shorthands: { [key: string]: ReadonlyArray<keyof CSSProperties> };
  aliases: {
    [key: string]:
      | keyof CSSProperties
      | Extract<keyof ThemeOrAny['shorthands'], string>;
  };
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
  };
  resolvers: {
    [key in keyof CSSProperties]:
      | keyof StaticTheme['scales']
      | keyof ThemeOrAny['scales'];
  };
}

export function createTheme(
  tokens: ThemeOrAny & StaticTheme,
  localDebugName?: string,
): RuntimeTheme {
  const { breakpoints, shorthands, aliases } = tokens;
  return {
    ref: createStaticTheme(tokens, localDebugName),
    breakpoints,
    shorthands,
    aliases,
  };
}

// TODO: symmetricScale()
const spacing = {
  0: 0,
  '1px': 1,
  1: '.25rem',
  2: '.5rem',
  3: '.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

export const defaultTokens = {
  breakpoints: [640, 768, 1024, 1280],

  scales: {
    spacing,
    size: {
      ...spacing,
      auto: 'auto',
      '100%': '100%',
    },
    fontFamily: {},
    fontSize: modularScale(1.333),
    fontWeight: {},
    lineHeight: {
      1: 1,
      tight: 1.25,
      snug: 1.375,
      base: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    color: {},
    letterSpacing: {
      wide: '.025em',
    },
    border: {},
    borderWidth: { 1: 1, 2: 2, 4: 4, 8: 8 },
    radius: {
      sm: '.125rem',
      md: '.25rem',
      lg: '.5rem',
      full: 9999,
    },
    shadow: {
      sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    },
    opacity: {},
    zIndex: {},
  },

  shorthands: {
    // TODO: Remove if widely supported by browsers
    inset: ['top', 'right', 'bottom', 'left'],
    insetX: ['left', 'right'],
    insetY: ['top', 'bottom'],

    // TODO: Remove if widely supported by browsers
    size: ['width', 'height'],

    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],

    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },

  aliases: {
    p: 'padding',
    px: 'paddingX',
    py: 'paddingY',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    // TODO: For logical properties, e.g. lpi, lpis, lpie, lpb, lpbs, lpbe

    m: 'margin',
    mx: 'marginX',
    my: 'marginY',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    // TODO: For logical properties, e.g. lmi, lmis, lmie, lmb, lmbs, lmbe

    bg: 'background',
  },

  resolvers: {
    top: 'spacing',
    right: 'spacing',
    bottom: 'spacing',
    left: 'spacing',
    zIndex: 'zIndex',

    flexBasis: 'size',

    gridGap: 'spacing',
    gridRowGap: 'spacing',
    gridColumnGap: 'spacing',
    gap: 'spacing',
    rowGap: 'spacing',
    columnGap: 'spacing',

    width: 'size',
    minWidth: 'size',
    maxWidth: 'size',
    height: 'size',
    minHeight: 'size',
    maxHeight: 'size',

    padding: 'spacing',
    // TODO: paddingInline: 'spacing',
    // TODO: paddingInlineStart: 'spacing',
    // TODO: paddingInlineEnd: 'spacing',
    // TODO: paddingBlock: 'spacing',
    // TODO: paddingBlockStart: 'spacing',
    // TODO: paddingBlockEnd: 'spacing',
    paddingTop: 'spacing',
    paddingRight: 'spacing',
    paddingBottom: 'spacing',
    paddingLeft: 'spacing',

    margin: 'spacing',
    // TODO: marginInline: 'spacing',
    // TODO: marginInlineStart: 'spacing',
    // TODO: marginInlineEnd: 'spacing',
    // TODO: marginBlock: 'spacing',
    // TODO: marginBlockStart: 'spacing',
    // TODO: marginBlockEnd: 'spacing',
    marginTop: 'spacing',
    marginRight: 'spacing',
    marginBottom: 'spacing',
    marginLeft: 'spacing',

    fontFamily: 'fontFamily',
    fontSize: 'fontSize',
    fontWeight: 'fontWeight',
    lineHeight: 'lineHeight',
    color: 'color',
    textShadow: 'shadow',
    letterSpacing: 'letterSpacing',

    background: 'color',
    backgroundColor: 'color',

    border: 'border',
    borderTop: 'border',
    borderRight: 'border',
    borderBottom: 'border',
    borderLeft: 'border',

    borderColor: 'color',
    borderTopColor: 'color',
    borderRightColor: 'color',
    borderBottomColor: 'color',
    borderLeftColor: 'color',

    borderWidth: 'borderWidth',
    borderTopWidth: 'borderWidth',
    borderRightWidth: 'borderWidth',
    borderBottomWidth: 'borderWidth',
    borderLeftWidth: 'borderWidth',

    borderRadius: 'radius',
    borderTopLeftRadius: 'radius',
    borderTopRightRadius: 'radius',
    borderBottomRightRadius: 'radius',
    borderBottomLeftRadius: 'radius',

    outlineColor: 'color',
    boxShadow: 'shadow',
    opacity: 'opacity',
  },
} as const;
