'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

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

/**
 * Restore `require`
 */

require = fn;


utils.expand = function expand(patterns, dest, options) {
  var Expand = utils.expandFiles;

  var opts = utils.extend({}, options);
  var config = new Expand(opts);
  config.expand({src: patterns, dest: dest});
  return config.files;
};

utils.arrayify = function(val) {
  return Array.isArray(val) ? val : [val];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
