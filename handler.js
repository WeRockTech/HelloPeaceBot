'use strict';
const TwitterClient = require('twitter');
const Tweets = require('./data/tweets.json')

const Twitter = new TwitterClient({
  "consumer_key": process.env.CONSUMER_KEY,
  "consumer_secret": process.env.CONSUMER_SECRET,
  "access_token_key": process.env.TOKEN_KEY,
  "access_token_secret": process.env.TOKEN_SECRET
});

module.exports.hello = (event, context, callback) => {
  Tweets.map((item) => {
    if (item.tweetOn === '') {
      Twitter.post('statuses/update', { status: item.message }, function (error, tweet, response) {
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
    } else {
      console.log('Nothing to do');
    }
  });
};
