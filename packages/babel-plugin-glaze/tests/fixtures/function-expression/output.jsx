import { useStyling } from 'glaze';
import * as React from 'react';

const App = function () {
  const sx = useStyling();
  return (
    <p
      className={sx({
        px: 4,
        color: 'white',
        bg: 'red',
      })}
    >
      Hello, world!
    </p>
  );
};
