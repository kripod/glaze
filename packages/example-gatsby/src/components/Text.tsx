import { useStyling } from 'glaze';
import * as React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Text({ className = '', ...restProps }: TextProps): JSX.Element {
  const sx = useStyling();

  return (
    <p
      className={`${className} ${sx({
        color: 'white',
        backgroundColor: 'black',
      })}`}
      {...restProps}
    />
  );
}
