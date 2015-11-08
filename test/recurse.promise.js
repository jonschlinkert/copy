'use strict';

require('mocha');
var assert = require('assert');
var recurse = require('../lib/recurse');

describe('recurse.promise', function() {
  it('should return an array of file objects', function(cb) {
    recurse.promise('test/fixtures/')
      .then(function(files) {
        assert(Array.isArray(files));
        assert(files.length);
        cb();
      }, cb);
  });

  it('should create file objects', function(cb) {
    recurse.promise('test/fixtures')
      .then(function(files) {
        assert.equal(typeof files[0], 'object');
        assert(files[0]);
        cb();
      }, cb);
  });

  it('should read contents from files as a buffer', function(cb) {
    recurse.promise('test/fixtures')
      .then(function(files) {
        assert(Buffer.isBuffer(files[0].contents));
        cb();
      }, cb);
  });

  it('should handle errors', function(cb) {
    recurse.promise('foo/')
      .then(function(files) {
        assert(Array.isArray(files));
        assert(files.length);
        cb(new Error('expected an error'));
      }, function () {
        cb()
      });
  });
});
