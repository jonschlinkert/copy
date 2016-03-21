'use strict';

var path = require('path');
var contents = require('./contents');
var utils = require('./utils');

/**
 * async
 */

function recurse(dir, cb) {
  var fs = utils.fs; // graceful-fs

  fs.readdir(dir, function(err, files) {
    if (err) return cb(err);

    utils.async.reduce(files, [], function(acc, name, next) {
      var fp = path.join(dir, name);

      fs.lstat(fp, function(err, stat) {
        if (err) return next(err);

        if (stat.isDirectory()) {
          return recurse(fp, function(err, files) {
            if (err) return next(err);
            next(null, acc.concat(files));
          });
        }

        var file = {cwd: dir, path: fp, stat: stat};
        contents(file, function(err, res) {
          if (err) return next(err);
          next(null, acc.concat(res));
        });
      });
    }, cb);
  });
}

/**
 * sync
 */

recurse.sync = function(dir) {
  var fs = utils.fs;
  var files = fs.readdirSync(dir);
  var len = files.length, i = -1;
  var res = [];
  while (++i < len) {
    var name = files[i];
    var fp = path.join(dir, name);
    var stat = fs.lstatSync(fp);
    if (stat.isDirectory()) {
      res.push.apply(res, recurse.sync(fp));
    } else {
      res.push(contents.sync({
        cwd: dir,
        stat: stat,
        path: fp
      }));
    }
  }
  return res;
};

/**
 * promise
 */

recurse.promise = function(dir, files) {
  files = files || [];

  var Promise = utils.Promise;
  var fs = utils.fs;

  var readdir = Promise.promisify(fs.readdir);
  var stats = Promise.promisify(fs.stat);

  return readdir(dir).reduce(function(acc, name) {
    var fp = path.join(dir, name);

    return stats(fp).then(function(stat) {
      if (stat.isDirectory()) {
        return recurse.promise(fp, acc);
      }

      return acc.concat(contents.sync({
        cwd: dir,
        stat: stat,
        path: fp
      }));
    });
  }, files);
};

/**
 * Expose `recurse`
 */

module.exports = recurse;
