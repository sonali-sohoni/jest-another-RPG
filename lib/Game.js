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
			this.startNewBattle();
		});
};

Game.prototype.startNewBattle = function () {
	//compare agility values of the player and current and enemy and decide whether its a player's turn
	if (this.player.agility > this.currentEnemy.agility) {
		this.isPlayerTurn = true;
	} else this.isPlayerTurn = false;
	console.log(`${this.player.name}'s stats are as follows :`);
	console.table(this.player.getStats());
	// console.log(`${this.currentEnemy.name}'s stats are as follows:'`);
	// console.table(this.currentEnemy.getStats());
	console.log(this.currentEnemy.getDescription());
	//
	this.battle();
};

Game.prototype.battle = function () {
	if (this.isPlayerTurn) {
		inquirer
			.prompt([
				{
					type: "list",
					messagee: "What would you like to do?",
					name: "action",
					choices: ["Attack", "Use Potion"],
				},
			])
			.then(({ action }) => {
				if (action === "Use Potion") {
					if (!this.player.getInventory()) {
						console.log("You do not have enough potions!");
						return;
					} else {
						console.log(this.player.getInventory());
						inquirer
							.prompt([
								{
									type: "list",
									name: "action",
									message: "Which potions do you want to use?",
									choices: this.player
										.getInventory()
										.map((value, index) => `${index + 1}:${value.name}`),
								},
							])
							.then(({ action }) => {
								const index = action.split(":")[0] - 1;
								this.player.usePotion(index);
							});
					} //else ends
				} else {
					const damage = this.player.getAttackValue();
					this.currentEnemy.reduceHealth(damage);
					console.log(`You attacked the ${this.currentEnemy.name}`);
					console.log(this.currentEnemy.getHealth());
				}
			});
	} else {
		const damage = this.currentEnemy.getAttackValue();
		this.player.reduceHealth(damage);
		console.log(`You were attacked by ${this.currentEnemy.name}`);
		console.log(this.player.getHealth());
	}
};

module.exports = Game;
