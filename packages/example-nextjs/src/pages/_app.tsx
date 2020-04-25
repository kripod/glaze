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
    // eslint-disable-next-line @typescript-eslint/camelcase, no-undef
    <StyleInjectorProvider nonce={__webpack_nonce__}>
      {themedComponent}
    </StyleInjectorProvider>
  ) : (
    themedComponent
  );
}
