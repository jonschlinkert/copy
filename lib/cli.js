#!/usr/bin/env node

var copy = require('../index');

var patterns = process.argv[2],
    dir = process.argv[3];

if (! patterns || ! dir) {
  console.log('Usage: copy <patterns> <dir>');
} else {
  copy(patterns, dir, function(err, file) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
}
