import * as React from 'react';

const createComp = () => ({
  MyComp: (props) => {
    return <div sx={{ color: 'blue' }}>Hello</div>;
  },
  Button: () => (
    <button type="button" sx={{ color: 'red' }}>
      Button
    </button>
  ),
});
