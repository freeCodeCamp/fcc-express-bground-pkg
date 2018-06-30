/******************************************************
 * console.log wrapper
 * to test 1) Hello World, 7) Logger middleware
 * ***************************************************/

var globals = require('./globals')

// Store a reference to the original console.log()
var log = console.log

// Wrap console.log() to run a check everytime before it's used
console.log = function() {
  // Convert arguments into actual array.
  var args = Array.prototype.slice.call(arguments);

  // Check if this message solves any of the challenges that make use of console.log()
  testLogMessage(args)

  // Execute the original console.log() provided args
  log.apply(null, args);
}

// Verify if a log message solves the expected log for certain challenges
function testLogMessage (args) {
  var msg = '';
  try {
    // build the log string
    msg = args
      .map(function(arg) {return arg.toString()})
      .join(' ');  
  } catch (e) {
    log('log error - invalid arguments passed to console.log', e);
  } 

  // Check if it solves the hello-console challenge.
  if (msg.toLowerCase().match(/^hello,?\sworld!?$/)) {
    globals.userPassedConsoleChallenge = true
  }

  // Check if it solves the simple-middleware-logger challenge.
  if (msg.match(/(GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE)\s\/.*\s\-\s.*(\d{1,3}\.){3}\d{1,3}/)) {
    globals.userPassedLoggerChallenge = true
  }
}

module.exports = log;
