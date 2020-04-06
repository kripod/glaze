import React, { useContext } from 'react';
import { TreatProvider } from 'react-treat';

import { RuntimeTheme } from './theme';

const ThemeContext = React.createContext<RuntimeTheme>(undefined as never);

export interface ThemeProviderProps {
  theme: RuntimeTheme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  return (
    <TreatProvider
      // Show a clear error message during runtime, even if `theme` is nullish
      theme={theme?.ref}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </TreatProvider>
  );
}

export function useTheme(): RuntimeTheme {
  return useContext(ThemeContext);
}
