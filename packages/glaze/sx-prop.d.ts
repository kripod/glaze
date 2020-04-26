import {} from 'react';

import { ThemedStyle } from './dist-types/useStyling.d';

declare module 'react' {
  interface Attributes {
    sx?: ThemedStyle;
  }
}
