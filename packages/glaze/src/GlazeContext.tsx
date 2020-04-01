import hash from '@emotion/hash';
import React, { useContext } from 'react';
import { TreatProvider } from 'react-treat';

import { RuntimeTheme } from './theme';

export const GlazeContext = React.createContext<{
  theme: RuntimeTheme;
  mountStyle: (identName: string, cssText: () => string) => string;
  unmountStyle: (usageCount: number, className: string) => void;
}>(undefined as never);

export interface ThemeProviderProps {
  theme: RuntimeTheme;
  children: React.ReactNode;
}

export function ThemeProvider({
  theme,
  children,
}: ThemeProviderProps): JSX.Element {
  const usageCountsByClassName = new Map<string, number>();

  return (
    <TreatProvider
      // Show a clear error message during runtime, even if `theme` is nullish
      theme={theme?.ref}
    >
      <GlazeContext.Provider
        value={{
          theme,

          mountStyle(identName, cssText): string {
            // TODO: Use same hashing algorithm during static CSS generation
            const className =
              process.env.NODE_ENV !== 'production'
                ? `DYNAMIC_${identName}`
                : `d_${hash(identName)}`;

            const usageCount = usageCountsByClassName.get(className) || 0;
            if (!usageCount) {
              const element = document.createElement('style');
              element.id = className;
              element.textContent = `.${className}{${cssText()}}`;
              document.head.appendChild(element);
            }
            usageCountsByClassName.set(className, usageCount + 1);

            return className;
          },

          unmountStyle(usageCount, className): void {
            const remainingInstances =
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              usageCountsByClassName.get(className)! - usageCount;

            if (remainingInstances) {
              usageCountsByClassName.set(className, remainingInstances);
            } else {
              usageCountsByClassName.delete(className);

              // Detach unused dynamic style from the DOM
              // TODO: Use `ChildNode.remove()` when dropping IE 11 support
              const element = document.getElementById(className);
              if (element) document.head.removeChild(element);
            }
          },
        }}
      >
        {children}
      </GlazeContext.Provider>
    </TreatProvider>
  );
}

export function useTheme(): RuntimeTheme {
  return useContext(GlazeContext).theme;
}
