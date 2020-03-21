import { useStyling } from 'glaze';
import React from 'react';

export default function StyledComponent(): JSX.Element {
  const sx = useStyling();

  return (
    <div {...sx({ padding: 4, background: 'papayawhip' })}>Hello, world!</div>
  );
}
