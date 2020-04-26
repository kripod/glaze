import { useStyling } from 'glaze';
import * as React from 'react'; // TODO: Add support for spread attributes
// Even if not being explicit, a `className` may still be present in `props`

function Component(props) {
  const sx = useStyling();
  return (
    <p
      className={sx({
        color: 'green',
      })}
      {...props}
    />
  );
}
