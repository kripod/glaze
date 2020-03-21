import { CSSProperties } from 'react';
import { useStyles } from 'react-treat';
import { Style } from 'treat';

import { useRuntimeTheme } from './GlazeContext';
import styleRefs from './useStyling.treat';

type ThemedStyle = Style & {
  // TODO: Add more precise styles for aliases and shorthands
  [key: string]: CSSProperties[keyof CSSProperties];
};

export default function useStyling(): (
  themedStyle: ThemedStyle,
) => {
  className: string;
  style: CSSProperties;
} {
  const staticClassNames = useStyles(styleRefs);
  const theme = useRuntimeTheme();

  return function sx(
    themedStyle: ThemedStyle,
  ): {
    className: string;
    style: CSSProperties;
  } {
    let className = '';
    const style: { [key: string]: unknown } = {};

    // Prefer performance over clarity for the runtime
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const alias in themedStyle) {
      const value = themedStyle[alias];
      const key = theme.aliases[alias] || alias;

      if (typeof value !== 'object') {
        const staticClassName = staticClassNames[`${key}.${value}`];
        if (staticClassName) {
          className += `${staticClassName} `;
        } else {
          style[key] = value;
        }
      }
    }

    return { className, style };
  };
}
