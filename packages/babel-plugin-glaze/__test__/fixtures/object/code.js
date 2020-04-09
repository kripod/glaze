import React from 'react';

const createComp = () => ({
  MyComp: (props) => {
    return <div sx={{ color: 'blue' }}>Hello</div>;
  },
  Button: () => <button sx={{ color: 'red' }}>Button</button>,
});
