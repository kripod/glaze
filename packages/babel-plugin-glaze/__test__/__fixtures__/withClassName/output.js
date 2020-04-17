import { useStyling } from 'glaze';
import React from 'react';

const SimpleClassName = (props) => {
  const sx = useStyling();
  return (
    <div
      className={`my-class-name ${sx({
        color: 'blue',
      })}`}
    >
      {Component}
    </div>
  );
};

const ComplexClassName = (props) => {
  const sx = useStyling();

  const fn = () => true;

  return (
    <div
      className={`${`${props.className} other-class-name ${
        fn('test') ? 'conditional' : ''
      }`} ${sx({
        color: 'blue',
      })}`}
    >
      {Component}
    </div>
  );
};
