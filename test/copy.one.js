'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var del = require('delete');
var copy = require('..');

function exists(fp, cb) {
  fs.exists(fp, function(exists) {
    if (!exists) {
      cb(new Error('expected file to exist'));
    }
    del(path.dirname(fp), cb);
  });
}

describe('copy.one', function() {
  it('should copy a file from an absolute path to an absolute path', function(cb) {
    var src = path.resolve('test/fixtures/a.txt');
    var dest = path.resolve('test/actual/a.txt');

    copy.one(src, dest, function(err) {
      if (err) return cb(err);
      exists(dest, cb);
    });
  });

  it('should copy a file', function(cb) {
    var src = 'test/fixtures/a.txt';
    var dest = 'test/actual/a.txt';

    copy.one(src, dest, function(err) {
      if (err) return cb(err);
      exists(dest, cb);
    });
  });

  it('should error when dest is missing', function(cb) {
    copy.one('foo/', function(err, files) {
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
      copy.one('foo/');
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });

  it('should error when src is missing', function(cb) {
    copy.one(function(err, files) {
      if (!err) {
        return cb(new Error('expected an error'));
      }
      assert(err);
      assert.equal(err.message, 'expected "src" to be a string')
      cb();
    });
  });
});
