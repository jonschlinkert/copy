'use strict';

var path = require('path');
var invalid = require('./lib/invalid');
var utils = require('./lib/utils');
var base = require('./lib/base');
var mapDest = require('map-dest');
var Expand = require('expand-files').Files;

function copy(patterns, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (arguments.length < 3) {
    return invalid.apply(null, arguments);
  }

  var files = expand(patterns, dest, opts);

  utils.async.each(files, function (file, next) {
    base(file.src, file.dest, next);
  }, cb);

  // utils.glob(patterns, opts, function (err, files) {
  //   utils.async.each(files, function (fp, next) {
  //     createDest(fp, dest, opts);
  //     next();
  //     // base(fp, dest, opts, next);
  //   }, cb);
  // });
}

function createDest(src, dest, opts) {
  console.log(mapDest(src, dest, opts))

}

function expand(patterns, dest, options) {
  var opts = utils.extend({}, options, {expand: true});
  var config = new Expand(opts);
  config.expand({src: patterns, dest: dest});
  return config.files.map(function (file) {
    file.src = file.src[0];
    return file;
  });
}

/**
 * Expose `copy`
 */

module.exports = copy;
