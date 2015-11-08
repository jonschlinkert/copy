'use strict';

require('mocha');
var assert = require('assert');
var recurse = require('../lib/recurse');
var copy = require('..');

describe('copy', function () {
  // todo
});

describe('walk', function () {
  it('should return an array of file objects', function () {
    recurse('test/', function () {
      console.log(arguments)
    });
  });
});
