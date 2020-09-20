import React from 'react';

import './Tweet.css';

const Tweet = (props) => {
  return (
    <div className='Tweet'>
      <div className='TweetHeader'>
        <span>{props.author_name}</span>
        <span>@{props.username}</span>
        <span>{props.created_at}</span>
      </div>
      <p className='TweetText'>{props.text}</p>
    </div>
  );
};

export default Tweet;
