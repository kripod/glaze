import type { Theme as ThemeUI } from '@theme-ui/css';
import { CSSProperties } from 'react';
import { createTheme as createStaticTheme, ThemeRef } from 'treat';
import { ThemeOrAny } from 'treat/theme';

import { errorOnce, warnOnce } from './logger';
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
   * Theme UI allows any string value. Treat only wants pixel values in numbers.
   * We strip `px` as a direct conversion.
   * We strip `rem` or `em` and multiply by an assumed `16px`
   */
  function convertBreakpoint(breakpoint: string | number): number {
    if (typeof breakpoint === 'string') {
      const [, value, unit] = /(\d+)(.+)/i.exec(breakpoint) ?? [];
      if (unit === 'px') {
        return Number(value);
      }
      if (['rem', 'em'].includes(unit)) {
        warnOnce(
          `"${breakpoint}" was converted to ${value}. This could have unintended side-effects.`,
        );
        return Number(value) * 16;
      }
      errorOnce(
        `${unit} is not a valid breakpoint unit. \`breakpoints\` should be an array of numbers.`,
      );
      return undefined;
    }

    return breakpoint;
  }

  let breakpoints: Array<number | undefined> = [];
  if (
    !Array.isArray(theme.breakpoints) &&
    typeof theme.breakpoints === 'object'
  ) {
    breakpoints = Object.values(theme.breakpoints)
      .map(convertBreakpoint)
      .sort((a, b) => a - b);
  }
  if (Array.isArray(theme.breakpoints)) {
    breakpoints = theme.breakpoints
      .map(convertBreakpoint)
      .sort((a, b) => a - b);
  }

  /** Color
   * We just ignore color modes for now and show a warning
   */
  const color = {};
  // glaze only supports strings for color tokens
  if (theme.colors) {
    if (theme.colors?.modes) {
      warnOnce(
        'Color Modes are not currently supported in glaze. See https://github.com/kripod/glaze/issues/7',
      );
    }

    Object.keys(theme.colors).forEach((colorKey) => {
      if (typeof theme.colors[colorKey] === 'string') {
        color[colorKey] = theme.colors[colorKey];
      }
    });
  }

  /**
   * Glaze doesn't support array token lookups so we convert to an object using its index as a key
   */
  function ensureObjectLiteral(token: [] | {}): {} {
    if (Array.isArray(token)) {
      return token.reduce((obj, curr, i) => {
        // eslint-disable-next-line no-param-reassign
        obj[i] = curr;
        return obj;
      }, {});
    }

    return token;
  }

  const scales = {
    color: ensureObjectLiteral(color),
    spacing: ensureObjectLiteral(theme.space),
    border: ensureObjectLiteral(theme.borders),
    borderWidth: ensureObjectLiteral(theme.borderWidths),
    size: ensureObjectLiteral(theme.sizes),
    fontFamily: ensureObjectLiteral(theme.fonts),
    fontSize: ensureObjectLiteral(theme.fontSizes),
    fontWeight: ensureObjectLiteral(theme.fontWeights),
    letterSpacing: ensureObjectLiteral(theme.letterSpacings),
    lineHeight: ensureObjectLiteral(theme.lineHeights),
  } as StaticTheme['scales'];

  // Remove any undefined tokens
  Object.keys(scales).forEach((key) => {
    if (typeof scales[key] === 'undefined') {
      delete scales[key];
    }
  });

  return {
    ...emptyTokens,
    breakpoints,
    scales,
  };
}
