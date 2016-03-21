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
    destDir = path.resolve(destDir);
  }

  if (opts.srcBase) {
    // file.path = path.relative(opts.srcBase, file.path);
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

  // if (typeof file === 'string') {
  //   file = new utils.File({path: file});
  //   file.stat = fs.statSync(file.path);
  // }

  // if (file.options) {
  //   opts = utils.extend({}, opts, file.options);
  // }

  // var cwd = utils.resolve(opts.cwd || '');
  // var filepath;
  // var destDir;

  // if (typeof dir === 'function') {
  //   destDir = dir(file);

  // } else if (typeof dir === 'string') {
  //   destDir = dir;

  // } else {
  //   return cb(new TypeError('expected dest to be a string or function.'));
  // }

  // if (opts.destBase) {
  //   destDir = path.resolve(destDir, utils.resolve(opts.destBase));
  // } else {
  //   destDir = path.resolve(destDir);
  // }

  // if (opts.srcBase) {
  //   file.path = path.relative(opts.srcBase, file.path);
  //   file.base = opts.srcBase;
  // }

  // if (opts.flatten === true) {
  //   file.path = file.basename;
  // }

  // if (typeof file.path === 'undefined') {
  //   file.path = file.relative;
  // }

  // if (typeof opts.ext !== 'undefined') {
  //   file.extname = file.ext;
  // }

  // // update path properties
  // file.cwd = cwd;
  // file.path = path.resolve(destDir, file.relative);

  // if (typeof file.dest === 'function') {
  //   file.dest(file.path, opts, cb);
  //   return;
  // }

  // cb(null, file.path);
};

