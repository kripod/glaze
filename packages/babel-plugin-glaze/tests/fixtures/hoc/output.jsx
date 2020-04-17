import { useStyling } from 'glaze';
import * as React from 'react';

const withTheme = (Component) => (props) => {
  const sx = useStyling();
  return (
    <Component
      className={sx({
        color: 'blue',
      })}
      {...props}
    />
  );
};

const FancyButton = React.forwardRef((props, ref) => {
  const sx = useStyling();
  return (
    <button
      ref={ref}
      className={`FancyButton ${sx({
        color: 'blue',
      })}`}
    >
      {props.children}
    </button>
  );
});
const MemoizedBUtton = React.memo((props) => {
  const sx = useStyling();
  return (
    <button
      ref={ref}
      className={`MemoizedButton ${sx({
        color: 'blue',
      })}`}
    >
      {props.children}
    </button>
  );
});
