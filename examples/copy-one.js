var copy = require('..');

copy.one('fixtures/a.txt', 'actual', function (err) {
  if (err) {
    console.error(err);
  }
});
