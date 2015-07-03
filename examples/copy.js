var copy = require('..');

copy('fixtures/*.txt', 'actual/nested/nested-deeper', function (err) {
  if (err) {
    console.error(err);
  }
});
