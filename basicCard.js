var fs = require('fs');

// var basicQuestions = [];

var BasicCard = function(front,back){
	if(this instanceof BasicCard) {
		this.front = front;
		this.back = back;
	} else {
		return new BasicCard(front, back);
	}
}

// fs.appendFile("basic-cards.json", JSON.stringify(this),function(err){
// 	if (err){
// 		console.log(err)
// 	}
// })

// var testQ = new BasicCard("this", "thing");
// console.log(testQ)
// var newQ = BasicCard("new", "thing")
// console.log(newQ)

module.exports = BasicCard;