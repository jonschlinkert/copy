'use strict';

var path = require('path');
var copy = require('..');
var log = require('log-ok');
var cwd = path.resolve.bind(path, __dirname, '..');
var dest = cwd('test/actual/blah/foo');
var opts = {cwd: cwd('test/fixtures')};

copy('*.txt', dest, opts, function(err, files) {
  if (err) return console.error(err);
  files.forEach(function(file) {
    log(file.relative);
  })
});
