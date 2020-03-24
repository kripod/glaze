import { GlazeProvider } from 'glaze';
import React from 'react';

import theme from './src/theme.treat';

/**
 * @param {{ element: React.ReactNode }} apiCallbackContext
 */
export function wrapRootElement({ element }) {
  return <GlazeProvider theme={theme}>{element}</GlazeProvider>;
}
