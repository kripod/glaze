import { useStyling as useCustomStyling } from 'glaze';
import * as React from 'react';

const App = () => {
  const sx = useCustomStyling();

  const InnerComponent = () => {
    const sx = useCustomStyling();
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
