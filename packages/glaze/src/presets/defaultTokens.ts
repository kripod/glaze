import { modularScale, symmetricScale } from '../scales';

const spacing = symmetricScale({
  0: 0,
  '1px': '1px',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
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
});

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
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: 0,
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
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
      sm: '0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)',
      md: '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)',
      lg: '0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)',
      xl: '0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,.06)',
      outline: '0 0 0 3px rgba(66,153,225,.5)',
    },
    opacity: {},
    zIndex: {},
    duration: {
      '75ms': '75ms',
      '100ms': '.1s',
      '150ms': '.15s',
      '200ms': '.2s',
      '300ms': '.3s',
      '500ms': '.5s',
      '700ms': '.7s',
      '1000ms': '1s',
    },
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

  matchers: {
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
    // paddingLeft: 'spacing',

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

    transitionDelay: 'duration',
    transitionDuration: 'duration',

    animationDelay: 'duration',
    animationDuration: 'duration',
  },
} as const;
