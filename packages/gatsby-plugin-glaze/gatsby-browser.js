import { ThemeProvider } from 'glaze';
import React from 'react';

import theme from './src/theme.treat';

/** @type {NonNullable<import('gatsby').GatsbyBrowser["wrapRootElement"]>} */
export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
