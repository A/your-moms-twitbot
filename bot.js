'use strict';

/**
 * Dependencies
 */
var c = require('chalk');
var replies = require('./replies');


/**
 * Log message for debug
 */
exports.logMessage = function(t) {
  var name = t.user.screen_name;
  var message = t.text;
  console.log(c.blue('@' + name) + ': ' + message);
}

exports.reply = function(t) {
  var name = t.user.screen_name;
  var message = t.text.toLowerCase();
  var phrases = replies.keys.reduce(function(memo, key) {
    if (!~message.indexOf(key)) return memo;
    return memo.concat(replies[key]);
  }, []);
  return  '@' + name + ' ' + (phrases[Math.floor(Math.random() * phrases.length)] || 'ну ладн чо!');
}
