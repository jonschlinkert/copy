'use strict';

require('mocha');
var assert = require('assert');
var recurse = require('../lib/recurse');

describe('recurse.sync', function() {
  it('should return an array of files', function() {
    var files = recurse.sync('test/fixtures');
    assert(Array.isArray(files));
    assert(files.length);
  });

  it('should create file objects', function() {
    var files = recurse.sync('test/fixtures');
    assert(files[0]);
    assert.equal(typeof files[0], 'object');
  });

  it('should read contents from files as a buffer', function() {
    var files = recurse.sync('test/fixtures');
    assert(Buffer.isBuffer(files[0].contents));
  });
});
