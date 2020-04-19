/* Prefer performance over elegance, as this code is critical for the runtime */

import { CSSProperties } from 'react';
import { useStyles } from 'react-treat';
import { ThemeOrAny } from 'treat/theme';
import { ValueOf } from 'type-fest';

import { Tokens } from './theme';
import { useTheme } from './ThemeContext';
import styleRefs from './useStaticStyling.treat';

type ResolveShorthand<T extends Tokens<'shorthands'>> = ValueOf<
  ThemeOrAny['shorthands'][T],
  number
>;

type ResolveAlias<
  T extends Tokens<'aliases'>
> = ThemeOrAny['aliases'][T] extends Tokens<'shorthands'>
  ? ResolveShorthand<ThemeOrAny['aliases'][T]>
  : ThemeOrAny['aliases'][T];

type ScaleKeys<Property> = Extract<
  keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
    Property,
    Tokens<'matchers'>
  >]],
  ValueOf<CSSProperties>
>;

export type ThemedStyle = { [key in Tokens<'matchers'>]?: ScaleKeys<key> } &
  { [key in Tokens<'shorthands'>]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Tokens<'aliases'>]?: ScaleKeys<ResolveAlias<key>> };

export function useStaticStyling(): (themedStyle: ThemedStyle) => string {
  const styles = useStyles(styleRefs);
  const theme = useTheme();

  return function sx(themedStyle: ThemedStyle): string {
    let className = '';

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const alias in themedStyle) {
      // TODO: Remove type assertion if possible
      const value = themedStyle[alias as keyof ThemedStyle];
      const shorthand = theme.aliases[alias] || alias;

      // eslint-disable-next-line no-loop-func
      (theme.shorthands[shorthand] || [shorthand]).forEach((key) => {
        // TODO: Support selectors and media queries
        if (typeof value !== 'object') {
          const identName = `${key}-${value}`;
          const appendedClassName = styles[identName];

          className += ` ${appendedClassName}`;
        }
      });
    }

    // Remove prepended whitespace
    return className.slice(1);
  };
}
