import React from 'react';

import './Tweets.css';
import Tweet from '../Tweet/Tweet';

const Tweets = (props) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const tweets = props.tweets;
  if (!tweets || tweets.length === 0) return <p>No tweets, sorry</p>;
  return (
    <div>
      <div className='tweets-container'>
        {tweets.map((tweet) => {
          const date = new Date(tweet.creationDate);
          const displayedDate = months[date.getMonth()] + ' ' + date.getDate();
          return <Tweet key={tweet.id} text={tweet.text} authorName={tweet.authorName} username={tweet.username} creationDate={displayedDate} imageUrl={tweet.imageUrl} />;
        })}
      </div>
      <div className='pagination-button-container'>
        <span href='#' className='pagination-button'>
          Previous<br></br>Page
        </span>
        <span href='#' className='pagination-button' onClick={props.nextPageFunction}>
          Next<br></br>Page
        </span>
      </div>
    </div>
  );
};
export default Tweets;
