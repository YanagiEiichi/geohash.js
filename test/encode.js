const assert = require('assert');
const Geohash = require('../geohash');

describe('## encode', () => {

  it('result must be corrected', () => {
    let result = Geohash.encode(31.2328, 121.38164);
    assert.strictEqual(result, 'wtw3djg2jpy');
  });

  it('array must be supported', () => {
    let result = Geohash.encode([ 31.2328, 121.38164 ]);
    assert.strictEqual(result, 'wtw3djg2jpy');
  });

  it('"0.1 + 0.2" must be supported', () => {
    let result = Geohash.encode(0.1 + 0.2, 1);
    assert.strictEqual(result, 's009w');
  });

  it('integer must be support', () => {
    let result = Geohash.encode(2, 3);
    assert.strictEqual(result, 's065');
  });

  it('[90,180] must be "zzzz"', () => {
    let result = Geohash.encode(90, 180);
    assert.strictEqual(result, 'zzzz');
  });

  it('must thrown on error args', () => {
    assert.throws(() => Geohash.encode(NaN, 1), Error);
    assert.throws(() => Geohash.encode(1, NaN), Error);
    assert.throws(() => Geohash.encode(), Error);
  });

});
