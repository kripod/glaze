import { useStyling } from 'glaze';
import React, { useState } from 'react';
import { useInterval } from 'web-api-hooks';

import { Text } from '../components/Text';

export default function IndexPage(): JSX.Element {
  const sx = useStyling();

  const [isFirstTextMounted, setFirstTextMounted] = useState(true);
  const [isSecondTextMounted, setSecondTextMounted] = useState(true);
  useInterval(() => setFirstTextMounted((value) => !value), 3000);
  useInterval(() => setSecondTextMounted((value) => !value), 5000);

  return (
    <>
      <h1 className={sx({ px: 4, color: 'white', bg: 'red' })}>
        Hello, world!
      </h1>
      {isFirstTextMounted && <Text>1: Lorem ipsum dolor sit amet</Text>}
      {isSecondTextMounted && <Text>2: Lorem ipsum dolor sit amet</Text>}
    </>
  );
}
