"use strict";

var fs = require('fs');

var Utils = {
    createBlank: function (path) {
	fs.writeFileSync(path, "{}");
    },
    
    read: function (path) {
	var data = fs.readFileSync(path),
	    json;
	json = JSON.parse(data);
	return json;
    },

    stringify: function (json) {
	return JSON.stringify(json, null, "    ");
    },
    
    write: function (conf, path, callback) {
	var data = Utils.stringify(conf);
	fs.writeFile(path, data, (err) => {
	    if (callback) {
		callback(err);
	    }
	});
    }
};

var Config = function (path) {
    this.sep = "\.";
    this.path = path;
    try {
	this.conf = Utils.read(path);
    } catch (e) {
	Utils.createBlank(path);
	this.conf = Utils.read(path);
    }
};

Config.prototype.get = function (key) {
    var json = this.conf,
	elements = key.split(this.sep),
	exist = true;
    if (!elements) {
	return undefined;
    }
    elements.forEach(function (element) {
	if (!json) {
	    exist = false;
	    return false;
	}
	json = json[element];
    });
    if (!exist) {
	return undefined;
    }
    return json;
};

Config.prototype.put = function (key, value) {
    var elements = key.split(this.sep),
	json = this.conf,
	last;
    if (!elements) {
	return false;
    }
    last = elements.pop();
    elements.forEach(function (element) {
	var obj = json[element];
	if (!obj) {
	    obj = {};
	    json[element] = obj;
	}
	json = json[element];
    });
    json[last] = value;
    return true;
};

Config.prototype.remove = function (key) {
    var elements = key.split(this.sep),
	json = this.conf,
        last;
    if (!elements) {
	return false;
    }
    last = elements.pop();
    elements.forEach(function (element) {
	var obj = json[element];
	if (!obj) {
	    obj = {};
	    json[element] = obj;
	}
	json = json[element];
    });
    delete json[last];
    return true;
};

Config.prototype.save = function () {
    Utils.write(this.conf, this.path);
};

Config.prototype.toString = function () {
    return Utils.stringify(this.conf);
};

module.exports = Config;
