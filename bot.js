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

exports.logReply = function(t) {
  var name = t.user.screen_name;
  console.log(c.red('@your_mommy: '), '@' + name + ' ' + exports.reply(t));
}

exports.reply = function(t) {
  var message = t.text;
  var phrases = replies.keys.reduce(function(memo, key) {
    if (!~message.indexOf(key)) return memo;
    return memo.concat(replies[key]);
  }, []);
  return phrases[Math.floor(Math.random() * phrases.length)] || 'ну ладн чо!';
}
