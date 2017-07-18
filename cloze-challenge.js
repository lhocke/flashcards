var ClozeCard = require('./clozeCard.js');
var BasicCard = require('./basicCard.js');
var inquirer = require('inquirer');
var fs = require('fs')

var clozeData = [];
var basicData =[];

// check user intent
var startUp = function() {
	inquirer.prompt([
		{
			name: "functionCheck",
			type: "list",
			message: "What would you like to do?",
			choices: ["Create Cards", "Test Myself"]
		}
	]).then(function(userChoice) {
		console.log(userChoice)
		if (userChoice.functionCheck === "Create Cards") {
			inquirer.prompt([
				{
					name: "cardCheck",
					type: "list",
					message: "Which kind of card?",
					choices: ["Basic", "Cloze"]
				}	
			]).then(function(card){
				console.log(card)
				if (card.cardCheck === "Basic"){
					basicCardCreate()
				} else if (card.cardCheck === "Cloze") {
					console.log("cloze")
					clozeCardCreate()
				}
			})
		} else {
			gameStart()
		}
	})
};

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
				console.log("Basic Test Begins!");
				basicTest();
			} else {
				console.log("Cloze Test Begins!");
				clozeTest();
			};
		});
};

var basicTest = function() {
	var score = 0;
	fs.readFile("./basic.json", "utf-8", function(err, data){
		var questions = JSON.parse(data);
		for (var i = 0; i < questions.length; i++) {
			inquirer.prompt([
				{
					name: "question",
					message: questions[i].front,
					type: "input"
				}
			])then.(function(check){
				console.log(check)
				if (check.question === questions[i].back) {
					console.log("Congratulations!");
					score++;
					console.log(score);
				} else {
					console.log("Sorry, the answer was: " + questions[i].back);
					console.log(score);
				};
			});
		};
	});
};

var clozeTest = function() {};

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
		});
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
	});
};

startUp()