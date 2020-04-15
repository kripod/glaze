import { ThemeProvider } from 'glaze';
import { AppProps } from 'next/app';
import * as React from 'react';

import theme from '../theme.treat';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
