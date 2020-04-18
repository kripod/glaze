import * as React from 'react';

const withTheme = (Component) => (props) => (
  <Component sx={{ color: 'blue' }} {...props} />
);

const FancyButton = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    type="button"
    className="FancyButton"
    sx={{ color: 'blue' }}
  >
    {props.children}
  </button>
));

const MemoizedBUtton = React.memo((props) => (
  <button type="button" className="MemoizedButton" sx={{ color: 'blue' }}>
    {props.children}
  </button>
));
