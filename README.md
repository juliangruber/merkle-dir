
# merkle-dir

Create [merkle trees](http://en.wikipedia.org/wiki/Merkle_tree) from directories.

## Example

Let's create a merkle tree from the `test/fixtures` folder:

```js
var merkle = require('merkle-dir');

merkle(__dirname, function(err, tree) {
  console.log(JSON.stringify(tree, null, '  '));
});
```

And the tree is:

```bash
$ node example.js
{
  "path": "",
  "hash": "79d8ca8a1c6e37271a7c846246a0035e46cf3705a0024d01f830bc77c9e7c6a7",
  "tree": [
    {
      "path": "a",
      "hash": "bbfadafe6ae91a4b0311ad83ceac22e965ce7efd181c493e0d2339197449d769",
      "tree": [
        {
          "path": "a/file.txt",
          "hash": "197e199545eca4b58d335b7e671871a63e4e5b3ca6361cfa9605b654bc3bbfa1"
        }
      ]
    },
    {
      "path": "b",
      "hash": "e9e3596a701f0edb0c80e9d0bd147e223c1f965f0aef388844222c1140fbaec3",
      "tree": [
        {
          "path": "b/file.txt",
          "hash": "f1523727794b3bed803486a4b10b46962696e0401bcf94f995078577cbbff3cf"
        }
      ]
    },
    {
      "path": "c",
      "hash": "bbfadafe6ae91a4b0311ad83ceac22e965ce7efd181c493e0d2339197449d769",
      "tree": [
        {
          "path": "c/ahoi.txt",
          "hash": "197e199545eca4b58d335b7e671871a63e4e5b3ca6361cfa9605b654bc3bbfa1"
        }
      ]
    }
  ]
}
```

## API

### merkle(directory, fn)

Create a merkle tree covering `directory` and call `fn` with the possible error
and the tree.

Nodes have those keys:

* `path`: the path relative to the root `directory`
* `hash`: the hex encoded `sha256` hash of the file or its subtree
* `tree`: the subtree, exists only if the node is a *directory*

## TODO

* turn file nodes into trees with a meta hash and a content hash

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install merkle-dir
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
