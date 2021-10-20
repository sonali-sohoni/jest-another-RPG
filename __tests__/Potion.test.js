const { TestWatcher } = require("@jest/core");
const Potion = require("../lib/Potion.js");
test("creates health potion object", () => {
	const potion = new Potion("health");
	expect(potion.name).toBe("health");
	expect(potion.value).toEqual(expect.any(Number));
});

test("creates random potion object", () => {
	const potion = new Potion(); //without arguments
	expect(potion.name).toEqual(expect.any(String));
	expect(potion.name.length).toBeGreaterThan(0);
	expect(potion.value).toEqual(expect.any(Number));
});
