'use strict';

/**
 * Dependencies
 */
var Twitter = require('twitter');
var tokens = require('twitter-tokens');
var replies = require('./replies');
var bot = require('./bot');

/**
 * Instanse of the twitter client
 */
var client = new Twitter(tokens)
client.stream('statuses/filter', { track: replies.keys.join(',') }, function(stream){
  stream
    .on('data', function(t) {
      if(~t.text.indexOf('RT')) return;
      if(t.user.screen_name === 'your_mommy') return;
      bot.logMessage(t);
      client.post('statuses/update', {
        status: bot.reply(t),
        in_reply_to_status_id: t.id_str
      }, function(err, tweet) {
        console.log(tweet.text);
      });
    })
    .on('end', function(r) {
      console.log('Bye.');
    })
  ;
});
