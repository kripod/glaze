import type { Theme as ThemeUITheme } from '@theme-ui/css';
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

export function fromThemeUI(tokens: ThemeUITheme): StaticTheme {
  /** Breakpoints
   * Theme UI allows any string value. Treat only wants pixel values in numbers.
   * We strip `px` as a direct conversion.
   * We strip `rem` or `em` and multiply by an assumed `16px`
   */
  function convertBreakpoint(breakpoint: string | number): number | undefined {
    if (typeof breakpoint === 'number') return breakpoint;

    const [, numberCandidate, unit] =
      /(.*\d)([a-z%]*)/.exec(
        // Support units case-insensitively, adhering to the CSS spec
        breakpoint.toLowerCase(),
      ) || [];
    const number = Number(numberCandidate);

    if (!Number.isNaN(number)) {
      if (!unit || unit === 'px') return number;

      if (unit === 'em' || unit === 'rem') {
        const value = number * 16;
        warnOnce(
          `Breakpoint "${breakpoint}" has been converted to ${value}px. This may cause unintended side-effects.`,
        );
        return value;
      }
    }

    errorOnce(
      `Invalid breakpoint: "${breakpoint}". Specify a number with an optional unit of 'px', 'em' or 'rem' instead.`,
    );
    return undefined;
  }

  let breakpoints: Array<number | undefined> = [];
  if (
    !Array.isArray(tokens.breakpoints) &&
    typeof tokens.breakpoints === 'object'
  ) {
    breakpoints = Object.values<string>(tokens.breakpoints)
      .map(convertBreakpoint)
      .sort((a?: number, b?: number) => (a && b ? a - b : 0));
  }
  if (Array.isArray(tokens.breakpoints)) {
    breakpoints = tokens.breakpoints
      .map(convertBreakpoint)
      .sort((a, b) => (a && b ? a - b : 0));
  }

  /** Color
   * We just ignore color modes for now and show a warning
   */
  const color: Record<string, string | {} | []> = {};
  // glaze only supports strings for color tokens
  if (tokens.colors) {
    if (tokens.colors?.modes) {
      warnOnce(
        'Color Modes are not currently supported in glaze. See https://github.com/kripod/glaze/issues/7',
      );
    }

    Object.keys(tokens.colors).forEach((colorKey) => {
      if (typeof tokens.colors?.[colorKey] === 'string') {
        color[colorKey] = tokens.colors[colorKey];
      }
    });
  }

  /**
   * Glaze doesn't support array token lookups so we convert to an object using its index as a key
   */
  function ensureObjectLiteral(
    key: keyof StaticTheme['scales'],
    token: [] | {} | undefined,
  ): {} | undefined {
    if (Array.isArray(token)) {
      return token.reduce<Record<number, string | number>>((obj, curr, i) => {
        // eslint-disable-next-line no-param-reassign
        obj[i] = curr;
        return obj;
      }, {});
    }

    return token ? { [key]: token } : undefined;
  }

  const scales: Record<string, {}> = {
    ...ensureObjectLiteral('color', color),
    ...ensureObjectLiteral('spacing', tokens.space),
    ...ensureObjectLiteral('border', tokens.borders),
    ...ensureObjectLiteral('borderWidth', tokens.borderWidths),
    ...ensureObjectLiteral('size', tokens.sizes),
    ...ensureObjectLiteral('fontFamily', tokens.fonts),
    ...ensureObjectLiteral('fontSize', tokens.fontSizes),
    ...ensureObjectLiteral('fontWeight', tokens.fontWeights),
    ...ensureObjectLiteral('letterSpacing', tokens.letterSpacings),
    ...ensureObjectLiteral('lineHeight', tokens.lineHeights),
  };

  // Remove any undefined tokens
  Object.keys(scales).forEach((key) => {
    if (typeof scales[key] === 'undefined') {
      delete scales[key];
    }
  });

  return {
    ...emptyTokens,
    breakpoints: breakpoints as StaticTheme['breakpoints'],
    scales: scales as StaticTheme['scales'],
  };
}
