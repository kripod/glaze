import { useStyling } from 'glaze';
import React from 'react';

export default function IndexPage(): JSX.Element {
  const sx = useStyling();

  return (
    <>
      <h1 className={sx({ px: 4, color: 'white', bg: 'red' })}>
        Hello, world!
      </h1>
      <p className={sx({ color: 'white', bg: 'black' })}>
        Lorem ipsum dolor sit amet
      </p>
    </>
  );
}
