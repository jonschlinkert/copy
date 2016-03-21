'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

module.exports = function toDest(dir, file, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = utils.extend({overwrite: true}, options);
  opts.cwd = path.resolve(utils.resolve(opts.cwd || '.'));
  if (typeof file === 'string') {
    file = utils.toFile(file, opts);
  }

  var filepath;
  var destDir;

  if (typeof dir === 'function') {
    destDir = dir(file);

  } else if (typeof dir === 'string') {
    destDir = dir;

  } else {
    return cb(new TypeError('expected dest to be a string or function.'));
  }

  if (opts.destBase) {
    destDir = path.resolve(opts.destBase, destDir);
  } else {
    destDir = path.resolve(opts.cwd, destDir);
  }

  if (opts.srcBase) {
    file.base = opts.srcBase;
    file.path = path.resolve(file.base, file.relative);
  }

  if (typeof opts.ext === 'string') {
    if (opts.ext !== '' && opts.ext.charAt(0) !== '.') {
      opts.ext = '.' + opts.ext;
    }
    file.extname = opts.ext;
  }

  // update path properties
  if (opts.flatten === true || typeof file.path === 'undefined') {
    file.path = path.join(destDir, file.basename);
  } else {
    file.path = path.resolve(destDir, file.relative);
  }

  file.dest = file.path;
  cb(null, file);
};

