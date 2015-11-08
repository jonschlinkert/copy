'use strict';

var fs = require('fs');
var path = require('path');
var resolve = require('resolve-dir');
var define = require('define-property');

/**
 * This is modeled off of vinyl, but we're only copying and
 * don't need any of of the extra features vinyl has, like
 * cloning, etc.
 */

function File(file, opts) {
  opts = opts || {};
  file = file || {};

  define(this, 'history', (file.path ? [file.path] : file.history) || []);
  define(this, 'paths', {});

  this.cwd = file.cwd || process.cwd();
  this.base = file.base || this.cwd;
  this.stat = file.stat || null;

  for (var key in file) {
    if (!(key in this)) {
      this[key] = file[key];
    }
  }
}

function mixin(key, val, isEumerable) {
  Object.defineProperty(File.prototype, key, {
    enumerable: true,
    set: val.set,
    get: val.get
  });
}

mixin('contents', {
  set: function(val) {
    if (typeof val === 'string') {
      val = new Buffer(val);
    }
    if (!this.isBuffer(val) && !this.isStream(val) && !this.isNull(val)) {
      throw new Error('File.contents can only be a Buffer, a Stream, or null.');
    }
    this._contents = val;
  },
  get: function() {
    if (typeof this._contents === 'undefined') {
      if (this.stat.isFile()) {
        this._contents = fs.readFileSync(this.path);
      } else {
        this._contents = null;
      }
    }
    return this._contents;
  }
});

mixin('cwd', {
  set: function(val) {
    if (typeof val === 'string') {
      val = resolve(val);
    }
    this.paths.cwd = val;
  },
  get: function() {
    var cwd = this.paths.cwd || this.options.cwd || process.cwd();
    return resolve(cwd);
  }
});

mixin('base', {
  set: function(val) {
    this.paths.base = val;
  },
  get: function() {
    return this.paths.base || this.options.base || this.cwd;
  }
});

mixin('relative', {
  set: function() {
    throw new Error('"file.relative" is read-only and should not be modified.');
  },
  get: function() {
    return path.relative(this.base, this.path);
  }
});

mixin('dirname', {
  set: function(dirname) {
    this.path = path.join(dirname, this.basename);
  },
  get: function() {
    return path.dirname(this.path);
  }
});

mixin('filename', {
  set: function(filename) {
    this.path = path.join(this.dirname, filename) + this.extname;
  },
  get: function() {
    return path.basename(this.path, this.extname);
  }
});

mixin('basename', {
  set: function(basename) {
    this.path = path.join(this.dirname, basename);
  },
  get: function() {
    return path.basename(this.path);
  }
});

mixin('extname', {
  set: function(extname) {
    this.path = path.join(this.dirname, this.filename) + extname;
  },
  get: function() {
    return path.extname(this.path);
  }
});

mixin('path', {
  set: function(path) {
    if (typeof path !== 'string') {
      throw new Error('expected "file.path" to be a string');
    }
    // push 'path' onto history when modified
    if (path && path !== this.path) {
      this.history.push(path);
    }
  },
  get: function() {
    return this.history[this.history.length - 1];
  }
});

/**
 * Expose `File`
 */

module.exports = File;
