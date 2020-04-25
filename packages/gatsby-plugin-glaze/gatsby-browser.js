import { StyleInjectorProvider, ThemeProvider } from 'glaze';
import * as React from 'react';

import theme from './src/theme.treat';

const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ element }, { disableStyleInjection }) => {
  const themedElement = <ThemeProvider theme={theme}>{element}</ThemeProvider>;

  if (disableStyleInjection && !isDev) return themedElement;

  return (
    // eslint-disable-next-line @typescript-eslint/camelcase, no-undef
    <StyleInjectorProvider nonce={__webpack_nonce__}>
      <ThemeProvider theme={theme}>{themedElement}</ThemeProvider>
    </StyleInjectorProvider>
  );
};

export const onInitialClientRender = () => {
  // eslint-disable-next-line no-underscore-dangle
  if (isDev) window.__glaze_disableStyleInjection = true;
};
