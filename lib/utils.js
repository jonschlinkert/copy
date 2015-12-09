'use strict';

/**
 * Module dependencies
 */

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
require('glob-parent', 'parent');
require('graceful-fs', 'fs');
require('kind-of', 'typeOf');
require('mkdirp');
require('vinyl', 'File');
require = fn;

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
 * Cast `val` to an array.
 *
 * @param {any} val
 * @return {Array}
 */

utils.arrayify = function(val) {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
