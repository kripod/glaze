import { useStyling } from 'glaze';
import React, { useState } from 'react';
import { useInterval } from 'web-api-hooks';

import { Text } from '../components/Text';

export default function IndexPage(): JSX.Element {
  const sx = useStyling();

  const [isTextMounted, setTextMounted] = useState(true);
  useInterval(() => {
    setTextMounted((value) => !value);
  }, 3000);

  return (
    <>
      <h1 className={sx({ px: 4, color: 'white', bg: 'red' })}>
        Hello, world!
      </h1>
      {isTextMounted && <Text>Lorem ipsum dolor sit amet</Text>}
    </>
  );
}
