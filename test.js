/*!
 * copy <https://github.com/jonschlinkert/copy>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var copy = require('./');
var dircompare = require('dir-compare');
var fs = require('fs-extra');
var path = require('path');

var input = './fixtures/';
var output = './output/';


var compDir = function(from, to) {
    var res = {
        same: false,
        diffSet: []
    };
    try {
        console.log('Compare', from, to);
        res = dircompare.compareSync(path.join(process.cwd(), from), path.join(process.cwd(), to), {
            compareContent: true
        });
    }
    catch (err) {
        console.error(err);
    }

    if (!res.same) {
        console.error('DIFF', res);
    }
    assert.equal(res.same, true);

};

describe('copy', function() {
    beforeEach(function() {
        try {
            fs.removeSync(output);
        }
        catch (err) {
            //nothing
        }
    });

    describe('.sync', function() {
        it('should copy files with no structure', function() {
            copy.sync(input + '**/*', output);
            compDir(output, './references/copySyncFlatten/');

        });

        it('should copy files with structure', function() {
            copy.sync(input + '**/*', output, {
                flatten: false
            });
            compDir(output, './references/copySync/');

        });
    });

    describe('.dirSync', function() {
        it('should copy files with no structure', function() {
            copy.dirSync(input, output);
            compDir(output, './references/copySyncFlatten/');

        });

        it('should copy files with structure', function() {
            copy.dirSync(input, output, {
                flatten: false
            });
            compDir(output, './references/copySync/');

        });
    });

});