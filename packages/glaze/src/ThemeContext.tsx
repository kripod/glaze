import * as React from 'react';
import { useContext } from 'react';

import { RuntimeTheme } from './theme';

const ThemeContext = React.createContext<RuntimeTheme | undefined>(undefined);

export interface ThemeProviderProps {
  theme: RuntimeTheme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): RuntimeTheme | undefined {
  return useContext(ThemeContext);
}
