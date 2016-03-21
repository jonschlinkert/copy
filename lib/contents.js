'use strict';

var utils = require('./utils');

/**
 * Asynchronously create a customized vinyl file
 */

function contents(obj, cb) {
  utils.contents.async(toFile(obj), cb);
}

/**
 * Synchronously create a customized vinyl file
 */

contents.sync = function(obj) {
  return utils.contents.sync(toFile(obj));
};

/**
 * Custom vinyl file object (really a placeholder for planned props)
 *
 * @param {Object} `obj` File properties
 * @return {Object}
 */

function toFile(obj) {
  obj = obj || {};
  return new utils.File({
    cwd: obj.cwd,
    path: obj.path,
    stat: obj.stat
  });
}

/**
 * Expose `contents`
 */

module.exports = contents;
