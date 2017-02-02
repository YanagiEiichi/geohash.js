var expect = require('chai').expect

describe('Test geohash.js package', function () {
  describe('#Obtain the same results than documentation', function () {
    it('(39.90882, 116.39750) should be encoded to wx4g09njdr6', function () {
      const Geohash = require('../geohash.js')
      var lat = 39.90882
      var lng = 116.39750

      var hash = Geohash.encode(lat, lng)

      expect(hash).to.equal('wx4g09njdr6')
    })

    it('wx4g09njdr6 should be decoded to (39.90882, 116.39750)', function () {
      const Geohash = require('../geohash.js')
      var lat = 39.90882
      var lng = 116.39750

      var hash = 'wx4g09njdr6'

      var result = Geohash.decode(hash)

      expect(result[0]).to.equal(lat)
      expect(result[1]).to.equal(lng)
    })
  })

  describe('#[lat,lng] => geohash => [lat,lng]', function () {
    it('should obtain the same values for 5 decimals coordinates', function () {
      const Geohash = require('../geohash.js')
      var lat = 39.90882
      var lng = 116.39750

      var hash = Geohash.encode(lat, lng) // wx4g09njdr6

      var result = Geohash.decode(hash)

      expect(result[0]).to.equal(lat)
      expect(result[1]).to.equal(lng)
    })

    it('should obtain the same values for 4 decimals coordinates', function () {
      const Geohash = require('../geohash.js')
      var lat = 39.9088
      var lng = 116.3975

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(result[0]).to.equal(lat)
      expect(result[1]).to.equal(lng)
    })

    it('should obtain the same values for 3 decimals coordinates', function () {
      const Geohash = require('../geohash.js')
      var lat = 39.908
      var lng = 116.397

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(result[0]).to.equal(lat)
      expect(result[1]).to.equal(lng)
    })

    it('should obtain the same values for 2 decimals coordinates', function () {
      const Geohash = require('../geohash.js')
      var lat = 39.90
      var lng = 116.39

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(result[0]).to.equal(lat)
      expect(result[1]).to.equal(lng)
    })

    it('should obtain the same values for 1 decimals coordinates', function () {
      const Geohash = require('../geohash.js')
      var lat = 39.9
      var lng = 116.3

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(result[0]).to.equal(lat)
      expect(result[1]).to.equal(lng)
    })

    it('should obtain the same values for 0 decimals coordinates', function () {
      const Geohash = require('../geohash.js')
      var lat = 39
      var lng = 116

      var hash = Geohash.encode(lat, lng)

      var result = Geohash.decode(hash)

      expect(result[0]).to.equal(lat)
      expect(result[1]).to.equal(lng)
    })
  })

  describe('#geohash => [lat,lng] => geohash', function () {
    it('should obtain the same values for 12 length hash', function () {
      const Geohash = require('../geohash.js')
      var hash = '6gkzwgjzn820'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result).to.equal(hash)
    })

    it('should obtain the same values for 11 length hash', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g09njdr6'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result).to.equal(hash)
    })

    it('should obtain the same values for 10 length hash. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g09njdr'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 9 length hash', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g09njd'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result).to.equal(hash)
    })

    it('should obtain the same values for 8 length hash. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g09nj'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length - 1)).to.equal(hash.substring(0, hash.length - 1))
    })

    it('should obtain the same values for 7 length hash. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g09n'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length - 1)).to.equal(hash.substring(0, hash.length - 1))
    })

    it('should obtain the same values for 6 length hash. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g09'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 5 precision. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g0'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length - 2)).to.equal(hash.substring(0, hash.length - 2))
    })

    it('should obtain the same values for 4 precision. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4g'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length - 2)).to.equal(hash.substring(0, hash.length - 2))
    })

    it('should obtain the same values for 3 precision. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx4'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length)).to.equal(hash)
    })

    it('should obtain the same values for 2 precision. WARN!: Precision lost', function () {
      const Geohash = require('../geohash.js')
      var hash = 'wx'

      var latlng = Geohash.decode(hash)

      var result = Geohash.encode(latlng[0], latlng[1])

      expect(result.substring(0, hash.length)).to.equal(hash)
    })
  })
})
