import { useStyling } from 'glaze';
import * as React from 'react';

const createComp = () => ({
  MyComp: (props) => {
    const sx = useStyling();
    return (
      <div
        className={sx({
          color: 'blue',
        })}
      >
        Hello
      </div>
    );
  },
  Button: () => {
    const sx = useStyling();
    return (
      <button
        className={sx({
          color: 'red',
        })}
      >
        Button
      </button>
    );
  },
});
