import React from 'react';
import { useStyles } from 'react-treat';

import styleRefs from './useStyling.treat';

export interface BoxProps {
  children?: React.ReactNode;
}

export function Box({ children }: BoxProps): JSX.Element {
  const styles = useStyles(styleRefs);

  return (
    <button type="button" className={`${styles['padding.3']}`}>
      {children}
    </button>
  );
}
