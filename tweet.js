'use strict';
const http = require('http');
const TwitterClient = require('twitter');
const Tweets = require('./data/tweets.json')

const Twitter = new TwitterClient({
  "consumer_key": process.env.CONSUMER_KEY,
  "consumer_secret": process.env.CONSUMER_SECRET,
  "access_token_key": process.env.TOKEN_KEY,
  "access_token_secret": process.env.TOKEN_SECRET
});

let tweet = (tweet, callback) => {
  Twitter.post('statuses/update', { status: tweet.message, media_ids: tweet.media_ids }, function (error, tweet, response) {
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

module.exports.tweet = (event, context, callback) => {
  Tweets.map((item) => {
    let now = new Date();
    let date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}`;
    if (date == item.tweetOn) {

      if (item.media) {
        http.get(item.media, function(res){
          var imageData = '';

          res.setEncoding('binary');

          res.on('data', function(chunk){
            imageData += chunk;
          });

          res.on('end', function(){

            Twitter.post('media/upload', {media: imageData}, function(error, media, response) {
              if (!error) {
                tweet({
                  message: item.media,
                  media_ids: media.media_id_string
                }, callback);
              } else {
                console.log(error);
              }
            });
          });
        });
      } else {
        tweet(item, callback);
      }
    } else {
      console.log('Nothing to do');
    }
  });
};
