const Player = require("./Player");
const Enemy = require("./Enemy");
const inquirer = require("inquirer");

const Game = function () {
	this.roundNumber = 0;
	this.isPlayerTurn = false;
	this.enemies = [];
	this.currentEnemy;
	this.player;
};

Game.prototype.initializeGame = function () {
	this.enemies.push(new Enemy("goblin", "sword"));
	this.enemies.push(new Enemy("orc", "baseball bat"));
	this.enemies.push(new Enemy("skeleton", "axe"));
	this.currentEnemy = this.enemies[0];

	inquirer
		.prompt([
			{
				typee: "input",
				name: "name",
				message: "What is your name?",
			},
		])
		.then(({ name }) => {
			this.player = new Player(name);
			//test the object creation
			console.log(this.player, this.currentEnemy);
		});
};

module.exports = Game;
