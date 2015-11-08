'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var copy = require('..');
var del = require('delete');

function exists(fp, cb) {
  fs.exists(fp, function(exists) {
    if (!exists) {
      cb(new Error('expected file to exist'));
    }
    del(path.dirname(fp), cb);
  });
}

describe('copy', function() {
  it('should copy a file', function(cb) {
    var src = 'test/fixtures/a.txt';
    var dest = 'test/actual/a.txt';

    copy(src, dest, function(err) {
      if (err) return cb(err);
      console.log(arguments)
      // exists(dest, cb);
      cb()
    });
  });

  it('should error when dest is missing', function(cb) {
    copy('foo/', function(err, files) {
      if (!err) {
        return cb(new Error('expected an error'));
      }
      assert(err);
      assert.equal(err.message, 'expected "dest" to be a string')
      cb();
    });
  });

  it('should throw an error when callback is not a function', function(cb) {
    try {
      copy('foo/');
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });

  it('should error when src is missing', function(cb) {
    copy(function(err, files) {
      if (!err) {
        return cb(new Error('expected an error'));
      }
      assert(err);
      assert.equal(err.message, 'expected "src" to be a string')
      cb();
    });
  });
});
