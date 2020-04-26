import * as React from 'react';

function Component({ className = 'example', ...restProps }) {
  return <p sx={{ color: 'green' }} className={className} {...restProps} />;
}
