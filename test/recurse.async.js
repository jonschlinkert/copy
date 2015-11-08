'use strict';

require('mocha');
var assert = require('assert');
var recurse = require('../lib/recurse');

describe('recurse.async', function() {
  it('should return an array of files', function(cb) {
    recurse('test/fixtures', function(err, files) {
      if (err) return cb(err);

      assert(Array.isArray(files));
      assert(files.length);
      cb();
    });
  });

  it('should create file objects', function(cb) {
    recurse('test/fixtures', function(err, files) {
      if (err) return cb(err);

      assert(files[0]);
      assert.equal(typeof files[0], 'object');
      cb();
    });
  });

  it('should create file objects', function(cb) {
    recurse('test/fixtures', function(err, files) {
      if (err) return cb(err);
      assert(Buffer.isBuffer(files[0].contents));
      cb();
    });
  });

  it('should handle errors', function(cb) {
    recurse('foo/', function(err, files) {
      if (!err) return cb(new Error('expected an error'));
      cb();
    });
  });
});
