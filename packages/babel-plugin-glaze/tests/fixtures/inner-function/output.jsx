import { useStyling } from 'glaze';
import * as React from 'react';

const Component = (props) => {
  const sx = useStyling();

  const renderComponent = () => {
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
        hello: 'world',
      })}
    >
      {renderComponent()}
    </div>
  );
};
