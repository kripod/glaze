import { useStyling } from 'glaze';
import * as React from 'react'; // TODO: Fix the variable name returned by `useStyling`

function Component() {
  const sx = useStyling();

  /* eslint-disable no-redeclare */
  const sx = 'test';
  return (
    <p
      className={sx({
        color: 'green',
      })}
    />
  );
}
