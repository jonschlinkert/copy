'use strict';

var del = require('delete');
var gulp = require('gulp');
var copy = require('./');

gulp.task('default', function(cb) {
  copy('test/fixtures/**/*.*', 'test/actual', cb);
});

gulp.task('del', function(cb) {
  del('test/actual', cb);
});
