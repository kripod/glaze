import { StyleInjectorProvider, ThemeProvider } from 'glaze';
import { AppProps } from 'next/app';
import * as React from 'react';

import theme from '../theme.treat';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const themedComponent = (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );

  return process.browser ? (
    <StyleInjectorProvider>{themedComponent}</StyleInjectorProvider>
  ) : (
    themedComponent
  );
}
