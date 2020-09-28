<h1>#GrubHub Tweets</h1>

<h2>How to Run:</h2>

1. <code>git clone https://github.com/pazshaviv/grubhub-twitter-assignment</code><br>

2. <code>docker build -t grubhub-tweets .</code>

3. <code>docker run --env REACT_APP_TWITTER_API_KEY="{Twitter Api Key}" -d -it -p 3000:3000/tcp grubhub-tweets:latest</code>

4. go to <code>localhost:3000</code> in browser


* Please note you have to get a Twitter Api Key to run the app

<h2>Explanations</h2>

The app has a components folder that includes the Tweets component, which is rendering a list containing the Tweet component, with the fetched data from the Twitter Api.

The fetching is at <code>api/TwitterApi.js</code>. It actually consists of two request calls to the api - one for the tweets information, to the tweets endpoint (tweets ids, text and publish date). The second to the users endpoint, to get the username, author name and profile image url.

TweetsLoading function in <code>TweetsLoading.js</code> gets the Tweets list component and renderes it when it gets the data. Otherwise it displays the loading spinner.
