import * as React from 'react';

const Component = (props) => {
  const InnerComponent = () => {
    return <div sx={{ color: 'blue' }}>Inner</div>;
  };

  return <div sx={{ color: 'red' }}>{Component}</div>;
};
