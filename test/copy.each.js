'use strict';

require('mocha');
var path = require('path');
var support = require('./support');
var assert = require('assert');
require('assert-path')(assert);
require('assert-fs')(assert);
var exists = support.exists;
var copy = require('..');

describe('copy.each', function() {
  it('should copy an array of files to a directory', function(cb) {
    var src = ['test/fixtures/a.txt', 'test/fixtures/b.txt'];
    var dest = 'test/actual';

    copy.each(src, dest, function(err, files) {
      if (err) return cb(err);
      exists(files, cb);
    });
  });

  it('should copy an array of files from a cwd', function(cb) {
    var src = ['a.txt', 'b.txt'];
    var dest = 'test/actual';
    var opts = {cwd: 'test/fixtures/'};

    copy.each(src, dest, opts, function(err, files) {
      if (err) return cb(err);
      exists(files, cb);
    });
  });

  it('should copy an array of files to a destBase', function(cb) {
    var opts = {destBase: 'test'};
    var src = ['test/fixtures/a.txt', 'test/fixtures/b.txt'];
    var dest = 'actual/foo/bar';

    copy.each(src, dest, opts, function(err, files) {
      if (err) return cb(err);
      assert.dirname(files[0].dest, path.resolve('test/actual/foo/bar/test/fixtures'));
      exists(files, cb);
    });
  });

  it('should copy an array of files using cwd and destBase', function(cb) {
    var opts = {destBase: 'test', cwd :'test/fixtures'};
    var src = ['a.txt', 'b.txt'];
    var dest = 'actual/foo/bar';

    copy.each(src, dest, opts, function(err, files) {
      if (err) return cb(err);
      assert.dirname(files[0].dest, path.resolve('test/actual/foo/bar'));
      assert.dirname(files[1].dest, path.resolve('test/actual/foo/bar'));
      exists(files, cb);
    });
  });

  it('should flatten the basename of src paths to a destBase', function(cb) {
    var opts = {destBase: 'test', flatten: true};
    var src = ['test/fixtures/a.txt', 'test/fixtures/b.txt'];
    var dest = 'actual/foo/bar';

    copy.each(src, dest, opts, function(err, files) {
      if (err) return cb(err);
      assert.dirname(files[0].dest, path.resolve('test/actual/foo/bar'));
      exists(files, cb);
    });
  });

  it('should copy an array of files from a cwd to a destBase', function(cb) {
    var opts = {cwd: 'test/', destBase: 'test', flatten: true};
    var src = ['fixtures/a.txt', 'fixtures/b.txt'];
    var dest = 'actual/foo/bar';

    copy.each(src, dest, opts, function(err, files) {
      if (err) return cb(err);
      assert.dirname(files[0].dest, path.resolve('test/actual/foo/bar'));
      exists(files, cb);
    });
  });

  it('should error when dest is missing', function(cb) {
    copy.each('foo/', function(err, files) {
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
      copy.each('foo/', 'bar');
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });

  it('should error when src is missing', function(cb) {
    copy.each(function(err, files) {
      if (!err) {
        return cb(new Error('expected an error'));
      }
      assert(err);
      assert.equal(err.message, 'expected "src" to be a string');
      cb();
    });
  });
});
