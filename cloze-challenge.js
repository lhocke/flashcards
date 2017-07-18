var ClozeCard = require('./clozeCard.js');
var BasicCard = require('./basicCard.js');
var inquirer = require('inquirer');
var fs = require('fs');
var score = 0;

// check user intent
var startUp = function() {
	console.log('\033c');
	score = 0;
	inquirer.prompt([
		{
			name: "functionCheck",
			type: "list",
			message: "What would you like to do?",
			choices: ["Test Myself", "Create Cards", "Exit"]
		}
	]).then(function(userChoice) {
		if (userChoice.functionCheck === "Create Cards") {
			inquirer.prompt([
				{
					name: "cardCheck",
					type: "list",
					message: "Which kind of card?",
					choices: ["Basic", "Cloze"]
				}	
			]).then(function(card){
				if (card.cardCheck === "Basic"){
					basicCardCreate()
				} else if (card.cardCheck === "Cloze") {
					clozeCardCreate()
				}
			})
		} else if (userChoice.functionCheck === "Test Myself") {
			gameStart();
		} else {
			process.exit();
		};
	})
};

// choose which test to run
var gameStart = function() {
	inquirer
		.prompt([
			{
				"name": "testType",
				"type": "list",
				"message": "Choose a test: ",
				"choices": ["Basic", "Advanced"]
			}
		]).then(function(response){
			if(response.testType === "Basic") {
				// clears the terminal
				console.log("\033c");

				console.log("Basic Test Begins!");
				basicTest(0);
			} else {
				console.log("\033c");
				console.log("Cloze Test Begins!");
				clozeTest(0);
			};
		});
};

// traditional flashcards
var basicTest = function(index) {
	if (!index){
		index = 0;
	}
	fs.readFile("./basic.json", "utf-8", function(err, data){
		var questions = JSON.parse(data);
		var card = questions[index];
		inquirer.prompt([
			{
				name: "question",
				message: 1 + index + ". " + card.front + "\n",
				type: "input"
			}
		]).then(function(check){
			// check accuracy and convert to lower case to compensate for case errors
			if (check.question.toLowerCase() === card.back.toLowerCase()) {
				console.log("Congratulations!");
				score++;
				console.log("Score: " + score);
			} else {
				console.log("Sorry!\nScore: " + score);
			};
			if (index < questions.length - 1) {
				basicTest(index + 1)
			} else {
				console.log("Game Over! Thanks For Playing!")

				// checks if user wants a second attempt
				inquirer.prompt([
					{
						name: "doWhat",
						type: "list",
						message: "Would you like to try again?",
						choices: ["Yes", "No"]
					}
				]).then(function(next){
					if (next.doWhat === "Yes") {
						basicTest(0)
					} else {
						console.log("\033c");
						startUp()
					}
				})
			}
		});
	});
};

// cloze card test
var clozeTest = function(index) {
	if (!index){
		index = 0
	}
	
	fs.readFile("./cloze.json", "utf-8", function(err, data){
		var questions = JSON.parse(data);
		var card = questions[index]
		inquirer.prompt([
			{
				name: "question",
				message: index + 1 + ". " + card.front + "\n",
				type: "input"
			}
		]).then(function(check){
			if (check.question.toLowerCase() === card.back.toLowerCase()) {
				console.log("Congratulations!");
				score++;
				console.log("Score: " + score);
			} else {
				console.log("Sorry\nScore: " + score);
			};
			if (index < questions.length - 1) {
				clozeTest(index + 1)
			} else {
				console.log("Game Over! Thanks For Playing!");
				inquirer.prompt([
					{
						name: "doWhat",
						type: "list",
						message: "Would you like to try again?",
						choices: ["Yes", "No"]
					}

				]).then(function(next){
					if (next.doWhat === "Yes") {
						console.log("\033c");
						clozeTest(0)
					} else {
						startUp()
					}
				})
			}
		});
	})
};

// create Basic Cards
var basicCardCreate = function() {
	inquirer.prompt([
		{
			name: "front",
			type: "input",
			message: "Please Enter A Question: ",
			validate: function(input) {
				if (!input) {
					return false
				} else {
					return true
				}
			}
		},
		{
			name: "back",
			type: "input",
			message: "Please Enter The Answer: ",
			validate: function(input) {
				if (!input) {
					return false
				} else {
					return true
				}
			}
		}
	]).then(function(card){
		var newCard = BasicCard(card.front, card.back);
		// parse existing JSON before push and prettify 
		fs.readFile("./basic.json", function(err, data) {
			var json = JSON.parse(data);
			json.push(newCard);
			fs.writeFile("./basic.json", JSON.stringify(json, null, 2), function(err){
				if (err) throw err
			});
		})
		// ask for next step
		inquirer.prompt([
			{
				name: "doWhat",
				type: "list",
				message: "Would you like to make another?",
				choices: ["Yes", "No"]
			}
		]).then(function(next){
			if (next.doWhat === "Yes") {
				basicCardCreate()
			} else {
				startUp()
			}
		})
	});

};

// create cloze cards
var clozeCardCreate = function() {
	inquirer.prompt([
		{
			name: "front",
			type: "input",
			message: "Please Enter The Full Text: ",
			validate: function(input) {
				if (!input) {
					return false
				} else {
					return true
				};
			}
		},
		{
			name: "back",
			type: "input",
			message: "Please Enter The Answer: ",
			validate: function(input) {
				if (!input) {
					return false
				} else {
					return true
				};
			}
		}
	]).then(function(card){
		var newCard = ClozeCard(card.front, card.back);
		fs.readFile("./cloze.json", function(err, data) {
			var json = JSON.parse(data);
			json.push(newCard.card);
			fs.writeFile("./cloze.json", JSON.stringify(json, null, 2), function(err){
				if (err) throw err
			});
		});
		inquirer.prompt([
			{
				name: "doWhat",
				type: "list",
				message: "Would you like to make another?",
				choices: ["Yes", "No"]
			}
		]).then(function(next){
			if (next.doWhat === "Yes") {
				clozeCardCreate()
			} else {
				startUp()
			}
		})
	});
	
};

startUp()