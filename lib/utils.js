'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('async');
require('matched', 'glob');
require('has-glob');
require('file-contents', 'contents');
require('expand-files');
require('bluebird', 'Promise');
require('extend-shallow', 'extend');
require('glob-parent');
require('graceful-fs', 'fs');
require('mkdirp');
require('resolve-dir', 'resolve');
require('to-file');
require('vinyl', 'File');
require = fn;

utils.stat = function(file) {
  try {
    return fs.lstatSync(file.path);
  } catch (err) {}
  return {};
};

/**
 * Expand glob patterns into declarative `files` configurations.
 *
 * @param {String|Array} `patterns`
 * @param {String} `dest`
 * @param {Object} `options`
 * @return {Object}
 */

utils.expand = function expand(patterns, dest, options) {
  var Expand = utils.expandFiles;

  var opts = utils.extend({}, options);
  var config = new Expand(opts);
  config.expand({src: patterns, dest: dest});
  return config.files;
};

/**
 * Get the base filepath from a glob.
 *
 * @param {Array|String} `patterns`
 * @return {String}
 */

utils.parent = function(patterns) {
  if (Array.isArray(patterns)) {
    return utils.globParent(patterns[0]);
  }
  return utils.globParent(patterns);
};

/**
 * Cast `val` to an array.
 *
 * @param {any} val
 * @return {Array}
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Replace file extension
 */

utils.rewriteExt = function(fp, opts) {
  var re = {first: /(\.[^\/]*)?$/, last: /(\.[^\/\.]*)?$/};
  if (opts.ext === false) {
    opts.ext = '';
  }
  if (opts.ext.charAt(0) !== '.') {
    opts.ext = '.' + opts.ext;
  }
  if (typeof opts.extDot === 'undefined') {
    opts.extDot = 'first';
  }
  fp = fp.replace(re[opts.extDot], opts.ext);
  if (fp.slice(-1) === '.') {
    fp = fp.slice(0, -1);
  }
  return fp;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
