const { TestWatcher } = require("@jest/core");
const Enemy = require("../lib/Enemy");
const Potion = require("../lib/Potion");
jest.mock("../lib/Potion");
console.log(new Potion());

test("Enemy object", () => {
	const enemy = new Enemy("Goblin", "sword");
	expect(enemy.name).toBe("Goblin");
	expect(enemy.weapon).toBe("sword");
	expect(enemy.health).toEqual(expect.any(Number));
	expect(enemy.strength).toEqual(expect.any(Number));
	expect(enemy.agility).toEqual(expect.any(Number));
	expect(enemy.potions).toEqual(expect.any(Object));
});

test("gets enemy's health value", () => {
	const enemy = new Enemy("Goblin", "sword");

	expect(enemy.getHealth()).toEqual(
		expect.stringContaining(enemy.health.toString())
	);
});

test("if Enemy is alive", () => {
	const enemy = new Enemy("Goblin", "sword");
	expect(enemy.isAlive()).toBeTruthy();
	enemy.health = 0;
	expect(enemy.isAlive()).toBeFalsy();
});

test("get Enemy's attack value", () => {
	const enemy = new Enemy("Goblin", "sword");
	enemy.strength = 10;
	expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
	expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test("test reduceHealth() function", () => {
	const enemy = new Enemy("Goblin", "sword");
	const oldHealth = enemy.health;
	enemy.reduceHealth(5);
	expect(enemy.health).toBe(oldHealth - 5);
	enemy.reduceHealth(99999);
	expect(enemy.health).toBe(0);
});

test("get a description of the enemy", () => {
	const enemy = new Enemy("Goblin", "sword");
	expect(enemy.getDescription()).toEqual(expect.stringContaining("Goblin"));
	expect(enemy.getDescription()).toEqual(expect.stringContaining("sword"));
});
