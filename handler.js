'use strict';
const TwitterPackage = require('twitter');
const config = require('./configs/config');

module.exports.hello = (event, context, callback) => {
  const Twitter = new TwitterPackage(config);

  Twitter.post('statuses/update', { status: 'Hello world \\#PeaceHack \\#PeaceDay' }, function (error, tweet, response) {
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
