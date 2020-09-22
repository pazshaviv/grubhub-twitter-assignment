import React from 'react';

import './Tweets.css';
import Tweet from '../Tweet/Tweet';

const Tweets = (props) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const tweets = props.tweets;

  if (tweets === undefined) return <h2 className='no-tweets'>There was a problem fetching data..</h2>;
  if (!tweets || tweets.length === 0) return <h2 className='no-tweets'>No tweets, sorry</h2>;

  return (
    <div>
      <div className='tweets-container'>
        {tweets.map((tweet) => {
          const date = new Date(tweet.creationDate);
          const displayedDate = months[date.getMonth()] + ' ' + date.getDate();
          return <Tweet key={tweet.id} text={tweet.text} authorName={tweet.authorName} username={tweet.username} creationDate={displayedDate} imageUrl={tweet.imageUrl} />;
        })}
      </div>
      <div className='pagination-container'>
        <div className='pagination-buttons-container'>
          <span
            href='#'
            className='pagination-button'
            onClick={() => {
              props.previousPageFunction();
            }}>
            Previous<br></br>Page
          </span>
          <span
            href='#'
            className='pagination-button'
            onClick={() => {
              props.nextPageFunction();
            }}>
            Next<br></br>Page
          </span>
        </div>
        <p>{props.pageNumber}</p>
      </div>
    </div>
  );
};
export default Tweets;
