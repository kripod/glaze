import * as React from 'react';

// TODO: Fix the variable name returned by `useStyling`
function Component() {
  /* eslint-disable no-redeclare */
  const sx = 'test';
  return <p sx={{ color: 'green' }} />;
}
