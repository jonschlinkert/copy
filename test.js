/*!
 * copy <https://github.com/jonschlinkert/copy>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var copy = require('./');

describe('copy', function () {
  it('should:', function () {
    copy('a').should.eql({a: 'b'});
    copy('a').should.equal('a');
  });

  it('should throw an error:', function () {
    (function () {
      copy();
    }).should.throw('copy expects valid arguments');
  });
});
