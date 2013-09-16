describe("jsx.js tests", function() {
	
	// Object extensions

	function foo() { return "foo"; }
	
	it("Object.isObject", function() {
		var negative = [null, "test", true, 1];
		negative.forEach(function(v) {
			expect(Object.isObject(v)).toBe(false);
		});
		var positive = [{}, new Date(), foo];
		positive.forEach(function(v) {
			expect(Object.isObject(v)).toBe(true);
		});
	});
	
	it("Object.isFunction", function() {
		var negative = [null, "test", true, 1, {}, new Date()];
		negative.forEach(function(v) {
			expect(Object.isFunction(v)).toBe(false);
		});
		expect(Object.isFunction(foo)).toBe(true);
	});

	it("Object.isString", function() {
		var negative = [null, true, 1, {}, new Date(), foo];
		negative.forEach(function(v) {
			expect(Object.isString(v)).toBe(false);
		});
		expect(Object.isString("test")).toBe(true);
	});

	it("Object.isNumber", function() {
		var negative = [null, true, "test", {}, new Date(), foo];
		negative.forEach(function(v) {
			expect(Object.isNumber(v)).toBe(false);
		});
		expect(Object.isNumber(1)).toBe(true);
		expect(Object.isNumber(3.14)).toBe(true);
	});

	// Boolean extensions

	it("Boolean.toBoolean", function() {
		var t = [true, 1, "test", {}, new Date(), foo];
		t.forEach(function(v) {
			expect(Boolean.toBoolean(v)).toBe(true);
		});
		var f = [false, 0, null, ""];
		f.forEach(function(v) {
			expect(Boolean.toBoolean(v)).toBe(false);
		});
	});

	// Number extensions

	it("Number.isNumber", function() {
		var negative = [null, true, "test", {}, new Date(), foo];
		negative.forEach(function(v) {
			expect(Number.isNumber(v)).toBe(false);
		});
		expect(Number.isNumber(1)).toBe(true);
		expect(Number.isNumber(3.14)).toBe(true);
	});

	// String extensions

	it("String.isString", function() {
		var negative = [null, true, 1, {}, new Date(), foo];
		negative.forEach(function(v) {
			expect(String.isString(v)).toBe(false);
		});
		expect(String.isString("test")).toBe(true);
	});

	// Function extensions

	it("Function.isFunction", function() {
		var negative = [null, "test", true, 1, {}, new Date()];
		negative.forEach(function(v) {
			expect(Function.isFunction(v)).toBe(false);
		});
		expect(Function.isFunction(foo)).toBe(true);
	});
});