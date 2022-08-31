const playingWithSelf = true;

let chosenColor = playingWithSelf
	? "white"
	: Math.random(0, 1) > 0.5
	? "black"
	: "white";
