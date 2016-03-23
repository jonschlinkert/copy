'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var utils = require('../lib/utils');
var dest = require('../lib/dest');

describe('dest', function() {
  it('should join dest directory to src filepath', function(cb) {
    var filepath = 'test/fixtures/a.txt';
    var dir = 'test/actual';

    dest(dir, filepath, function(err, file) {
      if (err) return cb(err);
      assert.equal(path.resolve(dir, filepath), file.path);
      cb();
    });
  });

  it('should strip glob parent from the src path', function(cb) {
    var file = utils.toFile('test/fixtures/nested/d.txt', 'test/fixtures/**/*.txt');
    var dir = 'test/actual';

    dest(dir, file, function(err, file) {
      if (err) return cb(err);
      assert.equal(path.resolve(dir, 'nested/d.txt'), file.path);
      cb();
    });
  });

  it('should strip srcBase from the src path', function(cb) {
    var file = utils.toFile('test/fixtures/nested/d.txt');
    var dir = 'test/actual';

    dest(dir, file, {srcBase: 'test/fixtures'}, function(err, file) {
      if (err) return cb(err);
      assert.equal(path.resolve(dir, 'nested/d.txt'), file.path);
      cb();
    });
  });

  it('should flatten src basename onto dest directory', function(cb) {
    var file = utils.toFile('test/fixtures/nested/d.txt');
    var dir = 'test/actual';

    dest(dir, file, {flatten: true}, function(err, file) {
      if (err) return cb(err);
      assert.equal(path.resolve(dir, 'd.txt'), file.path);
      cb();
    });
  });

  it('should replace dest extension with options.ext', function(cb) {
    var file = utils.toFile('test/fixtures/nested/d.txt');
    var dir = 'test/actual';

    dest(dir, file, {flatten: true, ext: 'foo'}, function(err, file) {
      if (err) return cb(err);
      assert.equal(path.resolve(dir, 'd.foo'), file.path);
      cb();
    });
  });

  it('should strip dest extension when options.ext is an empty string', function(cb) {
    var file = utils.toFile('test/fixtures/nested/d.txt');
    var dir = 'test/actual';

    dest(dir, file, {flatten: true, ext: ''}, function(err, file) {
      if (err) return cb(err);
      assert.equal(path.resolve(dir, 'd'), file.path);
      cb();
    });
  });
});
