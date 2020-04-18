/* Prefer performance over elegance, as this code is critical for the runtime */

import hash from '@emotion/hash';
import { CSSProperties, useContext, useEffect, useRef } from 'react';
import { useStyles } from 'react-treat';
import { Style } from 'treat';
import { ThemeOrAny } from 'treat/theme';
import { ValueOf } from 'type-fest';

import { isDev } from './env';
import { escape } from './ponyfills/CSS';
import { StyleInjectorContext } from './StyleInjectorContext';
import { useTheme } from './ThemeContext';
import styleRefs from './useStyling.treat';

const shorthandProperties = new Set([
  'all',
  'animation',
  'background',
  'border',
  'borderBlock',
  'borderBlockEnd',
  'borderBlockStart',
  'borderBottom',
  'borderColor',
  'borderImage',
  'borderInline',
  'borderInlineEnd',
  'borderInlineStart',
  'borderLeft',
  'borderRadius',
  'borderRight',
  'borderStyle',
  'borderTop',
  'borderWidth',
  'columnRule',
  'columns',
  'flex',
  'flexFlow',
  'font',
  'gap',
  'grid',
  'gridArea',
  'gridColumn',
  'gridRow',
  'gridTemplate',
  'lineClamp',
  'listStyle',
  'margin',
  'mask',
  'maskBorder',
  'motion',
  'offset',
  'outline',
  'overflow',
  'padding',
  'placeItems',
  'placeSelf',
  'textDecoration',
  'textEmphasis',
  'transition',
]);

function kebabCaseReplacer(match: string): string {
  return `-${match.toLowerCase()}`;
}

function getClassName(identName: string): string {
  return isDev ? `DYNAMIC_${identName}` : `g${hash(identName)}`;
}

type ResolveShorthand<T> = T extends keyof ThemeOrAny['shorthands']
  ? ValueOf<ThemeOrAny['shorthands'][T], number>
  : T;

type ResolveAlias<T> = ResolveShorthand<
  T extends keyof ThemeOrAny['aliases'] ? ThemeOrAny['aliases'][T] : T
>;

export type ThemedStyle = Style &
  {
    // Autocomplete for themed values, aliases and shorthands
    [key in Extract<
      | keyof ThemeOrAny['aliases']
      | keyof ThemeOrAny['shorthands']
      | keyof ThemeOrAny['resolvers'],
      string
    >]?:
      | keyof ThemeOrAny['scales'][ThemeOrAny['resolvers'][ResolveAlias<key>]]

      // Allow non-themed CSS values
      // TODO: Replace literal union hack, see https://github.com/microsoft/TypeScript/issues/29729
      | (CSSProperties[ResolveAlias<key>] & {});
  };

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const staticClassNames = useStyles(styleRefs);
  const theme = useTheme();
  const { ruleManager } = useContext(StyleInjectorContext);
  const ownRuleUsageCountsByClassName = useRef<{ [key: string]: number }>({})
    .current;

  // Remove dynamic styles which are not used anymore when unmounting
  useEffect(
    () => (): void => {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const className in ownRuleUsageCountsByClassName) {
        const usageCount = ownRuleUsageCountsByClassName[className];
        ruleManager.decreaseUsage(className, usageCount);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
          let appendedClassName = staticClassNames[identName];

          // Attach a class dynamically if needed
          if (!appendedClassName) {
            // TODO: Use same hashing algorithm during static CSS generation
            appendedClassName = getClassName(identName);
            ruleManager.increaseUsage(appendedClassName, () => {
              // Increase specificity of rules for non-shorthand CSS properties
              const selector = `.${
                isDev ? escape(appendedClassName) : appendedClassName
              }`.repeat(shorthandProperties.has(key) ? 1 : 2);
              return `${selector}{${
                // TODO: Abstract this logic away to a utility function
                // Convert CSS property to kebab-case and normalize numeric value
                `${key.replace(/[A-Z]/g, kebabCaseReplacer)}:${
                  typeof value !== 'number' ? value : `${value}px`
                }`
              }}`;
            });

            ownRuleUsageCountsByClassName[appendedClassName] =
              (ownRuleUsageCountsByClassName[appendedClassName] || 0) + 1;
          }

          className += ` ${appendedClassName}`;
        }
      });
    }

    // Remove prepended whitespace
    return className.slice(1);
  };
}
