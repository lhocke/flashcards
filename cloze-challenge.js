var ClozeCard = require('./clozeCard.js');
var inquirer = require('inquirer');

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
				console.log("Basic Test Begins!")
			} else {
				console.log("Cloze Test Begins!")
			}
		})
}

gameStart(test){
	if (test === )
}