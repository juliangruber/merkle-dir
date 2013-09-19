var test = require('tape');
var merkle = require('..');

test('tree', function(t) {
  t.plan(2);
  merkle(__dirname + '/fixtures/a', function(err, tree) {
    t.error(err);
    t.deepEqual(tree, {
      path: '',
      hash: 'bbfadafe6ae91a4b0311ad83ceac22e965ce7efd181c493e0d2339197449d769',
      tree: [
        {
          path: 'file.txt',
          hash: '197e199545eca4b58d335b7e671871a63e4e5b3ca6361cfa9605b654bc3bbfa1'
        }
      ]
    });
  });
});

test('same hash on repeat', function(t) {
  t.plan(3);
  merkle(__dirname + '/fixtures/a', function(err, treeA) {
    t.error(err);
    merkle(__dirname + '/fixtures/a', function(err, treeB) {
      t.error(err);
      t.equal(treeA.hash, treeB.hash);
    });
  });
});

test('different contents differend hashes', function(t) {
  t.plan(3);
  merkle(__dirname + '/fixtures/a', function(err, treeA) {
    t.error(err);
    merkle(__dirname + '/fixtures/b', function(err, treeB) {
      t.error(err);
      t.notEqual(treeA.hash, treeB.hash);
    });
  });
});

