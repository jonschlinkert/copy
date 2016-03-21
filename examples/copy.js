'use strict';

var copy = require('..');
var dest = 'test/actual/blah/foo';
var opts = {cwd: 'test/fixtures'};

copy('*.txt', dest, opts, function(err) {
  if (err) return console.error(err);
  console.log('done!');
});
