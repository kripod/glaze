import * as React from 'react';

const App = () => {
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

const NoBlockStatement = () => (
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
