import { DefaultTheme } from './theme.treat';

declare module 'treat/theme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends DefaultTheme {}
}
