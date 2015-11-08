'use strict';

var path = require('path');
var utils = require('./utils');
var once = require('./once');

/**
 * Copy a file from `src` to `dest`
 *
 * @param {String} `src` Source filepath
 * @param {String} `dest` Destination filepath
 * @param {Object} `options`
 * @param {Function} `cb` Callback function
 * @api public
 */

function copyBase(src, dest, options, callback) {
  if (typeof options !== 'object') {
    callback = options;
    options = {};
  }

  // get the callback so we can give the correct errors
  // when src or dest is missing
  if (typeof dest === 'function') callback = dest;
  if (typeof src === 'function') callback = src;

  if (typeof callback !== 'function') {
    throw new TypeError('expected callback to be a function');
  }

  if (typeof src !== 'string') {
    return callback(new TypeError('expected "src" to be a string'));
  }

  if (typeof dest !== 'string') {
    return callback(new TypeError('expected "dest" to be a string'));
  }

  var cb = once(callback);
  var opts = utils.extend({overwrite: true}, options);
  var fs = utils.fs; // graceful-fs (lazyily required)
  var reader = once(fn);

  var rs = fs.createReadStream(src)
    .on('error', handleError('read', src, opts, cb))
    .on('readable', reader)
    .on('end', reader);

  function fn() {
    mkdir(dest, function(err) {
      if (err) return cb(err);

      rs.pipe(fs.createWriteStream(dest, writeOpts(opts))
        .on('error', handleError('write', dest, opts, cb))
        .on('close', handleClose(src, dest, cb)));
    });
  }
}

/**
 * Normalize write options
 *
 * @param {Object} `opts`
 * @return {Object}
 */

function writeOpts(opts) {
  return utils.extend({
    flags: opts.flags || (opts.overwrite ? 'w' : 'wx')
  }, opts);
}

/**
 * Ensure that a directory exists before trying to write to it.
 *
 * @param {String} `dest`
 * @param {Function} `cb` Callback function
 */

function mkdir(dest, cb) {
  var dir = path.dirname(dest);

  utils.mkdirp(dir, function(err) {
    if (err && err.code !== 'EEXIST') {
      err.message = formatError('mkdirp cannot create directory', dir, err);
      return cb(new Error(err));
    }
    cb();
  });
}

/**
 * Format error messages
 *
 * @param {String} `msg` Custom error message
 * @param {String} `filepath` filepath that caused the error
 * @param {Object} `err` Error object
 * @return {String}
 */

function formatError(msg, filepath, err) {
  return msg + ' > "' + filepath + '": ' + err.message;
}

/**
 * Handle errors with custom message formatting.
 *
 * @param {String} `type` types are "read" or "write"
 * @param {String} `filepath` filepath that caused the error
 * @param {Object} `options`
 * @param {Function} `cb` callback function
 */

function handleError(type, filepath, opts, cb) {
  return function(err) {
    switch (type) {
      case 'read':
        if (err.code === 'ENOENT') {
          err.message = formatError('file does not exist', filepath, err);
        } else {
          err.message = formatError('cannot read file', filepath, err);
        }
        break;
      case 'write':
        if (!opts.overwrite && err.code === 'EEXIST') {
          return cb();
        }
        err.message = formatError('cannot write to', filepath, err);
        break;
    }
    cb(err);
  };
}

/**
 * Handle write close event.
 *
 * @param {String} `src` Source filepath
 * @param {String} `dest` Destination filepath
 * @param {Function} `cb` Callback function
 */

function handleClose(src, dest, cb) {
  var fs = utils.fs; // graceful-fs (lazyily required)
  return function() {
    fs.lstat(src, function(err, stat) {
      if (err) return cb(err);

      fs.utimes(dest, stat.atime, stat.mtime, function(err) {
        if (err) return cb(err);
        cb();
      });
    });
  };
}

/**
 * Expose `copyBase`
 */

module.exports = copyBase;
