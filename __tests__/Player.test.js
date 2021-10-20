const { TestWatcher } = require("@jest/core");
const Player = require("../lib/Player");
const Potion = require("../lib/Potion");

jest.mock("../lib/Potion.js");
console.log(new Potion());
test("Test the player object", () => {
	const player = new Player("Dave");
	expect(player.name).toBe("Dave");
	expect(player.health).toEqual(expect.any(Number));
	expect(player.agility).toEqual(expect.any(Number));
	expect(player.strength).toEqual(expect.any(Number));
	expect(player.inventory).toEqual(
		expect.arrayContaining([expect.any(Object)])
	);
});

test("Check getStats() method ", () => {
	const player = new Player("Dave");
	expect(player.getStats()).toHaveProperty("potions");
	expect(player.getStats()).toHaveProperty("strength");
	expect(player.getStats()).toHaveProperty("agility");
	expect(player.getStats()).toHaveProperty("health");
});

test("Get Inventory from player or return false", () => {
	const player = new Player("Dave");
	expect(player.getInventory()).toEqual(expect.any(Array));
	player.inventory = [];
	expect(player.getInventory()).toEqual(false);
});
