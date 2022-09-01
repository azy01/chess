const table = document.querySelector("#chess-board");

const turnObject = (function () {
	let turn = "white";
	return {
		getTurn: () => turn,
		toggleTurn: function () {
			if (turn === "white") turn = "black";
			else turn = "white";
			return turn;
		},
	};
})();

const selectedCellObject = (function () {
	let selectedCell = undefined;
	return {
		getSelectedCell: () => selectedCell,
		setSelectedCell: (cell) => {
			selectedCell = cell
				? { ...getCellContents(cell[1], cell[0]), cellId: cell }
				: cell;
		},
	};
})();

const originalPositions = {
	black: [
		{ name: "pawn-1", pos: "b7" },
		{ name: "pawn-2", pos: "c7" },
		{ name: "pawn-3", pos: "d7" },
		{ name: "pawn-4", pos: "e7" },
		{ name: "pawn-5", pos: "f7" },
		{ name: "pawn-6", pos: "g7" },
		{ name: "pawn-7", pos: "h7" },
		{ name: "pawn-8", pos: "a7" },
		{ name: "rook-1", pos: "a8" },
		{ name: "rook-2", pos: "h8" },
		{ name: "knight-1", pos: "b8" },
		{ name: "knight-2", pos: "g8" },
		{ name: "bishop-1", pos: "c8" },
		{ name: "bishop-2", pos: "f8" },
		{ name: "queen-1", pos: "d8" },
		{ name: "king", pos: "e8" },
	],
	white: [
		{ name: "pawn-1", pos: "b2" },
		{ name: "pawn-2", pos: "c2" },
		{ name: "pawn-3", pos: "d2" },
		{ name: "pawn-4", pos: "e2" },
		{ name: "pawn-5", pos: "f2" },
		{ name: "pawn-6", pos: "g2" },
		{ name: "pawn-7", pos: "h2" },
		{ name: "pawn-8", pos: "a2" },
		{ name: "rook-1", pos: "a1" },
		{ name: "rook-2", pos: "h1" },
		{ name: "knight-1", pos: "b1" },
		{ name: "knight-2", pos: "g1" },
		{ name: "bishop-1", pos: "c1" },
		{ name: "bishop-2", pos: "f1" },
		{ name: "queen-1", pos: "d1" },
		{ name: "king", pos: "e1" },
	],
};

let positions = { ...originalPositions };

paintBoard(chosenColor);

setPiecesOnBoard();

const killedPieces = { black: [], white: [] };

const history = [];

const addHistory = (lastMove) => {
	history.push(lastMove);

	const element = document.createElement("li");
	element.textContent = JSON.stringify(lastMove);
	historyList.appendChild(element);
};

const button = document.createElement("button");
button.addEventListener("click", () => {
	if (turnObject.getTurn() === "black") chosenColor = turnObject.toggleTurn();
	while (history.length) {
		history.pop();
		historyList.removeChild(historyList.firstChild);
	}

	positions = { ...originalPositions };
	paintBoard(chosenColor);
	setPiecesOnBoard();
});
button.textContent = "New Game";
document.querySelector("#header").appendChild(button);

const historyList = document.createElement("ol");
historyList.setAttribute("id", "history-list");
document.querySelector("#history").appendChild(historyList);
