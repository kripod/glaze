import { useStyling } from 'glaze';
import React from 'react';

export default function StyledComponent(): JSX.Element {
  const sx = useStyling();

  return <div {...sx({ p: 4, bg: 'papayawhip' })}>Hello, world!</div>;
}
