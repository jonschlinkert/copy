'use strict';

var path = require('path');
var async = require('async');
var toDest = require('./lib/dest');
var invalid = require('./lib/invalid');
var recurse = require('./lib/recurse');
var utils = require('./lib/utils');
var base = require('./lib/base');

function copy(patterns, dir, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (arguments.length < 3) {
    return invalid.apply(null, arguments);
  }

  var opts = utils.extend({cwd: process.cwd()}, options);
  opts.cwd = path.resolve(opts.cwd);
  patterns = utils.arrayify(patterns);

  if (!utils.hasGlob(patterns)) {
    opts.isGlob = false;
    copyEach(patterns, dir, opts, cb);
    return;
  }

  if (!opts.srcBase) {
    opts.srcBase = path.resolve(opts.cwd, utils.parent(patterns));
    opts.base = path.relative(opts.cwd, opts.srcBase);
  }

  utils.glob(patterns, opts, function(err, files) {
    if (err) return cb(err);
    copyEach(files, dir, opts, cb);
  });
}

function copyEach(files, dir, options, cb) {
  async.reduce(files, [], function(acc, filepath, next) {
    if (options.isGlob === false) {
      filepath = path.resolve(options.cwd, filepath);
    }
    copyOne(filepath, dir, options, function(err, file) {
      if (err) return next(err);
      next(null, acc.concat(file));
    });
  }, cb);
}

function copyOne(fp, dir, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (arguments.length < 3) {
    return invalid.apply(null, arguments);
  }

  toDest(dir, fp, options, function(err, file) {
    base(fp, file.path, options, function(err) {
      if (err) return cb(err);
      cb(null, file);
    });
  });
}

function mapDest(file, dest, options) {
  var opts = utils.extend({}, options);
  var base = opts.srcBase || utils.parent(opts.patterns);

  // if (utils.hasGlob(patterns)) {
  //   opts.isGlob = true;
  //   opts.mapDest = true;
  // }
  // if (Array.isArray(patterns)) {
  //   opts.mapDest = true;
  // }
  // if (dest.slice(-1) === '/') {
  //   opts.mapDest = true;
  // }
}

/**
 * Normalize options and ensure that destination directory
 * and file paths will result in what the user expects.
 *
 * @param {String|Array} `patterns` Glob pattern(s) or file path(s)
 * @param {String} `dest` Desination directory for copied files
 * @param {Object} `options`
 * @return {Object}
 */

function createOptions(patterns, dest, options) {
  var opts = utils.extend({overwrite: true}, options);
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
module.exports.one = copyOne;
