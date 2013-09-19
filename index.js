var fs = require('fs');
var once = require('once');
var join = require('path').join;
var relative = require('path').relative;
var crypto = require('crypto');

module.exports = Merkle;

function Merkle(dir, root, fn) {
  if (typeof root == 'function') {
    fn = root;
    root = dir;
  }

  fn = once(fn);
  var entries = [];

  fs.readdir(dir, function(err, files) {
    if (err) return fn(err);

    var todo = Number(files.length);
    if (!todo) hashed();

    files.sort().forEach(function(filename) {
      var filepath = join(dir, filename);
      var entry = {
        path: relative(root, filepath)
      };
      entries.push(entry);

      fs.stat(filepath, function(err, stat) {
        if (err) return fn(err);

        if (stat.isFile()) {
          hashFile(filepath, function(err, hash) {
            if (err) return fn(err);
            entry.hash = hash;
            hashed();
          });
        } else if (stat.isDirectory()) {
          Merkle(filepath, root, function(err, tree) {
            if (err) return fn(err);
            entry.hash = tree.hash;
            entry.tree = tree.tree;
            hashed();
          });
        } else {
          hashed();
        }
      });
    });

    function hashed() {
      if (--todo > 0) return;

      var root = {
        path: '',
        hash: hashEntries(entries),
        tree: entries
      };
      fn(null, root);
    }
  });
};

function hashEntries(entries) {
  var hash = crypto.createHash('sha256');
  for (var i = 0; i < entries.length; i++) {
    hash.update(entries[i].hash);
  }
  return hash.digest('hex');
}

function hashFile(filepath, fn) {
  fn = once(fn);
  var hash = crypto.createHash('sha256');

  fs.createReadStream(filepath)
    .on('data', function(chunk) {
      hash.update(chunk);
    })
    .on('end', function() {
      fn(null, hash.digest('hex'));
    })
    .on('error', fn);
}

