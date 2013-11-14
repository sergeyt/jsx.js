// JavaScript extensions

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
		return x !== null && (typeof x === "object" || typeof x === 'function');
	});

	extend(Object, "isFunction", function(x) {
		return typeof x === "function";
	});

	extend(Object, "isString", function(x) {
		return typeof x === "string";
	});

	extend(Object, "isNumber", function(x) {
		return typeof x === "number";
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
			return typeof args[number] != 'undefined' ? args[number] : "";
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

	extend(Number.prototype, "toUInt", function() {
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

	// Function.name extension
	(function functionNameSupport() {
		/*jshint -W061 */
		if (eval("function t() {} t.name === 't'")) {
			return; // function name feature is supported
		}
		Object.defineProperty(Function.prototype, 'name', {
			get: function() {
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

	// Array extensions

	extend(Array.prototype, "clone", function() {
		return this.slice(0);
	});

	extend(Array.prototype, "clear", function() {
		this.length = 0;
		return this;
	});

	extend(Array.prototype, "first", function() {
		if (arguments.length > 0 && typeof arguments[0] == "function") {
			var i = this.findIndex.apply(this, Array.prototype.slice.call(arguments, 0));
			return i >= 0 ? this[i] : undefined;
		}
		return this[0];
	});

	extend(Array.prototype, "last", function() {
		if (arguments.length > 0 && typeof arguments[0] == "function") {
			var i = this.findLastIndex.apply(this, Array.prototype.slice.call(arguments, 0));
			return i >= 0 ? this[i] : undefined;
		}
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

	extend(Array.prototype, "contains", function(val) {
		return this.indexOf(val) >= 0;
	});

	extend(Array.prototype, "top", function() {
		return this[this.length - 1];
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
	
	extend(Array.prototype, "findLastIndex", function(fn) {
		var fnThis = arguments.length > 1 ? arguments[1] : null;
		for (var i = this.length - 1; i >= 0; i--) {
			var val = this[i];
			if (fn.call(fnThis, val, i, this))
				return i;
		}
		return -1;
	});

	extend(Array.prototype, "find", function(fn) {
		var i = this.findIndex(fn, arguments.length > 1 ? arguments[1] : null);
		return i === -1 ? undefined : this[i];
	});

	extend(Array.prototype, "any", function(fn) {
		if (this.length === 0) return false;
		if (arguments.length === 0) return this.length > 0;
		return this.findIndex(fn, arguments.length > 1 ? arguments[1] : null) !== -1;
	});

	extend(Array.prototype, "all", function(fn) {
		if (this.length === 0) return true;
		var fnThis = arguments.length > 1 ? arguments[1] : null;
		for (var i = 0; i < this.length; i++) {
			var val = this[i];
			if (!fn.call(fnThis, val, i, this))
				return false;
		}
		return true;
	});

	extend(Array.prototype, "take", function(count) {
		var result = [];
		for (var i = 0; i < this.length && i < count; i++) {
			result.push(this[i]);
		}
		return result;
	});

	extend(Array.prototype, "skip", function(count) {
		if (this.length === 0) return [];
		var result = [];
		var i = 0;
		while (i < count && i < this.length)
			i++;
		while (i < this.length) {
			result.push(this[i++]);
		}
		return result;
	});
	
	// aggregates

	extend(Array.prototype, "count", function(x) {
		if (this.length === 0) return 0;
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
		var a = this.aggregate({ sum: 0, count: 0 }, function(cur, val) {
			return { sum: cur.sum + val, count: cur.count + 1 };
		});
		return a.count === 0 ? 0 : a.sum / a.count;
	});

	// UTF8

	// Uint8Array extensions
	if (Uint8Array) {

		// UTF8 based on https://github.com/davidflanagan/ArrayBufferUTF8

		// Encodes given string with UTF8
		extend(Uint8Array.prototype, "writeUTF8", function(s, start) {

			function fail(msg) { throw new Error(msg); }

			if (arguments.length < 2) start = 0;

			var i = 0; // character index in the string s;
			var b = start; // byte index in this array

			for (i = 0; i < s.length; i++) {
				var c = s.charCodeAt(i);

				if (c <= 0x7F) { // One byte of UTF-8
					if (b >= this.length) fail("Buffer overflow");
					this[b++] = c;
				} else if (c <= 0x7FF) { // Two this of UTF-8
					if (b + 1 >= this.length) fail("Buffer overflow");
					this[b++] = 0xC0 | ((c & 0x7C0) >>> 6);
					this[b++] = 0x80 | (c & 0x3F);
				} else if (c <= 0xD7FF || (c >= 0xE000 && c <= 0xFFFF)) {
					// Three this of UTF-8.  Source character is not
					// a UTF-16 surrogate
					if (b + 2 >= this.length) fail("Buffer overflow");
					this[b++] = 0xE0 | ((c & 0xF000) >>> 12);
					this[b++] = 0x80 | ((c & 0x0FC0) >>> 6);
					this[b++] = 0x80 | (c & 0x3f);
				} else {
					if (b + 3 >= this.length) fail("Buffer overflow");
					if (i == s.length - 1) fail("Unpaired surrogate");
					var d = s.charCodeAt(++i);
					if (c < 0xD800 || c > 0xDBFF || d < 0xDC00 || d > 0xDFFF) {
						console.log(i - 2, c.toString(16), d.toString(16));
						fail("Unpaired surrogate");
					}

					var cp = ((c & 0x03FF) << 10) + (d & 0x03FF) + 0x10000;

					this[b++] = 0xF0 | ((cp & 0x1C0000) >>> 18);
					this[b++] = 0x80 | ((cp & 0x03F000) >>> 12);
					this[b++] = 0x80 | ((cp & 0x000FC0) >>> 6);
					this[b++] = 0x80 | (cp & 0x3f);
				}
			}
			return b; // Return # of bytes written
		});

		// Decodes UTF8 string.
		Uint8Array.prototype.toString = function(start, end) {

			function fail() { throw new Error("Illegal UTF-8"); }

			if (arguments.length === 0) start = 0;
			if (arguments.length < 2) end = this.length;

			var bytes = this;
			// At most we'll have one character per byte
			var charcodes = [];

			// the fromCharCode hack didn't work in chrome
			//    var charcodes = new Uint32Array(bytes.length);

			var i = start, c = 0; // Indexes into bytes[] and charcodes[]
			var b1, b2, b3, b4; // Up to 4 bytes

			// See http://en.wikipedia.org/wiki/UTF-8
			while (i < end) {
				b1 = bytes[i];
				if (b1 < 128) {
					charcodes[c++] = b1;
					i += 1;
				} else if (b1 < 194) {
					// unexpected continuation character...
					fail();
				} else if (b1 < 224) {
					// 2-byte sequence
					if (i + 1 >= bytes.length) fail();
					b2 = bytes[i + 1];
					if (b2 < 128 || b2 > 191) fail();
					charcodes[c++] = ((b1 & 0x1f) << 6) + (b2 & 0x3f);
					i += 2;
				} else if (b1 < 240) {
					// 3-byte sequence
					if (i + 2 >= bytes.length) fail();
					b2 = bytes[i + 1];
					if (b2 < 128 || b2 > 191) fail();
					b3 = bytes[i + 2];
					if (b3 < 128 || b3 > 191) fail();
					charcodes[c++] = ((b1 & 0x0f) << 12) +
						((b2 & 0x3f) << 6) + (b3 & 0x3f);
					i += 3;
				} else if (b1 < 245) {
					// 4-byte sequence
					if (i + 3 >= bytes.length) fail();
					b2 = bytes[i + 1];
					if (b2 < 128 || b2 > 191) fail();
					b3 = bytes[i + 2];
					if (b3 < 128 || b3 > 191) fail();
					b4 = bytes[i + 3];
					if (b4 < 128 || b4 > 191) fail();
					var cp = ((b1 & 0x07) << 18) + ((b2 & 0x3f) << 12) +
						((b3 & 0x3f) << 6) + (b4 & 0x3f);
					cp -= 0x10000;

					// Now turn this code point into two surrogate pairs
					charcodes[c++] = 0xd800 + ((cp & 0x0FFC00) >>> 10);
					charcodes[c++] = 0xdc00 + (cp & 0x0003FF);

					i += 4;
				} else {
					// Illegal byte
					fail();
				}
			}
			if (charcodes.length < 65536)
				return String.fromCharCode.apply(String, charcodes);
			else {
				var chunks = [];
				start = 0, end = 65536;
				while (start < charcodes.length) {
					var slice = charcodes.slice(start, end);
					chunks.push(String.fromCharCode.apply(String, slice));
					start = end;
					end = end + 65536;
					if (end > charcodes.length) end = charcodes.length;
				}
				return chunks.join("");
			}
		};
	}

	// ArrayBuffer extensions

	if (ArrayBuffer && Uint8Array) {

		// Encodes string with UTF8
		extend(ArrayBuffer.prototype, "writeUTF8", function(s, start) {
			if (arguments.length < 2) start = 0;
			var bytes = new Uint8Array(this);
			return bytes.writeUTF8(s, start);
		});

		// Decodes UTF8 string
		ArrayBuffer.prototype.toString = function(start, end) {
			if (arguments.length === 0) start = 0;
			if (arguments.length < 2) end = this.byteLength;
			var bytes = new Uint8Array(this, start, end - start);
			return bytes.toString();
		};
	}

})();
