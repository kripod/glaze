import * as React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Text(props: TextProps): JSX.Element {
  return <p sx={{ color: 'white', backgroundColor: 'black' }} {...props} />;
}
