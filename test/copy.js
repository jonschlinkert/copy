'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {debug: 'd'}
});
var assert = require('assert');
var once = require('../lib/once');
var copy = require('..');
var del = require('delete');

function exists(fp, cb) {
  if (argv.debug) return cb();

  fs.exists(fp, function(exists) {
    if (!exists) {
      cb(new Error('expected file to exist'));
    } else {
      del(path.dirname(fp), cb);
    }
  });
}

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

    copy(src, dest, function(err) {
      if (err) return cb(err);
      exists(dest, cb);
    });
  });

  it.only('should copy a glob of files from a cwd', function(cb) {
    var src = '*.txt';
    var dest = 'test/actual';
    var opts = {cwd: 'test/fixtures/'};

    copy(src, dest, opts, function(err) {
      if (err) return cb(err);
      exists(dest, cb);
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
      assert.equal(err.message, 'expected "src" to be a string')
      cb();
    });
  });
});
