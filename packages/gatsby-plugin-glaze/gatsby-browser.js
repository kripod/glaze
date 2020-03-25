import { ThemeProvider } from 'glaze';
import React from 'react';

import theme from './src/theme.treat';

/**
 * @param {{ element: React.ReactNode }} apiCallbackContext
 */
export function wrapRootElement({ element }) {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
}
