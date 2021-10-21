const Potion = require("../Potion");

module.exports = function (name, weapon) {
	this.name = "Goblin";
	this.weapon = "sword";
	this.potion = new Potion("health");
	this.strength = 10;
	this.agility = 20;
	this.health = 30;
};
