import hash from '@emotion/hash';
import React, { useContext, useEffect, useRef } from 'react';
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
  const ruleIndexesByClassName = useRef(new Map<string, number>()).current;
  const usageCountsByClassName = useRef(new Map<string, number>()).current;

  const styleEl = useRef(document.createElement('style')).current;
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet as CSSStyleSheet;

  // TODO: Try augmenting server-rendered dynamic styles or rehydrate them

  // Attach a DOM element for managing dynamic styles
  useEffect(() => {
    // TODO: Consider setting a data attribute for improved debugging experience
    return (): void => {
      document.head.removeChild(styleEl);
    };
  }, [styleEl]);

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
            // TODO: Improve SSR capability
            if (!usageCount) {
              const index = styleSheet.insertRule(
                `.${className}{${cssText()}}`,
                ruleIndexesByClassName.size,
              );
              ruleIndexesByClassName.set(className, index);
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
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              const index = ruleIndexesByClassName.get(className)!;
              styleSheet.removeRule(index);
              ruleIndexesByClassName.delete(className);
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
