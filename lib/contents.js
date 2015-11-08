'use strict';

var utils = require('./utils');

function contents(obj, cb) {
  obj = obj || {};
  var file = new utils.File({
    cwd: obj.cwd,
    path: obj.path,
    stat: obj.stat
  });
  utils.contents.async(file, cb);
}

/**
 * sync
 */

contents.sync = function(obj) {
  obj = obj || {};
  var file = new utils.File({
    cwd: obj.cwd,
    path: obj.path,
    stat: obj.stat
  });
  return utils.contents.sync(file);
};

/**
 * Expose `contents`
 */

module.exports = contents;
