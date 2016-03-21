'use strict';

var copy = require('..');
var opts = {srcBase: 'test/fixtures'};

copy.one('test/fixtures/a.txt', 'actual', opts, function(err) {
  if (err) return console.error(err);

});
