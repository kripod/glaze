import * as React from 'react';

const SimpleClassName = (props) => {
  return (
    <div className="my-class-name" sx={{ color: 'blue' }}>
      {Component}
    </div>
  );
};

const ComplexClassName = (props) => {
  const fn = () => true;
  return (
    <div
      className={`${props.className} other-class-name ${
        fn('test') ? 'conditional' : ''
      }`}
      sx={{ color: 'blue' }}
    >
      {Component}
    </div>
  );
};
