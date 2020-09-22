import React from 'react';

import './TweetsLoading.css';

function TweetsLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <div>
        <p className='message'>Hold on, data fetching may take some time :)</p>
        <div className='spinner'></div>
      </div>
    );
  };
}
export default TweetsLoading;
