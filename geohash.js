/**
 # Geohash Module
 * Algorithm reference from http://eleme.io/geohash/
 * Coding by YanagiEiichi@web-tinker.com
 # LICENSE: MIT
 # LASTEDT: 2015-01-06
 # GIT: https://github.com/YanagiEiichi/geohash.js/blob/master/geohash.js 
 # BOWSER: 
 # USAGE:

     var lat = 39.90882;
     var lng = 116.39750;
     var hash = Geohash.encode(lat, lng); // wx4g09njdr6
     var result = Geohash.decode(hash);
     result[0] === lat; // true
     result[1] === lng; // true

 *
**/

// Abstract class Geohash
var Geohash = new function() {

  // Private methods and properties
  var round = Math.round;
  var max = Math.max;
  var pow = Math.pow;
  var log = Math.log;
  var table = '0123456789bcdefghjkmnpqrstuvwxyz';
  var isGeohash = new RegExp('^[' + table + ']+$');

  // Private classes
  var Rect = function() {};
  Rect.prototype = {
    minlat: -90, maxlat: 90, minlng: -180, maxlng: 180,
    halfLat: function(){ return (this.minlat + this.maxlat) / 2; },
    halfLng: function(){ return (this.minlng + this.maxlng) / 2; }
  };

  // Public methods
  this.encode = function(lat, lng) {
    // Override 
    if(lat instanceof Array && lng == null) {
      lng = lat[1];
      lat = lat[0];
    }
 
    // Type checker
    lat *= 1;
    lng *= 1;
    if(lat !== lat) throw new Error('Geohash.encode: lat must be a Number');
    if(lng !== lng) throw new Error('Geohash.encode: lng must be a Number');
  
    // Compute precision
    var lap = lat.toString().length - lat.toFixed().length - 2;
    var lop = lng.toString().length - lat.toFixed().length - 2;
    var prec = pow(10, -max(lap, lop, 0)) / 2;
     
    // Initialize variables
    var rect = new Rect();
    var result = [];
    var edge = 180;
    var even = true;
    var chr = 0;
    var bit = 4;
    var next;
    var last;

    // Main loop
    while(edge >= prec) {
      if(even) {
        next = rect.halfLng();
        if(lng > next) {
          chr |= 1 << bit;
          rect.minlng = next;
        } else {
          rect.maxlng = next;
        }
      } else {
        next = rect.halfLat();
        if(lat > next) {
          chr |= 1 << bit;
          rect.minlat = next;
        } else {
          rect.maxlat = next;
        }
      }
      even = !even;
      if(bit) {
        bit--;
      } else {
        last = edge;
        edge = max(rect.maxlng - rect.minlng, rect.maxlat - rect.minlat);
        if(last === edge) break;
        result.push(table[chr]);
        bit = 4;
        chr = 0;
      }
    }
    return result.join('');
  };

  this.decode = function(hash) {

    // Type Checker
    if(!isGeohash.test(hash)) throw new Error('Geohash.decode: hash must be a geohash string');

    // Initialize all veriables 
    var rect = new Rect();
    var latE = 90;
    var lngE = 180;

    // Abstract shink operation
    var shink = function(bit, value, even) {
      var bin = 1 << bit;
      if( !(bit & 1) ^ !(even & 1) ) {
        if(bin & value) { 
          rect.minlat = rect.halfLat();
        } else {
          rect.maxlat = rect.halfLat();
        }
      } else {
        if(bin & value) {
          rect.minlng = rect.halfLng();
        } else {
          rect.maxlng = rect.halfLng();
        }
      }
    };

    // Main loop
    for (var i = 0,c = hash.length; i < c; i++) {
      var value = table.indexOf(hash[i]);
      var even = i & 1;
      for(var bit = 4; bit >= 0; bit--) shink(bit, value, even);
      if(even) {
        latE /= 8;
        lngE /= 4;
      } else {
        latE /= 4;
        lngE /= 8;
      }
    }

    // Compute lat/lng and return a round data
    var pLat = pow(10, max(1, -round( log(latE) / log(10) )) - 1);
    var pLng = pow(10, max(1, -round( log(lngE) / log(10) )) - 1);
    return [
      round(rect.halfLat() * pLat) / pLat,
      round(rect.halfLng() * pLng) / pLng
    ];
  };
};


// CMD support
if(typeof module === 'object') module.exports = Geohash;
