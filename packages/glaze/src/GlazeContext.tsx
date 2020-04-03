import React, { useContext } from 'react';
import { TreatProvider } from 'react-treat';

import { RuntimeTheme } from './theme';

export const GlazeContext = React.createContext<RuntimeTheme>(
  undefined as never,
);

export interface ThemeProviderProps {
  theme: RuntimeTheme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  // TODO: Try augmenting server-rendered dynamic styles or rehydrate them

  return (
    <TreatProvider
      // Show a clear error message during runtime, even if `theme` is nullish
      theme={theme?.ref}
    >
      <GlazeContext.Provider value={theme}>{children}</GlazeContext.Provider>
    </TreatProvider>
  );
}

export function useTheme(): RuntimeTheme {
  return useContext(GlazeContext);
}
