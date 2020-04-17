import * as React from 'react';

const withTheme = (Component) => (props) => (
  <Component sx={{ color: 'blue' }} {...props} />
);

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton" sx={{ color: 'blue' }}>
    {props.children}
  </button>
));

const MemoizedBUtton = React.memo((props) => (
  <button ref={ref} className="MemoizedButton" sx={{ color: 'blue' }}>
    {props.children}
  </button>
));
