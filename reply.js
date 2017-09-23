'use strict';
const TwitterClient = require('twitter');

module.exports.reply = (event, context, callback) => {
  const Twitter = new TwitterClient({
    "consumer_key": process.env.CONSUMER_KEY,
    "consumer_secret": process.env.CONSUMER_SECRET,
    "access_token_key": process.env.TOKEN_KEY,
    "access_token_secret": process.env.TOKEN_SECRET
  });

  const stream = Twitter.stream('user');
  stream.on('follow', followed);

  function followed(event) {
    console.log('Follow Event is running');
    const name = event.source.name;
    const follower = event.source.screen_name;

    tweetNow('Hey @' + follower + '. Thanks for the follow \n\#PeaceDay \#PeaceHack');
  }

  function tweetNow(tweetTxt) {
    const tweet = {
      status: tweetTxt
    }

    Twitter.post('statuses/update', tweet, function (err, data, response) {
      if (err) {
        console.log("Error in Replying");
      }

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          tweet: tweet,
          response: response
        }),
      });
    });
  }
}