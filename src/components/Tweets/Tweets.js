import React from 'react';

import Tweet from '../Tweet/Tweet';

const Tweets = (props) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const { tweets } = props;
  if (!tweets || tweets.length === 0) return <p>No tweets, sorry</p>;
  return (
    <ul>
      <h2 className='list-head'>#grubhub Tagged Tweets</h2>
      {tweets.map((tweet) => {
        const date = new Date(tweet.created_at);
        const displayedDate = months[date.getMonth()] + ' ' + date.getDate();
        return <Tweet key={tweet.id} text={tweet.text} author_name={tweet.author_name} username={tweet.username} created_at={displayedDate} />;
      })}
    </ul>
  );
};
export default Tweets;
