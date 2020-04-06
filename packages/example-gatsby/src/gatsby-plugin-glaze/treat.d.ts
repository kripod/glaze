import { tokens } from './theme.treat';

declare module 'treat/theme' {
  type Tokens = typeof tokens;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
