# geohash.js
"geohash" &lt;=> [lat,lng]

## Usage

```javascript

 var lat = 39.90882;
 var lng = 116.39750;

 var hash = Geohash.encode(lat, lng); // wx4g09njdr6

 var result = Geohash.decode(hash);

 result[0] === lat; // true
 result[1] === lng; // true
```

## Run test

Install the dependencies in the local node_modules folder:
```
$ npm intall
```

and run mocha test:
```
$ npm test
```
