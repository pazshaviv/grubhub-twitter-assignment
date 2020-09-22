import apiconf from './TwitterApiConf';

const fetchTweets = async (pageToken) => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.twitter.com/2/';
  const headers = { Authorization: apiconf.twitter_api_key };

  const pageTokenQueryParam = pageToken === '' ? '' : `&next_token=${pageToken}`;
  const tweetsQuery = `tweets/search/recent?max_results=20&query=%23grubhub&tweet.fields=created_at&expansions=author_id${pageTokenQueryParam}`;
  const tweetsHttpRequest = proxyUrl + apiUrl + tweetsQuery;
  const tweetsResponse = await fetch(tweetsHttpRequest, {
    method: 'GET',
    headers: headers,
  });

  const jsonTweetsResult = await tweetsResponse.json();
  const tweetsCount = jsonTweetsResult.meta.result_count;
  if (tweetsCount === 0) {
    return { tweets: [], nextPageToken: '' };
  }

  const metadata = jsonTweetsResult.meta;
  const nextPageToken = metadata.next_token;
  const fetchedTweetsData = [...jsonTweetsResult.data];
  const extractedAuthorIds = [];
  for (let tweet of fetchedTweetsData) {
    extractedAuthorIds.push(tweet.author_id);
  }
  const authorIds = extractedAuthorIds.join(',');
  const usersQuery = '/users?ids=' + authorIds + '&user.fields=profile_image_url';
  const usersResponse = await fetch(proxyUrl + apiUrl + usersQuery, {
    method: 'GET',
    headers: headers,
  });
  
  const jsonUsersResult = await usersResponse.json();
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

  return { tweets: tweetsResult, nextPageToken: nextPageToken };
};

export default fetchTweets;
