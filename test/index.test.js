/**
 *
 * @author    Jerry Bendy
 * @since     16/12/29
 * @copyright MicroBenefits
 */

require('../index');
var expect = require('chai').expect;


function getSimpleObj () {
    return new URLSearchParams('a=1&b=2&c=3');
}


function getKeyRepeatObj () {
    return new URLSearchParams('id=xx&id=yy&id=zz&test=true');
}


describe('构造函数', function () {

    it('通过 search 字符串构建', function () {
        var a = new URLSearchParams('?a=1&b=2');
        expect(a.toString()).to.be.equal('a=1&b=2');
    });

    it('通过不带问号的 search 字符串构建', function () {
        var a = new URLSearchParams('a=1&b=2');
        expect(a.toString()).to.be.equal('a=1&b=2');
    });

    it('使用对象构建', function () {
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

    it('创建空的对象', function () {
        var a = new URLSearchParams();
        expect(a.toString()).to.be.equal('');
        a.append('a', 1);
        expect(a.toString()).to.be.equal('a=1');
    });

    it('使用另一个 URLSearchParams 对象构造', function () {
        var obj = getSimpleObj();
        var b = new URLSearchParams(obj);
        expect(b.toString()).to.be.equal(obj.toString());
    });
});


describe('Append 插入数据', function () {

    it('Append 插入数据', function () {
        var a = getSimpleObj();
        a.append("id", 1);
        expect(a.toString()).to.be.equal('a=1&b=2&c=3&id=1');
    });

    it('Append 重复插入相同 key 的数据', function () {
        var a = getSimpleObj();
        a.append('id', 1);
        a.append('id', 2);
        expect(a.toString()).to.be.equal('a=1&b=2&c=3&id=1&id=2');
    });

});


describe('Get 读取数据', function () {

    it('读取简单数据', function () {
        var a = getSimpleObj();
        expect(a.get('a')).to.be.equal('1');
    });

    it('读取布尔值数据，要返回字符串', function () {
        var a = new URLSearchParams('a=true');
        expect(a.get('a')).to.be.equal('true');
    });

    it('读取 append 添加的数据', function () {
        var a = getSimpleObj();
        a.append('id', 'xx');
        expect(a.get('id')).to.be.equal('xx');
    });

    it('读取 key 重复的数据，应返回第一条的结果', function () {
        var a = getSimpleObj();
        a.append('id', 'xx');
        a.append('id', 'yy');
        expect(a.get('id')).to.be.equal('xx');
    });

    it('GetAll 读取简单数据，应返回数组', function () {
        var a = getSimpleObj();
        expect(a.getAll('a')).to.be.deep.equal(['1']);
    });

    it('GetAll 读取 key 重复的数据，应返回所有数据的数组', function () {
        var a = getKeyRepeatObj();
        expect(a.getAll('id')).to.be.deep.equal(['xx', 'yy', 'zz']);
    });

});


describe('Delete 删除数据', function () {

    it('删除简单数据', function () {
        var a = getSimpleObj();
        a.delete('a');
        expect(a.toString()).to.be.equal('b=2&c=3');
    });

    it('删除 key 重复的数据', function () {
        var a = getKeyRepeatObj();
        a.delete('id');
        expect(a.toString()).to.be.equal('test=true');
    });

    it('删除不存在的数据', function () {
        var a = getSimpleObj();
        a.delete('notExists');
        expect(a.toString()).to.be.equal('a=1&b=2&c=3');
    });
});


describe('Has 检查 key 是否存在', function () {

    it('检查 key 是否存在', function () {
        var a = getSimpleObj();
        expect(a.has('a')).to.be.equal(true);
        expect(a.has('notExists')).to.be.equal(false);
    });

});


describe('Set 设置值', function () {

    it('设置新值', function () {
        var a = getSimpleObj();
        a.set('a', 'xx');
        expect(a.toString()).to.be.equal('a=xx&b=2&c=3');
    });

    it('设置不存在的 key 值', function () {
        var a = getSimpleObj();
        a.set('id', 'xx');
        expect(a.toString()).to.be.equal('a=1&b=2&c=3&id=xx');
    });

});


describe('ForEach 循环遍历', function () {

    it('遍历', function () {
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


describe('Iterator 迭代器', function () {

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

describe('其它', function () {

    var testObj = {
        a: '你好',
        b: '<script>',
        c: 'http://a.com/?c=7&d=8#!/asd',
        d: 'hello world'
    };

    var testStr = 'a=%E4%BD%A0%E5%A5%BD&b=%3Cscript%3E&c=http%3A%2F%2Fa.com%2F%3Fc%3D7%26d%3D8%23%21%2Fasd&d=hello+world';

    it('URL 编码', function () {
        var a = new URLSearchParams(testObj);
        expect(a.toString()).to.be.equal(testStr);
    });

    it('URL 解码', function () {
        var a = new URLSearchParams(testStr);
        var ret = {};

        a.forEach(function (value, key) {
            ret[key] = value;
        });

        expect(ret).to.be.deep.equal(testObj);
    });

});