describe("jsx.js tests", function() {
	
	// Object extensions

	function identity(v) { return v; }
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
		expect("{0}{1}{2}".format(1, 2)).toBe("12");
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
	
	// Array extensions
	
	it("Array.clone", function() {
		var arr = [];
		expect(arr.clone()).not.toBe(arr);
		arr = [1, 2, 3];
		expect(arr.clone()).toEqual(arr);
	});
	
	it("Array.clear", function() {
		expect([1,2,3].clear().length).toEqual(0);
	});
	
	it("Array.first", function() {
		expect([1, 2, 3].first()).toBe(1);
		expect([1, 2, 3].first(function (x) { return x === 2; })).toBe(2);
		expect([1, 2, 3].first(function(x) { return x === 0; })).toBeUndefined();
		expect([].first()).toBeUndefined();
	});
	
	it("Array.last", function() {
		expect([1, 2, 3].last()).toBe(3);
		expect([1, 2, 3].last(function(x) { return x === 1; })).toBe(1);
		expect([1, 2, 3].last(function(x) { return x === 0; })).toBeUndefined();
		expect([].last()).toBeUndefined();
	});
	
	it("Array.peek", function() {
		expect([1, 2, 3].peek()).toBe(3);
		expect([].peek()).toBeUndefined();
	});
	
	it("Array.top", function() {
		expect([1, 2, 3].top()).toBe(3);
		expect([].top()).toBeUndefined();
	});
	
	it("Array.isEmpty", function() {
		expect([1, 2, 3].isEmpty()).toBeFalsy();
		expect([].isEmpty()).toBeTruthy();
	});
	
	it("Array.isNotEmpty", function() {
		expect([1, 2, 3].isNotEmpty()).toBeTruthy();
		expect([].isNotEmpty()).toBeFalsy();
	});
	
	it("Array.contains", function() {
		expect([1, 2, 3].contains(2)).toBeTruthy();
		expect([1, 2, 3].contains(0)).toBeFalsy();
	});
	
	it("Array.find", function() {
		expect([1, 2, 3].find(function(x) { return x === 2; })).toBe(2);
		expect([1, 2, 3].find(function(x) { return x === 0; })).toBeUndefined();
		expect([1, 2, 3].find(function(x) { return x === 0; }, null)).toBeUndefined();
	});
	
	it("Array.any", function() {
		expect([].any()).toBeFalsy();
		expect([1, 2, 3].any()).toBeTruthy();
		expect([1, 2, 3].any(function(x) { return x === 2; })).toBeTruthy();
		expect([1, 2, 3].any(function(x) { return x === 0; })).toBeFalsy();
		expect([1, 2, 3].any(function(x) { return x === 0; }, null)).toBeFalsy();
	});
	
	it("Array.all", function() {
		expect([].all()).toBeTruthy();
		expect([].all(identity)).toBeTruthy();
		expect([1, 2, 3].all(function (x) { return x > 0; })).toBeTruthy();
		expect([-1, 2, 3].all(function (x) { return x > 0; })).toBeFalsy();
		expect([-1, 2, 3].all(function (x) { return x > 0; }, null)).toBeFalsy();
	});

	it("Array.count", function() {
		expect([].count()).toBe(0);
		expect([].count(1)).toBe(0);
		expect([1, 1, 2].count(1)).toBe(2);
		expect([-1, 1, 2].count(function(x) { return x > 0; })).toBe(2);
		expect([-1, 1, 2].count(function(x) { return x > 0; }, null)).toBe(2);
	});

	it("Array.sum", function() {
		expect([].sum()).toBe(0);
		expect([1, 2, 3].sum()).toBe(6);
		expect([1, 2, 3].sum(function(x) { return x * x; })).toBe(14);
		expect([1, 2, 3].sum(function(x) { return x * x; }, null)).toBe(14);
	});
	
	it("Array.avg", function() {
		expect([].avg()).toBe(0);
		expect([1, 2, 3].avg()).toBe(2);
	});
});