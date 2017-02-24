const assert = require('assert');
const Geohash = require('../geohash');

describe('## encode', () => {

  it('result must be corrected', () => {
    let result = Geohash.encode(31.2328, 121.38164);
    assert.deepEqual(result, 'wtw3djg2jpy');
  });

  it('array must be supported', () => {
    let result = Geohash.encode([ 31.2328, 121.38164 ]);
    assert.deepEqual(result, 'wtw3djg2jpy');
  });

  it('must thrown on error args', () => {
    assert.throws(() => Geohash.encode(NaN, 1), Error);
    assert.throws(() => Geohash.encode(1, NaN), Error);
    assert.throws(() => Geohash.encode(), Error);
  });

});
