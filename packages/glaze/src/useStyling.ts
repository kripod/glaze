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

const shorthandProperties = new Map([
  ['all', 1],
  ['animation', 1],
  ['background', 1],
  ['border', 1],
  // TODO:
  // ['borderBlock', 2],
  // ['borderBlockEnd', 3],
  // ['borderBlockStart', 3],
  ['borderBottom', 2],
  ['borderColor', 2],
  ['borderImage', 2],
  // TODO:
  // ['borderInline', 2],
  // ['borderInlineEnd', 3],
  // ['borderInlineStart', 3],
  ['borderLeft', 2],
  ['borderRadius', 2],
  ['borderRight', 2],
  ['borderStyle', 2],
  ['borderTop', 2],
  ['borderWidth', 2],
  ['columnRule', 1],
  ['columns', 1],
  ['flex', 1],
  ['flexFlow', 1],
  ['font', 1],
  ['gap', 1],
  ['grid', 1],
  ['gridArea', 1],
  ['gridColumn', 2],
  ['gridRow', 2],
  ['gridTemplate', 1],
  ['lineClamp', 1],
  ['listStyle', 1],
  ['margin', 1],
  ['mask', 1],
  ['maskBorder', 2],
  ['offset', 1],
  ['outline', 1],
  ['overflow', 1],
  ['padding', 1],
  ['placeContent', 1],
  ['placeItems', 1],
  ['placeSelf', 1],
  ['textDecoration', 1],
  ['textEmphasis', 1],
  ['transition', 1],
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
      | keyof ThemeOrAny['matchers'],
      string
    >]?:
      | keyof ThemeOrAny['scales'][ThemeOrAny['matchers'][ResolveAlias<key>]]

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
              }`.repeat(shorthandProperties.get(key) || 3);
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
