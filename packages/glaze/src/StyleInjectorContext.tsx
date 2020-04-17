import * as React from 'react';

import { isDev } from './env';
import {
  DebuggableStyleInjector,
  NullStyleInjector,
  OptimizedStyleInjector,
  StyleInjector,
} from './StyleInjector';

export const StyleInjectorContext = React.createContext<StyleInjector>(
  new NullStyleInjector(),
);

export interface StyleInjectorProviderProps {
  children: React.ReactNode;
  injector?: StyleInjector;
}

export function StyleInjectorProvider({
  children,
  injector = isDev
    ? new DebuggableStyleInjector()
    : new OptimizedStyleInjector(),
}: StyleInjectorProviderProps): JSX.Element {
  return (
    <StyleInjectorContext.Provider value={injector}>
      {children}
    </StyleInjectorContext.Provider>
  );
}
