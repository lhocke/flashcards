var BasicCard = require("./basicCard.js")

var ClozeCard = function (text, cloze){
	this.cloze = cloze;
	this.text = text;
}

module.exports = ClozeCard;