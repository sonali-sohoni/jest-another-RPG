const Potion = require("./Potion");
const Player = function (name = "") {
	this.name = name;
	this.health = Math.floor(Math.random() * 10 + 95);
	this.strength = Math.floor(Math.random() * 5 + 7);
	this.agility = Math.floor(Math.random() * 5 + 7);
	this.inventory = [new Potion("health"), new Potion()];
};

Player.prototype.getStats = function () {
	return {
		potions: this.inventory.length,
		health: this.health,
		agility: this.agility,
		strength: this.strength,
	};
};

Player.prototype.getInventory = function () {
	if (this.inventory.length) return this.inventory;
	else return false;
};
module.exports = Player;
