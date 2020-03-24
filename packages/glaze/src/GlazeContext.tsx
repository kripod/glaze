import React, { useContext } from 'react';
import { TreatProvider } from 'react-treat';

import { RuntimeTheme } from './theme';

export const GlazeContext = React.createContext<RuntimeTheme | undefined>(
  undefined,
);

export interface ThemeProviderProps {
  theme: RuntimeTheme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  return (
    <TreatProvider theme={theme.ref}>
      <GlazeContext.Provider value={theme}>{children}</GlazeContext.Provider>
    </TreatProvider>
  );
}

export function useTheme(): RuntimeTheme {
  const theme = useContext(GlazeContext);
  if (!theme) throw new Error('No glaze theme provided');
  return theme;
}
