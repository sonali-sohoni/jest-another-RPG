const Potion = require("./Potion");
const Character = require("./Character");

class Enemy extends Character {
	constructor(name, weapon) {
		super(name);
		// this.name = name;
		this.weapon = weapon;
		this.potions = new Potion();

		// this.health = Math.floor(Math.random() * 10 + 85);
		// this.strength = Math.floor(Math.random() * 5 + 5);
		// this.agility = Math.floor(Math.random() * 5 + 5);
	}

	getStats() {
		return {
			health: this.health,
			strength: this.strength,
			agility: this.agility,
			potions: this.potions,
		};
	}

	getDescription() {
		return `A ${this.name} holding a ${this.weapon} has appeared!`;
	}
}

module.exports = Enemy;
