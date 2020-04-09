import React from 'react';
import { useStyling } from 'glaze';

const App = () => {
  const sx = useStyling();
  const InnerComponent = () => <div sx={{ color: 'blue' }}>hello</div>;

  return (
    <p
      sx={{
        px: 4,
        color: 'white',
        bg: 'red',
      }}
    >
      Hello, world!
    </p>
  );
};
