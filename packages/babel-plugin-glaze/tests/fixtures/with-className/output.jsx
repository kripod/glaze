import { useStyling } from 'glaze';
import * as React from 'react';

const SimpleClassName = (props) => {
  const sx = useStyling();
  return (
    <div
      className={`my-class-name ${sx({
        color: 'blue',
      })}`}
    >
      Hello, world!
    </div>
  );
};

const ComplexClassName = ({ className }) => {
  const sx = useStyling();

  const fn = () => true;

  return (
    <div
      className={`${`${className} other-class-name ${
        fn('test') ? 'conditional' : ''
      }`} ${sx({
        color: 'blue',
      })}`}
    >
      Hello, world!
    </div>
  );
};
