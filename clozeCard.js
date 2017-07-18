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

module.exports = ClozeCard;