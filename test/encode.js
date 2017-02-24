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

  it('[-90,-180] must be "0000"', () => {
    let result = Geohash.encode(-90, -180);
    assert.strictEqual(result, '0000');
  });

  it('must thrown if error args provided', () => {
    assert.throws(() => Geohash.encode(NaN, 1), TypeError);
    assert.throws(() => Geohash.encode(1, NaN), TypeError);
    assert.throws(() => Geohash.encode(), TypeError);
  });

  it('must be thrown if lat/lng overflow', () => {
    assert.throws(() => Geohash.encode(90.1, 0), RangeError);
    assert.throws(() => Geohash.encode(0, 180.1), RangeError);
    assert.throws(() => Geohash.encode(0, -180.1), RangeError);
    assert.throws(() => Geohash.encode(-90.1, 0), RangeError);
  });

});
