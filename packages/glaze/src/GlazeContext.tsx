import React, { useContext } from 'react';

import { RuntimeTheme } from './theme';

export const GlazeContext = React.createContext<RuntimeTheme | undefined>(
  undefined,
);

export interface GlazeProviderProps {
  runtimeTheme: RuntimeTheme;
  children: React.ReactNode;
}

export function GlazeProvider({
  runtimeTheme,
  children,
}: GlazeProviderProps): JSX.Element {
  return (
    <GlazeContext.Provider value={runtimeTheme}>
      {children}
    </GlazeContext.Provider>
  );
}

export function useRuntimeTheme(): RuntimeTheme {
  const theme = useContext(GlazeContext);
  if (!theme) throw new Error('No glaze runtime theme provided');
  return theme;
}
