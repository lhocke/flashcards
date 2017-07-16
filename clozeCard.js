var BasicCard = require("./basicCard.js")

var ClozeCard = function (text, cloze){
	this.fullText = text;
	this.cloze = cloze;
	this.replaceExp = new RegExp(cloze, "g");
	this.partial =  text.replace(this.replaceExp, "...")
	this.card = new BasicCard(this.partial, this.cloze);
}

var teslaCloze = new ClozeCard("Nikolai Tesla discovered and was the first to implement Direct Current", "Nikolai Tesla");

console.log(teslaCloze.card.front + "\n" + teslaCloze.card.back);

module.exports = ClozeCard;