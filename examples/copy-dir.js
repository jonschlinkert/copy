var copyDir = require('..').dir;

// not implemented yet
copyDir('test', 'actual', function (err) {
  if (err) return console.error(err);
  console.log('done!');
});
