'use strict';

var path = require('path');
var utils = require('./lib/utils');
var base = require('./lib/base');

function copy(pattern, dest, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var isValid = validate(pattern, dest, cb);
  if (!isValid) return;

  cb()
}

function validate(src, dest, cb) {
  // get the callback so we can give the correct errors
  // when src or dest is missing
  if (typeof dest === 'function') cb = dest;
  if (typeof src === 'function') cb = src;

  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function');
  }

  if (typeof src !== 'string') {
    return cb(new TypeError('expected "src" to be a string'));
  }
  if (typeof dest !== 'string') {
    return cb(new TypeError('expected "dest" to be a string'));
  }
  return true;
}

/**
 * Expose `copy`
 */

module.exports = copy;
