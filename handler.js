'use strict';
var Twitter = require('./configs.js');

module.exports.hello = (event, context, callback) => {
  Twitter.post('statuses/update', { status: 'Hello world \\#PeaceHack \\#PeaceDay' }, function (error, tweet, response) {
    if (error) {
      console.log(error);
    }
    console.log(tweet);  
    console.log(response); 
  });
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
