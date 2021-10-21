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
	//	console.table(this.currentEnemy.getStats());
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
						this.checkEndOfBattle();
						return;
					} else {
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
								this.checkEndOfBattle();
							});
					} //else ends
				} else {
					const damage = this.player.getAttackValue();
					this.currentEnemy.reduceHealth(damage);
					console.log(`You attacked the ${this.currentEnemy.name}`);
					console.log(this.currentEnemy.getHealth());
					this.checkEndOfBattle();
				}
			});
	} else {
		console.log(this.currentEnemy.getAttackValue());
		const damage = this.currentEnemy.getAttackValue();
		this.player.reduceHealth(damage);
		console.log(`You were attacked by ${this.currentEnemy.name}`);
		console.log(this.player.getHealth());
		this.checkEndOfBattle();
	}
};

Game.prototype.checkEndOfBattle = function () {
	if (this.player.isAlive() && this.currentEnemy.isAlive()) {
		this.isPlayerTurn = !this.isPlayerTurn;
		this.battle();
	} else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
		//enemy is not alive but player is alive
		console.log(`"You have defeated ${this.currentEnemy.name}!!`);
		this.player.addPotion(this.currentEnemy.potions);
		console.log(
			`${this.player.name} found a ${this.currentEnemy.potions.name} potion`
		);
		this.roundNumber++;
		if (this.roundNumber < this.enemies.length) {
			//still few enemies exist
			this.currentEnemy = this.enemies[this.roundNumber];
			this.startNewBattle();
		} else {
			//no more enemies
			console.log("You won!!!");
		}
	} else {
		console.log("You have been defeated!!");
	}
};

module.exports = Game;
