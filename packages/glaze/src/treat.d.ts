import { defaultTheme } from './theme';

declare module 'treat/theme' {
  type DefaultTheme = typeof defaultTheme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends DefaultTheme {}
}
