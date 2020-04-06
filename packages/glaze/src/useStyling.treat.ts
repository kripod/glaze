import { CSSProperties } from 'react';
import { Style, styleMap } from 'treat';

import { ScaleTokens } from './theme';

export default styleMap((theme) => {
  const result: { [key: string]: Style } = {};

  Object.entries(theme.resolvers).forEach(([property, scale]) => {
    const tokens = Object.entries(
      // TODO: Improve typings
      // Allow specifying resolvers without a corresponding scale
      ((theme.scales as unknown) as ScaleTokens<keyof CSSProperties>)[
        scale as string
      ] || {},
    );

    tokens.forEach(([key, value]) => {
      result[`${property}-${key}`] = { [property]: value };
    });
  });
  return result;
});
