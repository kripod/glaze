import * as React from 'react';

const WithHook = () => {
  const useMyHook = () => {
    const [state, useState] = React.useState('hello');

    return <div sx={{ color: 'blue' }}>{state}</div>;
  };

  const toRender = useMyHook();

  return <div>{toRender}</div>;
};
