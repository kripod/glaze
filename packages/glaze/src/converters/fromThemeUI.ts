import type { Theme as ThemeUITheme } from '@theme-ui/css';

import { errorOnce, warnOnce } from '../logger';
import { fromEntries } from '../ponyfills/Object';
import { emptyTokens } from '../presets/emptyTokens';
import { StaticTheme } from '../theme';

function parseBreakpoint(breakpoint: string | number): number {
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
  return Number.NaN;
}

export function fromThemeUI(tokens: ThemeUITheme): StaticTheme {
  const {
    breakpoints = [],
    space,
    sizes,
    fonts,
    fontWeights,
    fontSizes,
    lineHeights,
    colors,
    letterSpacings,
    borders,
    borderWidths,
    radii,
    shadows,
    zIndices,
    ...unknownTokens
  } = tokens;

  if (colors && colors.modes) {
    // TODO: Add support for converting color schemes
    warnOnce(
      'Color schemes are not yet supported. Please see https://github.com/kripod/glaze/issues/7 for further details.',
    );
  }

  const unknownTokenKeys = Object.keys(unknownTokens)
    .map((key) => `"${key}"`)
    .join(', ');
  if (unknownTokenKeys) {
    warnOnce(
      `The following Theme UI tokens couldn't be converted and thus, will not have an effect: ${unknownTokenKeys}.`,
    );
  }

  return {
    ...emptyTokens,
    breakpoints: Object.values(breakpoints)
      .map(parseBreakpoint)
      .filter(Boolean),
    scales: {
      spacing: tokens.space,
      size: tokens.sizes,
      fontFamily: tokens.fonts,
      fontWeight: tokens.fontWeights,
      fontSize: tokens.fontSizes,
      lineHeight: tokens.lineHeights,
      color: fromEntries(
        Object.entries(colors || {}).filter(
          ([, value]) => typeof value === 'string',
        ) as [string, string][],
      ),
      letterSpacing: tokens.letterSpacings,
      border: tokens.borders,
      borderWidth: tokens.borderWidths,
      radius: tokens.radii,
      shadow: tokens.shadows,
      zIndex: tokens.zIndices,
    } as StaticTheme['scales'],
  };
}
