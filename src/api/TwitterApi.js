import apiconf from './TwitterApiConf';

const fetchTweets = async (pageToken) => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.twitter.com/2/';
  const headers = { Authorization: apiconf.twitter_api_key };

  let pageTokenQueryParam = pageToken === '' ? '' : `&next_token=${pageToken}`;

  const tweetsQuery = `tweets/search/recent?max_results=20&query=%23grubhub&tweet.fields=created_at&expansions=author_id${pageTokenQueryParam}`;
  const tweetsHttpRequest = proxyUrl + apiUrl + tweetsQuery;
  let tweetsResponse = await fetch(tweetsHttpRequest, {
    method: 'GET',
    headers: headers,
  });

  let jsonTweetsResult = await tweetsResponse.json();
  const tweetsCount = jsonTweetsResult.meta.result_count;
  if (tweetsCount === 0) {
    return { tweets: [], nextPageToken: '' };
  }

  console.log('jsonTweetsResult: ');
  console.log(jsonTweetsResult);

  const metadata = jsonTweetsResult.meta;
  console.log('metadata: ');
  console.log(metadata);

  const nextPageToken = metadata.next_token;
  console.log('nextpagetoken: ');
  console.log(nextPageToken);

  let fetchedTweetsData = [...jsonTweetsResult.data];
  const extractedAuthorIds = [];
  for (let tweet of fetchedTweetsData) {
    extractedAuthorIds.push(tweet.author_id);
  }

  const authorIds = extractedAuthorIds.join(',');

  const usersQuery = '/users?ids=' + authorIds + '&user.fields=profile_image_url';
  let usersResponse = await fetch(proxyUrl + apiUrl + usersQuery, {
    method: 'GET',
    headers: headers,
  });
  let jsonUsersResult = await usersResponse.json();
  const tweetsAuthorInfo = jsonUsersResult.data;
  const tweetsResult = [];
  for (let i = 0; i < fetchedTweetsData.length; i++) {
    tweetsResult.push({
      id: fetchedTweetsData[i].id,
      text: fetchedTweetsData[i].text,
      creationDate: fetchedTweetsData[i].created_at,
      authorName: tweetsAuthorInfo[i].name,
      username: tweetsAuthorInfo[i].username,
      imageUrl: tweetsAuthorInfo[i].profile_image_url,
    });
  }

  console.log('before quitting twitterapi:');
  console.log(nextPageToken);
  return { tweets: tweetsResult, nextPageToken: nextPageToken };
};

export default fetchTweets;
