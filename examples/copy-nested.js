var copy = require('..');

copy('fixtures/nested/**/*.txt', 'actual', function (err) {
  if (err) {
    console.error(err);
  }
});
