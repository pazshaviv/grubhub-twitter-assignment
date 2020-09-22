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
    console.log('in app.js: ' + nextPageToken);
    console.log('currentPageIndex: ' + currentPageIndex);
    console.log('pageTokens.length: ' + pageTokens.length);
    if (currentPageIndex == pageTokens.length) {
      setPageTokens([...pageTokens, nextPageToken]);
      setCurrentPageIndex(currentPageIndex + 1);
      console.log('inside currentPageIndex == pageTokens.length - 1');
      fetchAndUpdateTweets(nextPageToken);
    } else {
      console.log('inside currentPageIndex is not pageTokens.length - 1');
      fetchAndUpdateTweets(pageTokens[currentPageIndex]);
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const previousPage = () => {
    if (currentPageIndex != 0) {
      fetchAndUpdateTweets(pageTokens[currentPageIndex - 1]);
      setCurrentPageIndex(currentPageIndex - 1);
    } else {
      console.log('No previous tweets');
    }
  };

  const fetchAndUpdateTweets = async (pageToken) => {
    setLoading(true);
    console.log('fetching...');
    const tweetsData = await fetchTweets(pageToken);
    console.log(`next token: ${tweetsData.nextPageToken}`);
    console.log(tweetsData.tweets);
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
