function addRow(rowId) {
	const row = document.createElement("tr");
	row.setAttribute("id", `row-${rowId}`);

	for (let idx of COLS()) {
		const cell = document.createElement("td");
		cell.setAttribute("id", `cell-${idx}${rowId}`);
		cell.classList.add(
			`${
				(+rowId + COLS().indexOf(idx) + (chosenColor === "white" ? 0 : 1)) %
					2 ===
				0
					? "white-square"
					: "black-square"
			}`
		);

		cell.addEventListener("click", () =>
			onCellClickHandler(rowId, idx, turnObject.getTurn)
		);

		row.appendChild(cell);
	}

	table.appendChild(row);
}

function paintBoard() {
	const board = document.querySelector("#chess-board");
	while (board.hasChildNodes()) board.removeChild(board.firstChild);

	for (let rowId of ROWS()) {
		addRow(rowId);
	}
}

function addPieceToBoard(pieceName, pos, color) {
	const ele = document.createElement("img");
	ele.setAttribute("id", `${color}-${pieceName}`);
	ele.setAttribute("data-color", color);

	ele.setAttribute(
		"src",
		`./chessPieces/${color}-${pieceName.replace(/-\d/, "")}.svg`
	);
	ele.classList.add("chess-piece");

	const cell = document.querySelector(`#cell-${pos}`);
	cell.appendChild(ele);
}

function setPiecesOnBoard() {
	Object.keys(positions).forEach((color) => {
		positions[color].forEach((piece) =>
			addPieceToBoard(piece.name, piece.pos, color)
		);
	});
}
