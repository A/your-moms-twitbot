'use strict';

/**
 * Dependencies
 */
var Twitter = require('twitter');
var tokens = require('twitter-tokens');
var tpl = require('mnml-tpl')('@:name: :text\n');

/**
 * Instanse of the twitter client
 */
var client = new Twitter(tokens)

/**
 * Keywords to search
 */
var keywords = [
  'говно',
  'пидор',
  'пиздец',
  'хуй',
  'веган',
  'джира'
];

client.stream('statuses/filter', { track: keywords.join(',') }, function(stream){
  stream
    .on('data', function(t) {
      console.log(tpl({
        text: t.text,
        name: t.user.screen_name
      }));
    })
    .on('end', function() {
      console.log('Bye.');
    })
    .on('error', function(error) {
      console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    })
  ;
});
