'use strict';

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var each = require('async-each');
var lookup = require('look-up');
var assert = require('assert');
require('assert-fs')(assert);
require('assert-path')(assert);
var pkg = lookup('package.json', {cwd: process.cwd()});
var del = require('delete');
var utils = require('../../lib/utils');
var actual = path.join(path.dirname(pkg), 'test/actual');

/**
 * Expose utils
 */

exports.exists = function(fp, cb) {
  if (argv.n) return cb();

  if (Array.isArray(fp)) {
    return exports.eachExists(fp, cb);
  }
  
  assert.exists(fp, function(err) {
    if (err) return cb(err);
    del(actual, cb);
  });
};

exports.eachExists = function(files, cb) {
  if (argv.n) return cb();
  files = utils.arrayify(files);

  each(files, function (file, next) {
    assert.exists(file.dest, function(err) {
      if (err) return next(err);
      next();
    });
  }, function (err) {
    if (err) return cb(err);
    del(actual, cb);
  });
};
