'use strict';

var argv = require('minimist')(process.argv.slice(2), {
  alias: {debug: 'd'}
});
var fs = require('fs');
var async = require('async');
var path = require('path');
var lookup = require('look-up');
var pkg = lookup('package.json', {cwd: process.cwd()});
var del = require('delete');
var utils = require('../../lib/utils');
var actual = path.join(path.dirname(pkg), 'test/actual');

/**
 * Expose utils
 */

exports.exists = function(fp, cb) {
  if (argv.debug) return cb();

  if (Array.isArray(fp)) {
    return exports.eachExists(fp, cb);
  }
  
  fs.exists(fp, function(exists) {
    if (!exists) {
      cb(new Error('expected file to exist'));
    } else {
      // del(actual, cb);
      cb()
    }
  });
};

exports.eachExists = function(files, cb) {
  if (argv.debug) return cb();
  files = utils.arrayify(files);

  async.each(files, function (file, next) {
    fs.exists(file.dest, function(exists) {
      if (!exists) {
        return next(new Error('expected file to exist'));
      }
      next();
    });
  }, function (err) {
    if (err) return cb(err);
    del(actual, cb);
  });
};
