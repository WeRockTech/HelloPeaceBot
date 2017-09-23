'use strict';
const TwitterClient = require('twitter');

module.exports.hello = (event, context, callback) => {
  const Twitter = new TwitterClient({
    "consumer_key": process.env.CONSUMER_KEY,
    "consumer_secret": process.env.CONSUMER_SECRET,
    "access_token_key": process.env.TOKEN_KEY,
    "access_token_secret": process.env.TOKEN_SECRET
  });

  Twitter.post('statuses/update', { status: 'Hello world \#PeaceHack \#PeaceDay' }, function (error, tweet, response) {
    if (error) {
      console.log(error);
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        tweet: tweet,
        response: response
      }),
    });
  });
};
