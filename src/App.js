import React, { useEffect, useState } from 'react';
import './App.css';
import Tweets from './components/Tweets/Tweets';
import TweetsLoading from './components/Tweets/TweetsLoading';
import fetchTweets from './api/TwitterApi';

const App = () => {
  const TweetsWithLoading = TweetsLoading(Tweets);
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState(null);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    (async function () {
      fetchAndUpdateTweets('');
    })();
  }, []);

  const fetchAndUpdateTweets = async (nextPageToken) => {
    setLoading(true);
    console.log('fetching...');
    const tweetsData = await fetchTweets(nextPageToken);
    console.log(`next token: ${nextPageToken}`);
    setTweets(tweetsData.tweets);
    setNextPageToken(tweetsData.nextPageToken);
    console.log('finsihed fetching');
    setLoading(false);
  };

  return (
    <div className='app-container'>
      <div className='headline'>
        <h1>#grubhub Tweets</h1>
        <img className='twitter-symbol' src='https://cdn.iconscout.com/icon/free/png-256/twitter-213-569318.png' />
      </div>
      <TweetsWithLoading isLoading={loading} tweets={tweets} nextPageFunction={() => fetchAndUpdateTweets(nextPageToken)} />
    </div>
  );
};

export default App;
