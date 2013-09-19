var merkle = require('./');

merkle(__dirname + '/test/fixtures', function(err, tree) {
  console.log(JSON.stringify(tree, null, '  '));
});

