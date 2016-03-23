'use strict';

var path = require('path');
var copy = require('..');
var opts = {
  cwd: path.resolve(__dirname, '../test'),
  flatten: true
};

copy.one('fixtures/a.txt', 'actual', opts, function(err) {
  if (err) throw err;
  console.log('done!');
});
