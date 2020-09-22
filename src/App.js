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
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageTokens, setPageTokens] = useState([]);

  useEffect(() => {
    (async function () {
      fetchAndUpdateTweets('');
    })();
  }, []);

  const nextPage = (nextPageToken) => {
    if (currentPageIndex === pageTokens.length) {
      setPageTokens([...pageTokens, nextPageToken]);
      setCurrentPageIndex(currentPageIndex + 1);
      fetchAndUpdateTweets(nextPageToken);
    } else {
      fetchAndUpdateTweets(pageTokens[currentPageIndex]);
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const previousPage = () => {
    if (currentPageIndex !== 0) {
      fetchAndUpdateTweets(pageTokens[currentPageIndex - 1]);
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      console.log('no previous tweets')
    }
  };

  const fetchAndUpdateTweets = async (pageToken) => {
    console.log('fetching...');
    setLoading(true);

    const tweetsData = await fetchTweets(pageToken);
    setTweets(tweetsData.tweets);
    setNextPageToken(tweetsData.nextPageToken);

    setLoading(false);
    console.log('finsihed fetching');
  };

  return (
    <div className='app-container'>
      <div className='headline'>
        <h1>#grubhub Tweets</h1>
        <img className='twitter-symbol' src='https://cdn.iconscout.com/icon/free/png-256/twitter-213-569318.png' />
      </div>
      <TweetsWithLoading
        isLoading={loading}
        tweets={tweets}
        pageNumber={currentPageIndex + 1}
        nextPageToken={nextPageToken}
        nextPageFunction={() => nextPage(nextPageToken)}
        previousPageFunction={() => previousPage()}
      />
    </div>
  );
};

export default App;
