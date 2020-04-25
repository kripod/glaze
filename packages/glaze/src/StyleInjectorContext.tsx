import * as React from 'react';

import { isBrowser, isDev } from './env';
import { errorOnce } from './logger';
import {
  DebuggableStyleInjector,
  NullStyleInjector,
  OptimizedStyleInjector,
  StyleInjector,
  VirtualStyleInjector,
} from './StyleInjector';

export const StyleInjectorContext = React.createContext<StyleInjector>(
  new NullStyleInjector(),
);

export interface StyleInjectorProviderProps {
  children: React.ReactNode;
  injector?: StyleInjector;
  nonce?: string;
}

export function StyleInjectorProvider({
  children,
  nonce,
  injector = isDev
    ? new DebuggableStyleInjector(nonce)
    : new OptimizedStyleInjector(nonce),
}: StyleInjectorProviderProps): JSX.Element {
  if (!isBrowser) {
    if (injector instanceof VirtualStyleInjector) {
      injector.setNonce(nonce);
    } else {
      errorOnce(
        'A `VirtualStyleInjector` instance must be passed to `<StyleInjectorProvider>` during server-side rendering.',
      );
    }
  }

  return (
    <StyleInjectorContext.Provider value={injector}>
      {children}
    </StyleInjectorContext.Provider>
  );
}
