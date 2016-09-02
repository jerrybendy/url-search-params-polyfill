# URLSearchParams polyfill

This is a simple polyfill library for javascript's URLSearchParams class.


## Installation

This can also be installed with `npm`.

```sh
$ npm install url-search-params-polyfill --save
```


For babel and es2015+, make sure to import the file:

```javascript
import 'url-search-params-polyfill';
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

### forEach

```javascript
search.forEach(function (item) {
  console.log(item);
});
```

## LICENSE

MIT license
