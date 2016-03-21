'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
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
 * Expose `utils` modules
 */

module.exports = utils;
