#!/usr/bin/env node

var copy = require('..');
var log = require('log-ok');
var argv = require('yargs-parser')(process.argv.slice(2), {
  alias: {src: 's', dest: 'd', cwd: 'c'},
  default: {cwd: process.cwd()},
});

var src = argv.src || argv._[0];
var dest = argv.dest || (argv.src ? argv._[0] : argv._[1]);

if (!src || !dest) {
  console.log('Usage: copy <src_patterns> <dest_directory>');
} else {
  copy(src, dest, argv, function(err, files) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    files.forEach(function(file) {
      log(file.relative);
    });
    process.exit(0);
  });
}
