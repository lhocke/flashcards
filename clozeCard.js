var BasicCard = require("./basicCard.js");

var ClozeCard = function(text, cloze){
	if(this instanceof ClozeCard) {
		if (text.includes(cloze)){
			this.fullText = text;
			this.cloze = cloze;
			this.clozeExp = new RegExp(cloze, "g");
			this.partial =  text.replace(this.clozeExp, "...")
			this.card = new BasicCard(this.partial, this.cloze);		
		} else {
			console.log("Sorry, your answer is not in the question");
		};
	} else {
		return new ClozeCard(text, cloze);
	};
};

var teslaCloze = ClozeCard("Nikolai Tesla discovered and was the first to implement Direct Current", "Nikolai Tesla");
console.log(teslaCloze.card.front + "\n" + teslaCloze.card.back);
var testCloze = ClozeCard("A dog", "A cat");


module.exports = ClozeCard;