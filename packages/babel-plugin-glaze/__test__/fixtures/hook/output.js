import { useStyling } from 'glaze';
import React from 'react';

const WithHook = () => {
  const useMyHook = () => {
    const sx = useStyling();
    const [state, useState] = React.useState('hello');
    return (
      <div
        className={sx({
          color: 'blue',
        })}
      >
        {state}
      </div>
    );
  };

  const toRender = useMyHook();
  return <div>{toRender}</div>;
};
