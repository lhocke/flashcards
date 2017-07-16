var fs = require('fs');

// var basicQuestions = [];

var BasicCard = function(front,back){
    this.front = front;
    this.back = back;
}

// fs.appendFile("basic-cards.json", JSON.stringify(this),function(err){
// 	if (err){
// 		console.log(err)
// 	}
// })

var testQ = new BasicCard("this", "thing");
var newQ = new BasicCard("new", "thing")


module.exports = BasicCard;