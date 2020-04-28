import { CSSProperties } from 'react';
import { createTheme as createStaticTheme, ThemeRef } from 'treat';
import { ThemeOrAny } from 'treat/theme';

import { warnOnce } from './logger';
import { emptyTokens } from './presets/emptyTokens';

export type Tokens<T extends keyof ThemeOrAny> = Extract<
  keyof ThemeOrAny[T],
  string | number
>;

export type ScaleTokens<T extends keyof CSSProperties> =
  | { [key: string]: NonNullable<CSSProperties[T]> }
  | readonly NonNullable<CSSProperties[T]>[];

export interface CommonTheme {
  breakpoints: readonly number[];
  shorthands: { [key: string]: ReadonlyArray<keyof CSSProperties> };
  aliases: {
    [key: string]: keyof CSSProperties | Extract<Tokens<'shorthands'>, string>;
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
    fontWeight: ScaleTokens<'fontWeight'>;
    fontSize: ScaleTokens<'fontSize'>;
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
  const { breakpoints, shorthands, aliases } = extendedTokens as StaticTheme;

  if (breakpoints.some((breakpoint, i) => breakpoint > breakpoints[i + 1])) {
    warnOnce(
      'The `breakpoints` of a theme should be in ascending order to avoid issues with CSS specificity.',
    );
  }

  return {
    ref: createStaticTheme(extendedTokens, localDebugName),
    breakpoints,
    shorthands,
    aliases,
  };
}
