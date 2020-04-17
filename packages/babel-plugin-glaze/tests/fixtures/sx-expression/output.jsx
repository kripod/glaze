import { useStyling } from 'glaze';
import * as React from 'react';
const myStyle = {
  color: 'blue',
};

const myFn = () => ({
  color: 'red',
});

const Comp1 = () => {
  const sx = useStyling();
  return <div className={sx(myStyle)} />;
};

const Comp2 = () => {
  const sx = useStyling();
  return <div className={sx(myFn())} />;
};
