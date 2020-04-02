import { StyleInjectorProvider, VirtualStyleInjector } from 'glaze';
import React from 'react';

import { wrapRootElement as wrapClientRootElement } from './gatsby-browser';

/** @type {Map<string, VirtualStyleInjector>} */
const injectorsByPathname = new Map();

/**
 * @param {{
 *   element: React.ReactNode;
 *   pathname: string;
 * }} apiCallbackContext
 */
export const wrapRootElement = ({ element, pathname }) => {
  const injector = new VirtualStyleInjector();
  injectorsByPathname.set(pathname, injector);

  return (
    <StyleInjectorProvider injector={injector}>
      {wrapClientRootElement({ element })}
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
