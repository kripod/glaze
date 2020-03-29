/* Prefer performance over elegance, as this code is critical for the runtime */

import hash from '@emotion/hash';
import { CSSProperties, useContext } from 'react';
import { useStyles } from 'react-treat';
import { Style } from 'treat';

import { GlazeContext } from './GlazeContext';
import styleRefs from './useStyling.treat';

export type ThemedStyle = Style & {
  // TODO: Add more precise styles for aliases and shorthands
  [key: string]: CSSProperties[keyof CSSProperties];
};

export function useStyling(): (themedStyle: ThemedStyle) => string {
  const staticClassNames = useStyles(styleRefs);
  const { theme, instancesByClassName } = useContext(GlazeContext);

  // TODO: Decrease instance count of unused runtime classNames when unmounting
  // TODO: Remove runtime styles which are not used anymore

  return function sx(themedStyle: ThemedStyle): string {
    let className = '';

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const alias in themedStyle) {
      const value = themedStyle[alias];
      const shorthand = theme.aliases[alias] || alias;

      // eslint-disable-next-line no-loop-func
      (theme.shorthands[shorthand] || [shorthand]).forEach((key) => {
        const style = `${key}:${value}`;

        // TODO: Support selectors and media queries
        if (typeof value !== 'object') {
          let appendedClassName = staticClassNames[style];

          // Attach a class dynamically if needed
          if (!appendedClassName) {
            // TODO: Use same hashing algorithm during static CSS generation
            appendedClassName = `__glaze_${hash(style)}`;
            let usageCount = instancesByClassName.get(appendedClassName);
            if (!usageCount) {
              usageCount = 0;
              const element = document.createElement('style');
              element.textContent = `.${appendedClassName}{${style}}`;
              document.head.appendChild(element);
            }
            instancesByClassName.set(appendedClassName, usageCount + 1);
          }

          className += `${appendedClassName} `;
        }
      });
    }

    return className;
  };
}
