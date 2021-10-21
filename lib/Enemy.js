const Potion = require("./Potion");

const Enemy = function (name, weapon) {
	this.name = name;
	this.weapon = weapon;
	this.potion = new Potion();

	this.health = Math.floor(Math.random() * 10 + 85);
	this.strength = Math.floor(Math.random() * 5 + 5);
	this.agility = Math.floor(Math.random() * 5 + 5);
};

// Enemy.prototype.getStats = function(){
//   return {
//     health = this.health,
//     strength = this.strength,
//     agility = this.agility,
//     potions = this.potions,

//   };
// }

Enemy.prototype.getHealth = function () {
	return `The ${this.name}'s health is now ${this.health}!`;
};

Enemy.prototype.isAlive = function () {
	if (this.health == 0) return false;
	else return true;
};

Enemy.prototype.getAttackValue = function () {
	const min = this.strength - 5;
	const max = this.strength + 5;
	return Math.floor(Math.random()) * (max - min) + min;
};

Enemy.prototype.reduceHealth = function (val) {
	this.health -= val;
	if (this.health < 0) this.health = 0;
};

Enemy.prototype.getDescription = function () {
	return `A ${this.name} holding a ${this.weapon} has appeared!`;
};

module.exports = Enemy;
