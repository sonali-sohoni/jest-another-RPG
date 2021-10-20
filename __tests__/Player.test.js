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

test("Test getHealth() method", () => {
	const player = new Player("Dave");
	expect(player.getHealth()).toEqual(
		expect.stringContaining(player.health.toString())
	);
});

test("If player is alive", () => {
	const player = new Player();
	expect(player.isAlive()).toBeTruthy();
	player.health = 0;
	expect(player.isAlive()).toBeFalsy();
});

test("Test reduceHealth() function", () => {
	const player = new Player("Dave");
	const oldHealth = player.health;
	
	player.reduceHealth(5);
	expect(player.health).toBe(oldHealth - 5);
	player.reduceHealth(99999);
	expect(player.health).toBe(0);
});
