import { useStyling } from 'glaze';
import React from 'react';

export default function IndexPage(): JSX.Element {
  const sx = useStyling();

  return <div {...sx({ px: 4, color: 'white', bg: 'red' })}>Hello, world!</div>;
}
