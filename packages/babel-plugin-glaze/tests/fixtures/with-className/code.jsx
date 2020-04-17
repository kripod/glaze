import * as React from 'react';

const SimpleClassName = (props) => {
  return (
    <div className="my-class-name" sx={{ color: 'blue' }}>
      Hello, world!
    </div>
  );
};

const ComplexClassName = ({ className }) => {
  const fn = () => true;
  return (
    <div
      className={`${className} other-class-name ${
        fn('test') ? 'conditional' : ''
      }`}
      sx={{ color: 'blue' }}
    >
      Hello, world!
    </div>
  );
};
