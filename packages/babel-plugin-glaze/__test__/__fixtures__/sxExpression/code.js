import React from 'react';

const myStyle = { color: 'blue' };

const myFn = () => ({ color: 'red' });

const Comp1 = () => {
  return <div sx={myStyle}></div>;
};

const Comp2 = () => {
  return <div sx={myFn()}></div>;
};
