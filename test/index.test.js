/**
 *
 * @author    Jerry Bendy
 * @since     16/12/29
 * @copyright MicroBenefits
 */

require('../index');
var expect = require('chai').expect;

var PREFIX = global.partialSupportTest ? '[PARTIAL] ' : '[FULL] ';

function getSimpleObj () {
    return new URLSearchParams('a=1&b=2&c=3');
}


function getKeyRepeatObj () {
    return new URLSearchParams('id=xx&id=yy&id=zz&test=true');
}


describe(PREFIX + 'Constructor', function () {

    it('Construct with a search string', function () {
        var a = new URLSearchParams('?a=1&b=2');
        expect(a.toString()).to.be.equal('a=1&b=2');
    });

    it('Construct with a search string without "?"', function () {
        var a = new URLSearchParams('a=1&b=2');
        expect(a.toString()).to.be.equal('a=1&b=2');
    });

    it('Construct with an object', function () {
        var a = new URLSearchParams({
            a: 1,
            b: true,
            c: null,
            d: [],
            e: {f: "g"},
            f: "hello"
        });

        expect(a.toString()).to.be.equal('a=1&b=true&c=null&d=%5B%5D&e=%7B%22f%22%3A%22g%22%7D&f=hello');
    });

    it('Construct an empty object', function () {
        var a = new URLSearchParams();
        expect(a.toString()).to.be.equal('');
        a.append('a', 1);
        expect(a.toString()).to.be.equal('a=1');
    });

    it('Construct with another URLSearchParams object', function () {
        var obj = getSimpleObj();
        var b = new URLSearchParams(obj);
        expect(b.toString()).to.be.equal(obj.toString());
    });

    it('Construct with a key without value', function () {
        var a = new URLSearchParams('a&b&c');
        expect(a.get('a')).to.be.equal('');
        expect(a.toString()).to.be.equal('a=&b=&c=');
    });
});


describe(PREFIX + 'Append data', function () {

    it('Append data', function () {
        var a = getSimpleObj();
        a.append("id", 1);
        expect(a.toString()).to.be.equal('a=1&b=2&c=3&id=1');
    });

    it('Append data with repetitive key', function () {
        var a = getSimpleObj();
        a.append('id', 1);
        a.append('id', 2);
        expect(a.toString()).to.be.equal('a=1&b=2&c=3&id=1&id=2');
    });

});


describe(PREFIX + 'Get data', function () {

    it('Get simple data', function () {
        var a = getSimpleObj();
        expect(a.get('a')).to.be.equal('1');
    });

    it('Get a boolean data, should return string', function () {
        var a = new URLSearchParams('a=true');
        expect(a.get('a')).to.be.equal('true');
    });

    it('Get data which from append', function () {
        var a = getSimpleObj();
        a.append('id', 'xx');
        expect(a.get('id')).to.be.equal('xx');
    });

    it('Get data with repetitive key, should return the first one', function () {
        var a = getSimpleObj();
        a.append('id', 'xx');
        a.append('id', 'yy');
        expect(a.get('id')).to.be.equal('xx');
    });

    it('GetAll read simple data, should return an array', function () {
        var a = getSimpleObj();
        expect(a.getAll('a')).to.be.deep.equal(['1']);
    });

    it('GetAll construct with an array value', function () {
        var a = new URLSearchParams('a[]=x&a[]=y');
        expect(a.getAll('a[]')).to.be.deep.equal(['x', 'y']);
    });

    it('GetAll read data with repetitive key, should return all data with same key', function () {
        var a = getKeyRepeatObj();
        expect(a.getAll('id')).to.be.deep.equal(['xx', 'yy', 'zz']);
    });

});


describe(PREFIX + 'Delete data', function () {

    it('Remove simple data', function () {
        var a = getSimpleObj();
        a.delete('a');
        expect(a.toString()).to.be.equal('b=2&c=3');
    });

    it('Remove data with repetitive key', function () {
        var a = getKeyRepeatObj();
        a.delete('id');
        expect(a.toString()).to.be.equal('test=true');
    });

    it('Remove data which doesn\'t exists', function () {
        var a = getSimpleObj();
        a.delete('notExists');
        expect(a.toString()).to.be.equal('a=1&b=2&c=3');
    });
});


describe(PREFIX + 'Has check key exists', function () {

    it('Check the key exists', function () {
        var a = getSimpleObj();
        expect(a.has('a')).to.be.equal(true);
        expect(a.has('notExists')).to.be.equal(false);
    });

});


describe(PREFIX + 'Set data', function () {

    it('Set a new data', function () {
        var a = getSimpleObj();
        a.set('a', 'xx');
        expect(a.toString()).to.be.equal('a=xx&b=2&c=3');
    });

    it('Set a nonexistent key', function () {
        var a = getSimpleObj();
        a.set('id', 'xx');
        expect(a.toString()).to.be.equal('a=1&b=2&c=3&id=xx');
    });

});


describe(PREFIX + 'ForEach', function () {

    it('ForEach', function () {
        var a = getSimpleObj(),
            ret = {};

        a.forEach(function (item, name) {
            ret[name] = item;
        });

        expect(ret).to.be.deep.equal({
            a: '1',
            b: '2',
            c: '3'
        });
    });

});


describe(PREFIX + 'Iterator', function () {

    it('entries', function () {
        var obj = getSimpleObj(),
            ret = [];
        for (var p of obj.entries()) {
            ret.push(p[0] + ',' + p[1]);
        }
        expect(ret.join(';')).to.be.equal('a,1;b,2;c,3');
    });

    it('for...of', function () {
        var obj = getSimpleObj(),
            ret = [];
        for (var p of obj) {
            ret.push(p[0] + ',' + p[1]);
        }
        expect(ret.join(';')).to.be.equal('a,1;b,2;c,3');
    });

    it('keys', function () {
        var obj = getSimpleObj(),
            ret = [];
        for (var key of obj.keys()) {
            ret.push(key);
        }
        expect(ret.join(';')).to.be.equal('a;b;c');
    });

    it('values', function () {
        var obj = getSimpleObj(),
            ret = [];
        for (var value of obj.values()) {
            ret.push(value);
        }
        expect(ret.join(';')).to.be.equal('1;2;3');
    });

});


describe(PREFIX + 'Sort', function () {
    it ('Sort keys', function () {
        var obj = new URLSearchParams('q=flag&key=hello&s=world');
        obj.sort();
        expect(obj.toString()).to.be.equal('key=hello&q=flag&s=world');
    });
});


describe(PREFIX + 'Others', function () {

    var testObj = {
        a: '你好',
        b: '<script>',
        c: 'http://a.com/?c=7&d=8#!/asd',
        d: 'hello world',
        e: '+'
    };

    var testStr = 'a=%E4%BD%A0%E5%A5%BD&b=%3Cscript%3E&c=http%3A%2F%2Fa.com%2F%3Fc%3D7%26d%3D8%23%21%2Fasd&d=hello+world&e=%2B';

    it('URL encode', function () {
        var a = new URLSearchParams(testObj);
        expect(a.toString()).to.be.equal(testStr);
    });

    it('URL decode', function () {
        var a = new URLSearchParams(testStr);
        var ret = {};

        a.forEach(function (value, key) {
            ret[key] = value;
        });

        expect(ret).to.be.deep.equal(testObj);
    });

});