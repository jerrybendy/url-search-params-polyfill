/**
 *
 * @author    Jerry Bendy
 * @since     6/20/2017
 * @copyright MicroBenefits
 */
/**
 * A simple implementation of URLSearchParams, simplified from the v1.2.0,
 * to simulate some browsers which are not have full supports of URLSearchParams
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */


(function(self) {
    'use strict';

    var __URLSearchParams__ = "__URLSearchParams__",
        prototype = URLSearchParams.prototype;

    /**
     * Make a URLSearchParams instance
     *
     * @param {object|string|URLSearchParams} search
     * @constructor
     */
    function URLSearchParams (search) {
        search = search || "";

        this [__URLSearchParams__] = {};

        // support construct object with another URLSearchParams instance
        if (search instanceof URLSearchParams) {
            search = search.toString();
        }

        if (typeof search === "object") {
            this.append(search.toString(), '');

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

    /**
     * Appends a specified key/value pair as a new search parameter.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.append = function(name, value) {
        var dict = this [__URLSearchParams__];
        if (name in dict) {
            dict[name].push('' + value);
        } else {
            dict[name] = ['' + value];
        }
    };

    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     *
     * @param {string} name
     */
    prototype.delete = function (name) {
        delete this [__URLSearchParams__] [name];
    };

    /**
     * Returns the first value associated to the given search parameter.
     *
     * @param {string} name
     * @returns {string|null}
     */
    prototype.get = function (name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict[name][0] : null;
    };

    /**
     * Returns all the values association with a given search parameter.
     *
     * @param {string} name
     * @returns {Array}
     */
    prototype.getAll = function (name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict [name].slice(0) : [];
    };

    /**
     * Returns a Boolean indicating if such a search parameter exists.
     *
     * @param {string} name
     * @returns {boolean}
     */
    prototype.has = function (name) {
        return name in this [__URLSearchParams__];
    };

    /**
     * Sets the value associated to a given search parameter to
     * the given value. If there were several values, delete the
     * others.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.set = function set(name, value) {
        this [__URLSearchParams__][name] = ['' + value];
    };


    /**
     * Returns a string containg a query string suitable for use in a URL.
     *
     * @returns {string}
     */
    prototype.toString = function () {
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

})(global);