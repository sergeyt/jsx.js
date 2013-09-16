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

	it("Number.toNumber", function() {
		expect(Number.toNumber(3.14)).toBe(3.14);
		expect(Number.toNumber("3.14")).toBe(3.14);
		expect(Number.toNumber(true)).toBe(1);
		expect(Number.toNumber(false)).toBe(0);
		expect(Number.toNumber(null)).toBe(0);
	});

	// String extensions

	it("String.isString", function() {
		var negative = [null, true, 1, {}, new Date(), foo];
		negative.forEach(function(v) {
			expect(String.isString(v)).toBe(false);
		});
		expect(String.isString("test")).toBe(true);
	});

	it("String.trim", function() {
		expect(" test ".trim()).toBe("test");
		expect("\ttest\t".trim()).toBe("test");
		expect("\ntest\n".trim()).toBe("test");
		expect("\rtest\r".trim()).toBe("test");
		expect("\ftest\f".trim()).toBe("test");
		expect("".trim()).toBe("");
	});

	it("String.format", function() {
		expect("{0}{1}".format(1, 2)).toBe("12");
		// TODO check brace escaping
	});

	it("String.startsWith", function() {
		expect("ab".startsWith("a")).toBe(true);
		expect("a".startsWith("a")).toBe(true);
		expect("a".startsWith("")).toBe(true);
		expect("_a".startsWith("a")).toBe(false);
	});

	it("String.endsWith", function() {
		expect("ab".endsWith("b")).toBe(true);
		expect("a".endsWith("a")).toBe(true);
		expect("a".endsWith("")).toBe(true);
		expect("a_".endsWith("a")).toBe(false);
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