'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var once = require('../lib/once');

describe('once', function() {
  it('should only call a function once', function() {
    var i = 0;
    function count() {
      ++i;
    }

    var fn = once(count);
    fn();
    fn();
    fn();
    fn();
    assert.equal(i, 1);
  });
});
