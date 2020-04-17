import { useStyling } from 'glaze';
import React from 'react';
export default () => {
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
