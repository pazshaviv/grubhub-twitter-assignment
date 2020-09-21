import React from 'react';

function TweetsLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (!isLoading && props.tweets != null) return <Component {...props} />;
    return <p style={{ textAlign: 'center', fontSize: '30px' }}>Hold on, fetching data may take some time :)</p>;
  };
}
export default TweetsLoading;
