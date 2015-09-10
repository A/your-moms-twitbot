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
      bot.logMessage(t);
      bot.logReply(t);
    })
    .on('end', function(r) {
      console.log('Bye.');
    })
    .on('error', function(error) {
      console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    })
  ;
});
