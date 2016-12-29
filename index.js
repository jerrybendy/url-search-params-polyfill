/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */


(function(self) {
    'use strict';

    if (self.URLSearchParams) {
        return;
    }


    var __URLSearchParams__ = "__URLSearchParams__";


    function URLSearchParams (search) {
        search = search || "";

        this [__URLSearchParams__] = {};

        if (typeof search === "object") {
            for (var i in search) {
                if (search.hasOwnProperty(i)) {
                    var str = typeof search [i] === 'string' ? search [i] : JSON.stringify(search [i]);
                    this.append(i, str);
                }
            }

        } else {

            // remove first '?'
            if (search.indexOf("?") === 0) {
                search = search.slice(1);
            }

            var pairs = search.split("&");
            for (var j = 0; j < pairs.length; j ++) {
                var value = pairs [j],
                    index = value.indexOf('=');

                if (-1 < index) {
                    this.append(
                        decode(value.slice(0, index)),
                        decode(value.slice(index + 1))
                    );
                }
            }
        }

    }


    URLSearchParams.prototype.append = function(name, value) {
        var dict = this [__URLSearchParams__];
        if (name in dict) {
            dict[name].push('' + value);
        } else {
            dict[name] = ['' + value];
        }
    };

    URLSearchParams.prototype.delete = function (name) {
        delete this [__URLSearchParams__] [name];
    };

    URLSearchParams.prototype.get = function (name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict[name][0] : null;
    };

    URLSearchParams.prototype.getAll = function (name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict [name].slice(0) : [];
    };

    URLSearchParams.prototype.has = function (name) {
        return name in this [__URLSearchParams__];
    };

    URLSearchParams.prototype.set = function set(name, value) {
        this [__URLSearchParams__][name] = ['' + value];
    };

    URLSearchParams.prototype.forEach = function (callback, thisArg) {
        var dict = this [__URLSearchParams__];
        Object.getOwnPropertyNames(dict).forEach(function(name) {
            dict[name].forEach(function(value) {
                callback.call(thisArg, value, name, this);
            }, this);
        }, this);
    };

    URLSearchParams.prototype.toString = function () {
        var dict = this[__URLSearchParams__], query = [], i, key, name, value;
        for (key in dict) {
            name = encode(key);
            for (i = 0, value = dict[key]; i < value.length; i++) {
                query.push(name + '=' + encode(value[i]));
            }
        }
        return query.join('&');
    };


    function encode(str) {
        var replace = {
            '!': '%21',
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '\x00'
        };
        return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function (match) {
            return replace[match];
        });
    }

    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    }



    self.URLSearchParams = URLSearchParams;

    self.URLSearchParams.polyfill = true;


})(typeof self !== 'undefined' ? self : this);
