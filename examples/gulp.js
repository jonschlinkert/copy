var gulp = require('gulp');
var copy = require('..');

var opts = {cwd: 'fixtures/', destBase: 'foo'}

gulp.task('default', function (cb) {
  copy('**/*.txt', 'actual', opts, cb);
});

gulp.start('default');
