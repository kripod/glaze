import * as React from 'react';

// TODO: Add support for spread attributes
// Even if not being explicit, a `className` may still be present in `props`
function Component(props) {
  return <p sx={{ color: 'green' }} {...props} />;
}
