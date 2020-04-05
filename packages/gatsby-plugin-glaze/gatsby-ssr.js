import {
  StyleInjectorProvider,
  ThemeProvider,
  VirtualStyleInjector,
} from 'glaze';
import React from 'react';

import theme from './src/theme.treat';

/** @type {Map<string, VirtualStyleInjector>} */
const injectorsByPathname = new Map();

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = ({ element, pathname }) => {
  const injector = new VirtualStyleInjector();
  injectorsByPathname.set(pathname, injector);

  return (
    <StyleInjectorProvider injector={injector}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </StyleInjectorProvider>
  );
};

/**
 * @param {{
 *   setHeadComponents: (components: React.ReactNode) => void;
 *   pathname: string;
 * }} apiCallbackContext
 */
export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const injector = injectorsByPathname.get(pathname);
  if (injector) {
    setHeadComponents(injector.getStyleElement());
    injectorsByPathname.delete(pathname);
  }
};
