describe("jsx.js tests", function() {
	
	// Object extensions
	
	it("Object.isObject", function() {
		expect(Object.isObject(null)).toBe(false);
		expect(Object.isObject("test")).toBe(false);
		expect(Object.isObject(true)).toBe(false);
		expect(Object.isObject(1)).toBe(false);
		expect(Object.isObject({})).toBe(true);
		expect(Object.isObject(new Date())).toBe(true);
		expect(Object.isObject(function() { return "test"; })).toBe(true);
	});
	
	it("Object.isFunction", function() {
		expect(Object.isFunction(null)).toBe(false);
		expect(Object.isFunction("test")).toBe(false);
		expect(Object.isFunction(true)).toBe(false);
		expect(Object.isFunction(1)).toBe(false);
		expect(Object.isFunction({})).toBe(false);
		expect(Object.isFunction(new Date())).toBe(false);
		expect(Object.isFunction(function() { return "test"; })).toBe(true);
	});

	it("Object.isString", function() {
		expect(Object.isString(null)).toBe(false);
		expect(Object.isString("test")).toBe(true);
		expect(Object.isString(true)).toBe(false);
		expect(Object.isString(1)).toBe(false);
		expect(Object.isString({})).toBe(false);
		expect(Object.isString(new Date())).toBe(false);
		expect(Object.isString(function() { return "test"; })).toBe(false);
	});
});