import * as React from 'react';

const Component = (props) => {
  const renderComponent = () => {
    return <div sx={{ color: 'blue' }}>Inner</div>;
  };

  return <div sx={{ hello: 'world' }}>{renderComponent()}</div>;
};
