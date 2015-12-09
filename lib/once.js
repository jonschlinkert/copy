'use strict';

/**
 * Ensure that the given function is only called once.
 * @param {Function} fn
 */

module.exports = function(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('expected fn to be a function');
  }
  var result;
  return function() {
    if (fn.called) return result;
    result = fn.apply(this, arguments);
    fn.called = true;
    return result;
  };
};
