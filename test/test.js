var assert = require('assert');
var fs = require('fs');
var Config = require('../lib/config');

var debug = false;

function log(str) {
    if (debug) {
	console.log(str);
    }
}

describe('Config', function () {

    var path = "./config.json";
    var conf = new Config(path);
    var nojson = "./no.json";
    
    describe('#get()', function () {
	it('foo => bar', function () {
	    var key = "foo";
	    var val = conf.get(key);
	    assert.equal("bar", val);
	});

    	it('a.b.c.d => 999', function () {
	    var key = "a.b.c.d";
	    var val = conf.get(key);
	    assert.equal(999, val);
	});

    	it('x.y.z => undefined', function () {
	    var key = "x.y.z";
	    var val = conf.get(key);
	    assert.equal(undefined, val);
	});
    });

    describe('#put()', function () {
	it ('hoge => fuga', function () {
	    var key = "hoge",
		val = "fuga";
	    log(conf.toString());
	    assert.equal(undefined, conf.get(key));
	    conf.put(key, val);
	    assert.equal(val, conf.get(key));
	    log("--------");
	    log(conf.toString());
	});

    	it('x.y.z => undefined, then x.y.z = "XYZ"', function () {
	    var key = "x.y.z",
		val = "XYZ";
	   log(conf.toString());
	    assert.equal(undefined, conf.get(key));
	    conf.put(key, val);
	    assert.equal(val, conf.get(key));
	   log("--------");
	   log(conf.toString());
	});
    });

    describe('No config file exists.', function () {
	var config = new Config(nojson);
    });

    after(function () {
	fs.unlink(nojson);
    });
});
