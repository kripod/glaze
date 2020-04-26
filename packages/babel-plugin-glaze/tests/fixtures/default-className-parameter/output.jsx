import { useStyling } from 'glaze';
import * as React from 'react';

function Component({ className = 'example', ...restProps }) {
  const sx = useStyling();
  return (
    <p
      className={`${className} ${sx({
        color: 'green',
      })}`}
      {...restProps}
    />
  );
}
