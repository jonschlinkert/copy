'use strict';

var copy = require('..');

copy.dir('fixtures', 'actual', function (err) {
  if (err) {
    console.error(err);
  }
});
