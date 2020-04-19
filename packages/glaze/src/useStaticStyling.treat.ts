import { ClassRef, Style, styleMap } from 'treat';

export default styleMap((theme) => {
  const styles: { [className in ClassRef]: Style } = {};

  Object.entries(theme.matchers).forEach(([property, scale]) => {
    const tokens = Object.entries(theme.scales[scale]);
    tokens.forEach(([key, value]) => {
      styles[`${property}-${key}`] = { [property]: value };
    });
  });

  return styles;
});
