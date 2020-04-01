/* Prefer performance over elegance, as this code is critical for the runtime */

import { CSSProperties, useContext, useEffect, useRef } from 'react';
import { useStyles } from 'react-treat';
import { Style } from 'treat';

import { GlazeContext } from './GlazeContext';
import styleRefs from './useStyling.treat';

function kebabCaseReplacer(match: string): string {
  return `-${match.toLowerCase()}`;
}

export type ThemedStyle = Style & {
  // TODO: Add more precise styles for aliases and shorthands
  [key: string]: CSSProperties[keyof CSSProperties];
};

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const staticClassNames = useStyles(styleRefs);
  const { theme, mountStyle, unmountStyle } = useContext(GlazeContext);
  const ownUsageCountByClassName = useRef(new Map<string, number>()).current;

  // Remove dynamic styles which are not used anymore when unmounting
  useEffect(
    () => (): void => {
      ownUsageCountByClassName.forEach(unmountStyle);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return function sx(themedStyle: ThemedStyle): string {
    let className = '';

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const alias in themedStyle) {
      const value = themedStyle[alias];
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
            appendedClassName = mountStyle(
              identName,
              () =>
                // Convert CSS property to kebab-case and normalize numeric value
                `${key.replace(/[A-Z]/g, kebabCaseReplacer)}:${
                  typeof value !== 'number' ? value : `${value}px`
                }`,
            );

            ownUsageCountByClassName.set(
              appendedClassName,
              (ownUsageCountByClassName.get(appendedClassName) || 0) + 1,
            );
          }

          className += ` ${appendedClassName}`;
        }
      });
    }

    // Remove prepended whitespace
    return className.slice(1);
  };
}
