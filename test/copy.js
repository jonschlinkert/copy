'use strict';

require('mocha');
var assert = require('assert');
var support = require('./support');
var exists = support.exists;
var copy = require('..');

describe('copy', function() {
  it.skip('should copy a file', function(cb) {
    var src = 'test/fixtures/a.txt';
    var dest = 'test/actual/a.txt';

    copy(src, dest, function(err) {
      if (err) return cb(err);
      exists(dest, cb);
    });
  });

  it('should copy a glob of files', function(cb) {
    var src = 'test/fixtures/*.txt';
    var dest = 'test/actual';

    copy(src, dest, function(err, files) {
      if (err) return cb(err);
      exists(files, cb);
    });
  });

  it.only('should copy a glob of files from a cwd', function(cb) {
    var src = '*.txt';
    var dest = 'test/actual';
    var opts = {cwd: 'test/fixtures/'};

    copy(src, dest, opts, function(err, files) {
      if (err) return cb(err);
      exists(files, cb);
    });
  });

  it('should error when dest is missing', function(cb) {
    copy('foo/', function(err, files) {
      if (!err) {
        return cb(new Error('expected an error'));
      }
      assert(err);
      assert.equal(err.message, 'expected "dest" to be a string');
      cb();
    });
  });

  it('should throw an error when callback is not a function', function(cb) {
    try {
      copy('foo/', 'bar');
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
      assert.equal(err.message, 'expected "src" to be a string');
      cb();
    });
  });
});
