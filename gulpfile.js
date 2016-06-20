'use strict';

var del = require('delete');
var gulp = require('gulp');
var unused = require('gulp-unused');
var copy = require('./');

gulp.task('default', function(cb) {
  copy('test/fixtures/**/*.*', 'test/actual', cb);
});

gulp.task('unused', function() {
  var keys = Object.keys(require('./lib/utils.js'));
  return gulp.src(['index.js', 'lib/*.js'])
    .pipe(unused({keys: keys}))
});

gulp.task('del', function(cb) {
  del('test/actual', cb);
});
