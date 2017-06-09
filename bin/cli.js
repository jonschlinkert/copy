#!/usr/bin/env node

var copy = require('..');
var log = require('log-ok');
var argv = process.argv.slice(2);
var options = getOptions(argv);
options = optionsToObject(options);
argv = removeOptions(argv);
var dir = argv.pop();
var patterns = argv;

if (!patterns || !dir) {
  console.log('Usage: copy <patterns> <dir>');
} else {
  copy(patterns, dir, options, function(err, files) {
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

function getOptions(argv) {
  var options = [];
  
  for (var i = 0; i < argv.length; i++) {
    if (isOption(argv[i])) {

      options.push(argv[i]);
    } 
  }

  return options;
}

function removeOptions(argv) {
  var newArgv = [];
  
  for (var i = 0; i < argv.length; i++) {
    if (!isOption(argv[i])) {
      newArgv.push(argv[i]);
    }
  }

  return newArgv;
}

function isOption(item) {
  var pattern = new RegExp('--[.]*');
  return pattern.test(item);
}

function optionsToObject(options) {
  var optionsObj = {};
  
  for (var i = 0; i < options.length; i++) {
    if (isOption(options[i])) {
      var j, key, value;
      j = options[i].indexOf('=');

      if (j > -1) {
        key = options[i].substring(2, j);
        value = options[i].slice(j + 1);
        value = value === 'true' ? true : value;
      } else {
        key = options[i].slice(2);
        value = true;
      }
     
      optionsObj[key] = value;
    }
  }

  return optionsObj;
}