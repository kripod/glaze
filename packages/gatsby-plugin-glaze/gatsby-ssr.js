import { StyleInjectorProvider, VirtualStyleInjector } from 'glaze';
import React from 'react';

import { wrapRootElement as wrapClientRootElement } from './gatsby-browser';

/** @type {Map<string, VirtualStyleInjector>} */
const injectorsByPathname = new Map();

/** @type {import('gatsby').GatsbyBrowser["wrapRootElement"]} */
export const wrapRootElement = (apiCallbackContext, pluginOptions) => {
  const injector = new VirtualStyleInjector();
  injectorsByPathname.set(apiCallbackContext.pathname, injector);

  return (
    <StyleInjectorProvider injector={injector}>
      {wrapClientRootElement(apiCallbackContext, pluginOptions)}
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
