import React from 'react';
import { useStyling } from 'glaze';

const App = () => {
  const sx = useStyling();

  const InnerComponent = () => {
    const sx = useStyling();
    return (
      <div
        className={sx({
          color: 'blue',
        })}
      >
        hello
      </div>
    );
  };

  return (
    <p
      className={sx({
        px: 4,
        color: 'white',
        bg: 'red',
      })}
    >
      Hello, world!
    </p>
  );
};
