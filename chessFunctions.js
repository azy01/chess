const giveErrorMessage = () => {};

const getCellContents = (rowId, colId) => {
	const piece = document.querySelector(`#cell-${colId}${rowId}`).children?.[0];
	if (!piece) return undefined;

	const [color, type] = piece.getAttribute("id").replace(/-\d/, "").split("-");
	return { color, type };
};

const isCellOccupiedBySameColor = (rowId, colId) =>
	getCellContents(rowId, colId)?.color === chosenColor;

const checkIfLegalMove = (rowId, colId, type) => {
	switch (type) {
		case PAWN:
			return pawnLegalMove(rowId, colId);
		case ROOK:
			return rookLegalMove(rowId, colId);
		case KNIGHT:
			return knightLegalMove(rowId, colId);
		case BISHOP:
			return bishopLegalMove(rowId, colId);
		case QUEEN:
			return queenLegalMove(rowId, colId);
		case KING:
			return kingLegalMove(rowId, colId);
		default:
			return;
	}
};

const validateMove = (rowId, colId) =>
	!isCellOccupiedBySameColor(rowId, colId) &&
	checkIfLegalMove(rowId, colId, selectedCellObject.getSelectedCell().type);

const toggleSelectCell = (rowId, colId) => {
	if (selectedCellObject.getSelectedCell()) {
		selectedCellObject.setSelectedCell(undefined);
		document
			.querySelector(`#cell-${colId}${rowId}`)
			.classList.remove("selected-cell");
	} else {
		selectedCellObject.setSelectedCell(`${colId}${rowId}`);
		document
			.querySelector(`#cell-${colId}${rowId}`)
			.classList.add("selected-cell");
	}
};

const checkIfCellSelected = () => selectedCellObject.getSelectedCell();

const checkIfItsSameCell = (rowId, colId) =>
	selectedCellObject.getSelectedCell().cellId === `${colId}${rowId}`;

const makeMove = (rowId, colId) => {
	const newParentEle = document.querySelector(`#cell-${colId}${rowId}`);
	const element = document.querySelector(
		`#cell-${selectedCellObject.getSelectedCell().cellId}`
	).children?.[0];

	const newMove = {
		from: selectedCellObject.getSelectedCell().cellId,
		to: `${colId}${rowId}`,
		piece: element.getAttribute("id"),
	};

	positions[chosenColor] = [
		{
			...positions[chosenColor].find(
				(piece) =>
					piece.pos ===
					`${selectedCellObject.getSelectedCell().cellId[0]}${
						selectedCellObject.getSelectedCell().cellId[1]
					}`
			),
			pos: `${colId}${rowId}`,
		},
		...positions[chosenColor].filter(
			(piece) =>
				piece.pos !==
				`${selectedCellObject.getSelectedCell().cellId[0]}${
					selectedCellObject.getSelectedCell().cellId[1]
				}`
		),
	];
	toggleSelectCell(
		selectedCellObject.getSelectedCell().cellId[1],
		selectedCellObject.getSelectedCell().cellId[0]
	);

	element.parentElement.removeChild(element);

	if (newParentEle.hasChildNodes()) {
		const killedPiece = newParentEle.firstChild.getAttribute("id");

		newMove.victim = killedPiece;
		killedPieces[chosenColor].push(killedPiece.replace(/-\d/));

		positions[chosenColor === "black" ? "white" : "black"] = positions[
			chosenColor === "black" ? "white" : "black"
		].filter((piece) => piece.pos !== `${colId}${rowId}`);

		newParentEle.removeChild(newParentEle.firstChild);
	}
	newParentEle.appendChild(element);

	addHistory(newMove);

	if (playingWithSelf) {
		chosenColor = turnObject.toggleTurn();
		const board = document.querySelector("#chess-board");
		while (board.hasChildNodes()) {
			board.firstChild.remove();
		}

		paintBoard(chosenColor);
		setPiecesOnBoard();
	}
};

const onCellClickHandler = (rowId, colId) => {
	if (chosenColor === turnObject.getTurn()) {
		if (checkIfCellSelected()) {
			if (checkIfItsSameCell(rowId, colId)) toggleSelectCell(rowId, colId);
			else {
				const isMoveValid = validateMove(rowId, colId);

				if (isMoveValid) {
					makeMove(rowId, colId);
				} else {
					giveErrorMessage(isMoveValid?.invalidity);
				}
			}
		} else {
			const pieceProps = getCellContents(rowId, colId);

			if (pieceProps?.color === chosenColor) toggleSelectCell(rowId, colId);
			else return;
		}
	}
};

const goToHistoryPoint = (index) => {
	let lastPlayedColor;
	while (history.length > index) {
		const revertMove = history.pop();
		historyList.removeChild(historyList.lastChild);

		lastPlayedColor = revertMove.piece.replace(/-\d/, "").split("-")[0];
		const name = revertMove.piece.replace(`${lastPlayedColor}-`, "");

		positions[lastPlayedColor][
			positions[lastPlayedColor].findIndex((piece) => piece.name === name)
		].pos = revertMove.from;

		const killedPieces = document.querySelector("#killed-pieces");

		if (revertMove.victim) {
			killedPieces.removeChild(killedPieces.lastChild);
			const victimColor = revertMove.victim.replace(/-\d/, "").split("-")[0];
			const victimName = revertMove.victim.replace(`${victimColor}-`, "");

			positions[victimColor].push({
				name: victimName,
				pos: revertMove.to,
			});
		}
	}

	if (lastPlayedColor) {
		chosenColor = lastPlayedColor;
		if (turnObject.getTurn() !== chosenColor) turnObject.toggleTurn();

		paintBoard(chosenColor);
		setPiecesOnBoard();
	}

	selectedCellObject.setSelectedCell(undefined);
};
