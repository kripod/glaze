/* Prefer performance over elegance, as this code is critical for the runtime */

import { CSSProperties } from 'react';
import { resolveStyles } from 'treat';
import { ThemeOrAny } from 'treat/theme';
import { LiteralUnion, ValueOf } from 'type-fest';

import { Tokens } from './theme';
import { useTheme } from './ThemeContext';
import { useDynamicStyling } from './useDynamicStyling';
import styleRefs from './useStyling.treat';

type ResolveShorthand<T extends Tokens<'shorthands'>> = ValueOf<
  ThemeOrAny['shorthands'][T],
  number
>;

type ResolveAlias<
  T extends Tokens<'aliases'>
> = ThemeOrAny['aliases'][T] extends Tokens<'shorthands'>
  ? ResolveShorthand<ThemeOrAny['aliases'][T]>
  : ThemeOrAny['aliases'][T];

type ScaleKeys<Property> = LiteralUnion<
  Extract<
    keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][Extract<
      Property,
      Tokens<'matchers'>
    >]],
    ValueOf<CSSProperties>
  >,
  ValueOf<CSSProperties>
>;

export type ThemedStyle = CSSProperties &
  { [key in Tokens<'matchers'>]?: ScaleKeys<key> } &
  { [key in Tokens<'shorthands'>]?: ScaleKeys<ResolveShorthand<key>> } &
  { [key in Tokens<'aliases'>]?: ScaleKeys<ResolveAlias<key>> };

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const getDynamicClassName = useDynamicStyling();
  const theme = useTheme();
  const staticClassNames = theme ? resolveStyles(theme.ref, styleRefs) : {};

  return function sx(themedStyle: ThemedStyle): string {
    let className = '';

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const alias in themedStyle) {
      // TODO: Remove type assertion if possible
      const value = themedStyle[alias as keyof ThemedStyle];

      if (value != null) {
        const shorthand = (theme && theme.aliases[alias]) || alias;

        ((theme && theme.shorthands[shorthand]) || [shorthand]).forEach(
          // eslint-disable-next-line no-loop-func
          (property: string) => {
            // TODO: Support selectors and media queries
            if (typeof value !== 'object') {
              const identName = `${property}-${value}`;
              className += ` ${
                staticClassNames[identName] ||
                getDynamicClassName(identName, property, value)
              }`;
            }
          },
        );
      }
    }

    // Remove prepended whitespace
    return className.slice(1);
  };
}
