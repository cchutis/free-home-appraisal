import React from 'react';

export default function connect(WrappedComponent) {
  return function ConnectedComponent(props) {
    return <WrappedComponent {...props} />;
  };
}
