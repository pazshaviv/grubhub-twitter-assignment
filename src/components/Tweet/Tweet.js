import React from 'react';

import './Tweet.css';

const Tweet = (props) => {
  return (
    <div className='tweet'>
      <div className='image-container'>
        <img className='image' src={props.imageUrl} />
      </div>
      <div className='info'>
        <div className='tweet-header'>
          <div className='names-container'>
            <span className='author-name'>{props.authorName}</span>
            <span className='username'>@{props.username}</span>
          </div>
          <span className='creation-date'>{props.creationDate}</span>
        </div>
        <div className='tweet-text'>
          <span>{props.text}</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
