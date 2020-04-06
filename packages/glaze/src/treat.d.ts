import { defaultTokens } from './theme';

declare module 'treat/theme' {
  type Tokens = typeof defaultTokens;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends Tokens {}
}
