import { CSSProperties } from 'react';
import { useStyles } from 'react-treat';
import { Style } from 'treat';

import styleRefs from './useStyling.treat';

export default function useStyling(): (
  themedStyle: Style,
) => {
  className: string;
  style: CSSProperties;
} {
  const staticClassNames = useStyles(styleRefs);

  return function sx(
    themedStyle: Style,
  ): {
    className: string;
    style: CSSProperties;
  } {
    let className = '';
    const style: { [key: string]: unknown } = {};

    // Prefer performance over clarity for the runtime
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in themedStyle) {
      const value = themedStyle[key as keyof typeof themedStyle];

      if (typeof value !== 'object') {
        // TODO: Resolve aliases
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
