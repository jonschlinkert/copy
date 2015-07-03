'use strict';

var fs = require('graceful-fs');
var path = require('path');
var glob = require('lazy-globby');
var extend = require('extend-shallow');
var each = require('async-each');
var mkdir = require('mkdirp');
var lookup = require('./lookup');

module.exports = copy;

function copy(patterns, dest, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = defaults(options);

  glob()(patterns, opts, function (err, files) {
    each(files, function (fp, next) {
      fp = path.resolve(opts.cwd, fp);

      copy.one(fp, dest, opts, next);
    }, cb);
  });
}

copy.sync = function copySync(patterns, dest, options) {
  var opts = defaults(options);

  glob().sync(patterns, opts).forEach(function (fp) {
    try {
      copy.oneSync(fp, dest, opts);
    } catch (err) {
      throw new Error(err);
    }
  });
};

copy.dir = function(dirname, dest, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = defaults(options);

  lookup(dirname, function (err, files) {
    each(files, function (fp, next) {
      fp = path.resolve(opts.cwd, fp);

      copy.one(fp, dest, opts, next);
    }, cb);
  });
};

copy.dirSync = function dirSync(dirname, dest, options) {
  var opts = defaults(options);
  lookup.sync(dirname).forEach(function (fp) {
    copy.oneSync(fp, dest, opts);
  });
};

copy.one = function copyOne(fp, dest, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = defaults(options);

  mkdir(dest, opts, function (err) {
    if (err) return cb(err);

    try {
      fp = path.resolve(opts.cwd, fp);
      var res = opts.rename(fp, dest);
      copyBase(fp, res);
      return cb();
    } catch(err) {
      return cb(err);
    }
  });
};

copy.oneSync = function copyOneSync(fp, dest, options) {
  var opts = defaults(options);
  try {
    fp = path.resolve(opts.cwd, fp);
    mkdir.sync(dest, opts);
    var res = opts.rename(fp, dest);
    copyBase(fp, res);
  } catch (err) {
    throw new Error(err);
  }
};

function rename(fp, dest) {
  return path.resolve(dest, path.basename(fp));
}

function copyBase(src, dest) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}

function defaults(options) {
  return extend({cwd: process.cwd(), rename: rename}, options);
}
