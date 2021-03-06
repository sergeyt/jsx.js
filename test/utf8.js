﻿// UTF8 tests based on https://github.com/davidflanagan/ArrayBufferUTF8/blob/master/ArrayBufferUTF8Test.html
describe("utf8", function() {

	var buf = new ArrayBuffer(4 * 17 * 65536);

	it("basic", function() {

		function test(msg) {
			var len = buf.writeUTF8(msg);
			var result = buf.toString(0, len);
			expect(result).toEqual(msg);
		}

		test("");
		test("This is a test; only a test!");
		test("character '¢' = code point U+00A2");
		test("character '€' = code point U+20AC");
		test("character '𤭢' = code point U+024B62");
	});

	it("A mixed ascii and non-ascii string", function() {
		// This is from the Node.js test suite: 
		// A mixed ascii and non-ascii string
		// Test stolen from deps/v8/test/cctest/test-strings.cc
		// U+02E4 -> CB A4
		// U+0064 -> 64
		// U+12E4 -> E1 8B A4
		// U+0030 -> 30
		// U+3045 -> E3 81 85
		var chars = '\u02e4\u0064\u12e4\u0030\u3045';
		var bytes = new Uint8Array([0xCB, 0xA4, 0x64, 0xE1, 0x8B, 0xA4, 0x30, 0xE3, 0x81, 0x85]);

		var len = buf.writeUTF8(chars);
		var encodedchars = new Uint8Array(buf, 0, len);
		var decodedbytes = bytes.buffer.toString();

		expect(decodedbytes).toEqual(chars);
		// expect(encodedchars).toEqual(bytes);

		for (var i = 0; i < bytes.length; i++) {
			expect(encodedchars[i]).toEqual(bytes[i]);
		}
	});

	xit("all chars", function() {
		var i;
		var codepoints = [];
		for (var cp = 0; cp <= 0xFFFF; cp++) {
			if (cp >= 0xD800 && cp <= 0xDFFF) continue;
			codepoints.push(cp);
		}
		var allchars = String.fromCharCode.apply(String, codepoints);

		for (var s1 = 0xD800; s1 <= 0xDBFF; s1++) {
			codepoints = [];
			for (var s2 = 0xDC00; s2 <= 0xDFFF; s2++) {
				codepoints.push(s1);
				codepoints.push(s2);
			}
			allchars += String.fromCharCode.apply(String, codepoints);
		}

		//----------------------------------------------------------------------
		// These functions are from
		// http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
		// Note that they use binary strings

		function encode_utf8(s) {
			return unescape(encodeURIComponent(s));
		}


		function decode_utf8(s) {
			return decodeURIComponent(escape(s));
		}

		var binary_encoded_allchars = encode_utf8(allchars);
		var s = decode_utf8(binary_encoded_allchars);

		if (s === allchars) console.log("round-tripped with encode_utf8");
		console.log("encoded to # bytes", binary_encoded_allchars.length);

		// ----------------------------------------------------------------------

		var len = buf.writeUTF8(allchars);
		var result = buf.toString(0, len);
		console.log(allchars.length, len, result.length, result === allchars);

		var encodedbytes = new Uint8Array(buf, 0, len);
		for (i = 0; i < len; i++) {
			if (encodedbytes[i] !== binary_encoded_allchars.charCodeAt(i)) {
				console.log("bytes differ at index", i, encodedbytes[i], binary_encoded_allchars.charCodeAt(i));
				break;
			}
		}

		//		console.log("encoding and decoding all unicode chars 10 times");
		//		var start = Date.now();
		//		for (i = 0; i < 10; i++) {
		//			len = buf.writeUTF8(allchars);
		//			result = buf.toString(0, len);
		//		}
		//		var end = Date.now();
		//		console.log("Elapsed time (s): ", (end - start) / 1000);
	});

	var longAscii = "abcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < 10; i++) {
		longAscii = longAscii + longAscii;
	}

	it("long ASCII", function() {
		var len = buf.writeUTF8(longAscii);
		var result = buf.toString(0, len);
		expect(result).toEqual(longAscii);
	});

	xit("perf", function() {
		console.log("encoding and decoding a long ascii string 100 times");
		var start = new Date();
		for (i = 0; i < 100; i++) {
			len = buf.writeUTF8(longAscii);
			result = buf.toString(0, len);
		}
		var end = new Date();
		console.log("Elapsed time (s): ", (end - start) / 1000);
	});
});