var BasicCard = require("./basicCard.js");

var ClozeCard = function (text, cloze){
	if (text.includes(cloze)){
		this.fullText = text;
		this.cloze = cloze;
		this.clozeExp = new RegExp(cloze, "g");
		this.partial =  text.replace(this.clozeExp, "...")
		this.card = new BasicCard(this.partial, this.cloze);		
	} else {
		console.log("Sorry, your answer is not in the question")
	}
};

var teslaCloze = new ClozeCard("Nikolai Tesla discovered and was the first to implement Direct Current", "Nikolai Tesla");
console.log(teslaCloze.card.front + "\n" + teslaCloze.card.back);
var testCloze = new ClozeCard("A dog", "A cat")


module.exports = ClozeCard;