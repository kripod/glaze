import { StyleInjectorProvider, ThemeProvider } from 'glaze';
import React from 'react';

import theme from './src/theme.treat';

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ element }, { disableStyleInjector }) => {
  const themedElement = <ThemeProvider theme={theme}>{element}</ThemeProvider>;

  if (disableStyleInjector) return themedElement;

  return (
    // TODO: Add plugin option to disable dynamic style injection
    <StyleInjectorProvider>
      <ThemeProvider theme={theme}>{themedElement}</ThemeProvider>
    </StyleInjectorProvider>
  );
};
