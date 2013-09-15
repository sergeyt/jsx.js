// JavaScript Extensions

(function() {

	function extend(proto, prop, value) {
		if (!proto[prop]) {
			Object.defineProperty(proto, prop,
				{
					value: value,
					writable: true,
					configurable: true,
					enumerable: false
				});
		}
	}

	// Object extensions

	extend(Object, "isObject", function(x) {
  		return typeof x === "object" || typeof x === 'function';
	});

	// Boolean extensions

	extend(Boolean, "toBoolean", function(x) {
  		return !!x;
	});

	// String extensions

	extend(String, "isString", function(x) {
  		return typeof x === "string";
	});
	
	//  Trims spaces from start and end of the string.
	extend(String.prototype, "trim", function() {
		return this.replace(/^\s+|\s+$/g, "");
	});
	
	// Provides simple string formatting in .NET style. Only simple textual replaces are supported.
	extend(String.prototype, "format", function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	});

	extend(String.prototype, "startsWith", function(str) {
		return this.indexOf(str, 0) === 0;
	});
	
	extend(String.prototype, "endsWith", function(str) {
		return this.indexOf(str, this.length - str.length) !== -1;
	});

	// Number extensions

	extend(Number, "isNumber", function(x) {
  		return typeof x === "number";
	});

	extend(Number, "toNumber", function(x) {
  		return +x;
	});

	extend(Number.prototype, "toInt", function() {
  		return this | 0;
	});

	extend(Number.prototype, "toUint", function() {
		var x = this;
  		x = x | 0;
  		return x < 0 ? (x + 4294967296) : x;
	});

	extend(Number.prototype, "setBitFlags", function(flag, value) {
  		return value ? this | flag : this & ~flag;
	});

	extend(Number.prototype, "getBitFlags", function(flag) {
  		return !!(this & flag);
	});

	// Function extensions

	extend(Function, "isFunction", function(x) {
  		return typeof x === "function";
	});
	
	// Array extensions

	extend(Array.prototype, "clone", function() {
		return this.slice(0);
	});

	extend(Array.prototype, "clear", function() {
		// TODO check, complete
		this.length = 0;
	});

	extend(Array.prototype, "first", function() {
		return this[0];
	});

	extend(Array.prototype, "last", function() {
		return this[this.length - 1];
	});

	extend(Array.prototype, "peek", function() {
		return this[this.length - 1];
	});

	extend(Array.prototype, "isEmpty", function() {
		return this.length === 0;
	});
	
	extend(Array.prototype, "isNotEmpty", function() {
		return this.length > 0;
	});

	extend(Array.prototype, "replace", function(x, y) {
		if (x === y) {
			return 0;
		}
		var count = 0;
		for (var i = 0; i < this.length; i++) {
			if (this[i] === x) {
				this[i] = y;
				count++;
			}
		}
		return count;
	});

	extend(Array.prototype, "contains", function(val) {
		return this.indexOf(val) >= 0;
	});

	extend(Array.prototype, "top", function() {
		return this.length && this[this.length - 1];
	});

	extend(Array.prototype, "map", function(fn) {
		var fnThis = arguments.length > 1 ? arguments[1] : null;
		var arr = [];
		for (var i = 0; i < this.length; i++) {
			arr.push(fn.call(fnThis, this[i], i, this));
		}
		return arr;
	});

	extend(Array.prototype, "filter", function(fn) {
		var fnThis = arguments.length > 1 ? arguments[1] : null;
		var arr = [];
		for (var i = 0; i < this.length; i++) {
			var val = this[i];
			if (fn.call(fnThis, val, i, this))
				arr.push(val);
		}
		return arr;
	});
	
	extend(Array.prototype, "findIndex", function(fn) {
		var fnThis = arguments.length > 1 ? arguments[1] : null;
		for (var i = 0; i < this.length; i++) {
			var val = this[i];
			if (fn.call(fnThis, val, i, this))
				return i;
		}
		return -1;
	});

	extend(Array.prototype, "find", function(fn) {
		var i = this.findIndex(fn, arguments.length > 1 ? arguments[1] : null);
		return i === -1 ? null : this[i];
	});

	extend(Array.prototype, "any", function(fn) {
		if (arguments.length == 0) return this.length > 0;
		return this.findIndex(fn, arguments.length > 1 ? arguments[1] : null) !== -1;
	});

	extend(Array.prototype, "all", function(fn) {
		var fnThis = arguments.length > 1 ? arguments[1] : null;
		for (var i = 0; i < this.length; i++) {
			var val = this[i];
			if (!fn.call(fnThis, val, i, this))
				return false;
		}
		return true;
	});

	extend(Array.prototype, "count", function(x) {
		var count = 0, i;
		if (typeof x === "function") {
			var fnThis = arguments.length > 1 ? arguments[1] : null;
			for (i = 0; i < this.length; i++) {
				var val = this[i];
				if (x.call(fnThis, val, i, this)) {
					count++;
				}
			}
		} else {
			for (i = 0; i < this.length; i++) {
				if (this[i] === x) {
					count++;
				}
			}
		}
		return count;
	});

	extend(Array.prototype, "aggregate", function(val, fn) {
		var fnThis = arguments.length > 2 ? arguments[2] : null;
		for (var i = 0; i < this.length; i++) {
			var vi = this[i];
			val = fn.call(fnThis, val, vi, i, this);
		}
		return val;
	});

	extend(Array.prototype, "sum", function() {
		if (arguments.length > 0) {
			// selector support
			var that = this;
			var fn = arguments[0];
			var fnThis = arguments.length > 1 ? arguments[1] : null;
			return this.aggregate(0, function(cur, val, i) {
				return cur + fn.call(fnThis, val, i, that);
			});
		}
		return this.aggregate(0, function(cur, val) {
			return cur + val;
		});
	});

	extend(Array.prototype, "avg", function() {
		var a = this.aggregate({sum: 0, count: 0}, function(cur, val) {
			return {sum:cur.sum + val, count:cur.count+1};
		});
		return a.count === 0 ? 0 : a.sum / a.count;
	});
})();

// Function.name extension
(function functionNameSupport() {
  /*jshint -W061 */
  if (eval("function t() {} t.name === 't'")) {
    return; // function name feature is supported
  }
  Object.defineProperty(Function.prototype, 'name', {
    get: function () {
      if (this.__name) {
        return this.__name;
      }
      var m = /function\s([^\(]+)/.exec(this.toString());
      var name = m && m[1] !== 'anonymous' ? m[1] : null;
      this.__name = name;
      return name;
    },
    configurable: true,
    enumerable: false
  });
})();

// TODO move to Base64 namespace
// Base64
// https://gist.github.com/958841
function base64ArrayBuffer(arrayBuffer) {
  var base64 = '';
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  var bytes = new Uint8Array(arrayBuffer);
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;

  var a, b, c, d;
  var chunk;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
    d = chunk & 63; // 63 = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];

    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3 = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '==';
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4; // 1008 = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15 = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }
  return base64;
}
