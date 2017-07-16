var BasicCard = require("./basicCard.js")

var ClozeCard = function (text, cloze){
	this.fullText = text;
	this.cloze = cloze;
	this.replaceExp = new RegExp(cloze, "g");
	this.partial = this.fullText.replace(this.replaceExp, "... ")
	this.card = new BasicCard(this.partial, this.cloze);
}

var teslaCloze = new ClozeCard("Nikolai Telsa discovered and was the first to implement Direct Current", "Nikolai Tesla");

console.log(teslaCloze.fullText + "\n" + teslaCloze.partial + "\n" + teslaCloze.cloze + "\n" + teslaCloze.card.front + "\n" + teslaCloze.card.back);
// console.log(teslaCloze)



module.exports = ClozeCard;