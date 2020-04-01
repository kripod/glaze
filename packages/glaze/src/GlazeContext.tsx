import hash from '@emotion/hash';
import React, { useContext, useRef } from 'react';
import { TreatProvider } from 'react-treat';

import { canUseDOM, isDev } from './env';
import {
  DebuggableStyleSheet,
  OptimizedStyleSheet,
  StyleSheet,
  VirtualStyleSheet,
} from './StyleSheet';
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

  // eslint-disable-next-line no-nested-ternary
  const styleSheet: StyleSheet = canUseDOM
    ? isDev
      ? new DebuggableStyleSheet()
      : new OptimizedStyleSheet()
    : new VirtualStyleSheet();

  // TODO: Try augmenting server-rendered dynamic styles or rehydrate them

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
            const className = isDev
              ? `DYNAMIC_${identName}`
              : `d_${hash(identName)}`;

            const usageCount = usageCountsByClassName.get(className) || 0;
            // TODO: Improve SSR capability
            if (!usageCount) {
              ruleIndexesByClassName.set(
                className,
                styleSheet.insertRule(`.${className}{${cssText()}}`),
              );
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
              styleSheet.deleteRule(ruleIndexesByClassName.get(className)!);
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
