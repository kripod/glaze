import { useStyling } from 'glaze';
import * as React from 'react';

const Component = (props) => {
  const sx = useStyling();

  const InnerComponent = () => {
    const sx = useStyling();
    return (
      <div
        className={sx({
          color: 'blue',
        })}
      >
        Inner
      </div>
    );
  };

  return (
    <div
      className={sx({
        color: 'red',
      })}
    >
      {Component}
    </div>
  );
};
