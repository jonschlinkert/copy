'use strict';

var path = require('path');
var async = require('async');
var invalid = require('./lib/invalid');
var utils = require('./lib/utils');
var base = require('./lib/base');

function copy(patterns, dest, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (arguments.length < 3) {
    return invalid.apply(null, arguments);
  }

  var opts = createOptions(patterns, dest, options);
  var files = utils.expand(patterns, dest, opts);

  async.each(files, function(file, next) {
    copyEach(file.src, file.dest, opts, next);
  }, function(err) {
    if (err) return cb(err);
    cb(null, files);
  });
}

function copyEach(src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (arguments.length < 3) {
    return invalid.apply(null, arguments);
  }

  opts = opts || {};
  src = utils.arrayify(src);

  async.each(src, function(fp, next) {
    base(fp, dest, opts, next);
  }, cb);
}

function createOptions(patterns, dest, options) {
  var opts = utils.extend({overwrite: true}, options);
  opts.srcType = utils.typeOf(patterns);
  if (utils.hasGlob(patterns)) {
    opts.isGlob = true;
    opts.mapDest = true;
  }
  if (Array.isArray(patterns)) {
    opts.mapDest = true;
  }
  if (dest.slice(-1) === '/') {
    opts.mapDest = true;
  }
  return opts;
}

/**
 * Expose `copy`
 */

module.exports = copy;
