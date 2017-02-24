const assert = require('assert');
const Geohash = require('../geohash');

describe('## decode', () => {

  it('result must be corrected', () => {
    let result = Geohash.decode('wtw3djg2jpy');
    assert.deepEqual(result, [ 31.2328, 121.38164 ]);
  });

  it('must geohash char table must be matched', () => {
    let table = '0123456789bcdefghjkmnpqrstuvwxyz';
    for (let i = 0; i < table.length; i++) Geohash.decode(table[i]);
  });

  it('"ailo" must be thrown', () => {
    let table = 'ailo';
    for (let i = 0; i < table.length; i++) assert.throws(() => Geohash.decode(table[i]));
  });

  it('must thrown if error args provided', () => {
    assert.throws(() => Geohash.decode(''), Error);
    assert.throws(() => Geohash.decode('a'), Error);
    assert.throws(() => Geohash.decode(), Error);
  });

});
