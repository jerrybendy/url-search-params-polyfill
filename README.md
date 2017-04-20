# URLSearchParams polyfill  [![](https://img.shields.io/npm/v/url-search-params-polyfill.svg)](https://www.npmjs.com/package/url-search-params-polyfill)

This is a polyfill library for javascript's URLSearchParams class. This library has implemented all features from [MDN document](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).


## Installation

This can also be installed with `npm`.

```sh
$ npm install url-search-params-polyfill --save
```


For babel and es2015+, make sure to import the file:

```javascript
import 'url-search-params-polyfill';
```

For es5:

```javascript
require('url-search-params-polyfill');
```

For browser, copy the `index.js` file to your project, and add a `script` tag in your html:

```html
<script src="index.js"></script>
```


## Usage

Use `URLSearchParams` directly. You can `new` an object from a string or an object.

```javascript
// new a empty object
var search1 = new URLSearchParams ();

// from a string
var search2 = new URLSearchParams ("id=1&from=home");

// from an object
var search3 = new URLSearchParams ({id: 1, from: "home"});

// from location.search, will remove first "?" automatically
var search4 = new URLSearchParams (window.location.search);

// from anther URLSearchParams object
var search5 = new URLSearchParams (search2);
```


### append

```javascript
var search = new URLSearchParams ();

search.append("id", 1);
```

### delete

```javascript
search.delete("id");
```

### get

```javascript
search.get("id");
```

### getAll

```javascript
search.getAll("id");
```

### has

```javascript
search.has("id");
```

### set 

```javascript
search.set("id", 2);
```

### toString

```javascript
search.toString();
```

### sort

```javascript
search.sort();
```

### forEach

```javascript
search.forEach(function (item) {
  console.log(item);
});
```

### keys

```javascript
for (var key of search.keys()) {
  console.log(key);
}
```

### values

```javascript
for (var value of search.values()){
  console.log(value);
}
```

### for...of

```javascript
for (var item of search) {
  console.log('key: ' + item[0] + ', ' + 'value: ' + item[1];
}
```


## LICENSE

MIT license


