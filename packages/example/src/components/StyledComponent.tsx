import { useStyling } from 'glaze';
import React from 'react';

export default function StyledComponent(): JSX.Element {
  const sx = useStyling();

  return (
    <div {...sx({ px: 4, py: 2, bg: 'papayawhip', color: 'rebeccapurple' })}>
      Hello, world!
    </div>
  );
}
