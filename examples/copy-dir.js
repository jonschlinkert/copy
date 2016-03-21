var copyDir = require('..').dir;


copyDir('test', 'actual', function (err) {
  if (err) return console.error(err);
  console.log('done!');
});
