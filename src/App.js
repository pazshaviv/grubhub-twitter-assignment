import React, { useEffect, useState } from 'react';
import './App.css';
import Tweets from './components/Tweets/Tweets';
import TweetsLoading from './components/Tweets/TweetsLoading';
import apiconf from './TwitterApiConf';

const App = () => {
  var tweets = [];
  const TweetsWithLoading = TweetsLoading(Tweets);
  const [appState, setAppState] = useState({
    loading: false,
    tweets: null,
  });

  useEffect(() => {
    setAppState({ loading: true });
    const tweetsQuery = `tweets/search/recent?query=%23grubhub&tweet.fields=created_at&expansions=author_id`;
    const tweetsHttpRequest = apiconf.proxyUrl + apiconf.apiUrl + tweetsQuery;
    console.log(tweetsHttpRequest);
    fetch(tweetsHttpRequest, {
      method: 'GET',
      headers: apiconf.headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonResult) => {
        tweets = [...jsonResult.data];
        const extracted_author_ids = [];
        for (let tweet of tweets) {
          extracted_author_ids.push(tweet.author_id);
        }
        const author_ids = extracted_author_ids.join(',');
        const usersQuery = '/users?ids=' + author_ids;

        fetch(apiconf.proxyUrl + apiconf.apiUrl + usersQuery, {
          method: 'GET',
          headers: apiconf.headers,
        })
          .then((res) => {
            return res.json();
          })
          .then((jsonResult) => {
            const tweetsAuthorInfo = jsonResult.data;
            for (let i = 0; i < tweets.length; i++) {
              tweets[i].author_name = tweetsAuthorInfo[i].name;
              tweets[i].username = tweetsAuthorInfo[i].username;
            }
            console.log(tweets)
            setAppState({ loading: false, tweets: tweets });
          });
      });
  }, [setAppState]);

  return (
    <div className='Grubhub Twitter Assignment'>
      <div className='container'>
        <h1>#grubhub Tweets</h1>
      </div>
      <div className='tweet-container'>
        <TweetsWithLoading isLoading={appState.loading} tweets={appState.tweets} />
      </div>
    </div>
  );
};

export default App;
