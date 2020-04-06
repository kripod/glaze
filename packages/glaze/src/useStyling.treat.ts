import { Style, styleMap } from 'treat';

export default styleMap((theme) => {
  const result: { [key: string]: Style } = {};

  Object.entries(theme.resolvers).forEach(([property, scale]) => {
    const tokens = Object.entries(
      theme.scales[scale as keyof typeof theme.scales],
    );
    tokens.forEach(([key, value]) => {
      result[`${property}-${key}`] = { [property]: value };
    });
  });
  return result;
});
