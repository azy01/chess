function addRow(rowId) {
	const table = document.querySelector("#chess-board");

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

function makeHorizontalLabels(position) {
	const labelTable = document.createElement("table");
	labelTable.setAttribute("id", `${position}-label`);

	const row = document.createElement("tr");

	for (let label of COLS()) {
		const cell = document.createElement("td");
		cell.classList.add("label");
		cell.textContent = label;
		row.appendChild(cell);
	}
	labelTable.appendChild(row);

	return labelTable;
}

function makeVerticalLabels(position) {
	const labelTable = document.createElement("table");
	labelTable.setAttribute("id", `${position}-label`);

	for (let label of ROWS()) {
		const row = document.createElement("tr");
		const cell = document.createElement("td");

		cell.classList.add("label");
		cell.textContent = label;
		row.appendChild(cell);
		labelTable.appendChild(row);
	}

	const container = document.createElement("div");
	container.classList.add("table-container");
	container.appendChild(labelTable);
	return container;
}

function addLabels() {
	const topLabelTable = makeHorizontalLabels("top");
	const bottomLabelTable = makeHorizontalLabels("bottom");

	const horizontalTableContainers = document.querySelector("#extra-container");
	horizontalTableContainers.insertBefore(
		topLabelTable,
		horizontalTableContainers.children[0]
	);
	horizontalTableContainers.appendChild(bottomLabelTable);

	const rightLabelTable = makeVerticalLabels("right");
	const leftLabelTable = makeVerticalLabels("left");

	const verticalTableContainers = document.querySelector("#board-with-labels");
	verticalTableContainers.insertBefore(
		leftLabelTable,
		verticalTableContainers.children[0]
	);
	verticalTableContainers.appendChild(rightLabelTable);
}

function paintBoard() {
	const boardWithLabels = document.querySelector("#board-with-labels");
	while (boardWithLabels.hasChildNodes())
		boardWithLabels.removeChild(boardWithLabels.firstChild);

	const extra = document.createElement("div");
	extra.setAttribute("id", "extra-container");

	const table = document.createElement("table");
	table.setAttribute("id", "chess-board");

	extra.appendChild(table);
	boardWithLabels.appendChild(extra);

	for (let rowId of ROWS()) {
		addRow(rowId);
	}

	addLabels();
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
