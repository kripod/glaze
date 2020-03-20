import { Style, styleMap } from 'treat';

export default styleMap((theme) => {
  const result: { [key: string]: Style } = {};
  Object.entries(theme.resolvers).forEach(([property, scale]) => {
    if (scale) {
      const tokens = Object.entries(theme.scales[scale] || {});
      tokens.forEach(([key, value]) => {
        result[`${property}.${key}`] = { [property]: value };
      });
    }
  });
  return result;
});
