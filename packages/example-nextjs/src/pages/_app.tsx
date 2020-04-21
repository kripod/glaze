import { StyleInjectorProvider } from 'glaze';
import { AppProps } from 'next/app';
import * as React from 'react';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const renderedComponent = <Component {...pageProps} />;
  return process.browser ? (
    <StyleInjectorProvider>{renderedComponent}</StyleInjectorProvider>
  ) : (
    renderedComponent
  );
}
