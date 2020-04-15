import { StyleInjectorProvider, ThemeProvider } from 'glaze';
import * as React from 'react';

import theme from './src/theme.treat';

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ element }, { disableStyleInjection }) => {
  const themedElement = <ThemeProvider theme={theme}>{element}</ThemeProvider>;

  if (disableStyleInjection) return themedElement;

  return (
    <StyleInjectorProvider>
      <ThemeProvider theme={theme}>{themedElement}</ThemeProvider>
    </StyleInjectorProvider>
  );
};
