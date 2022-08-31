const diagonalMovePossible = (rowId, colId) => {
	const startCol = COLS().indexOf(
		selectedCellObject.getSelectedCell().cellId[0]
	);
	const endCol = COLS().indexOf(colId);

	const startRow = ROWS().indexOf(
		selectedCellObject.getSelectedCell().cellId[1]
	);
	const endRow = ROWS().indexOf(rowId);

	const rowDirection = endRow - startRow;
	const colDirection = endCol - startCol;

	if (Math.abs(rowDirection) !== Math.abs(colDirection)) return false;

	for (let i = 0; i < Math.abs(rowDirection) - 1; i++) {
		if (
			document.querySelector(
				`#cell-${COLS()[startCol + (colDirection > 0 ? i + 1 : -(i + 1))]}${
					ROWS()[startRow + (rowDirection > 0 ? i + 1 : -(i + 1))]
				}`
			)?.children?.length
		)
			return false;
	}

	return true;
};

const straightMovePossible = (rowId, colId) => {
	if (selectedCellObject.getSelectedCell().cellId[1] === rowId) {
		const startId =
			COLS().indexOf(selectedCellObject.getSelectedCell().cellId[0]) + 1;
		const endId = COLS().indexOf(colId) + 1;

		const minPosition = Math.min(startId, endId);
		const maxPosition = Math.max(startId, endId);

		for (let tempId = minPosition + 1; tempId < maxPosition - 1; tempId++) {
			if (
				document.querySelector(`#cell-${COLS()[tempId - 1]}${rowId}`)?.children
					?.length
			)
				return false;
		}
		return true;
	} else if (selectedCellObject.getSelectedCell().cellId[0] === colId) {
		const startId =
			ROWS().indexOf(selectedCellObject.getSelectedCell().cellId[0]) + 1;
		const endId = ROWS().indexOf(colId) + 1;

		const minPosition = Math.min(startId, endId);
		const maxPosition = Math.max(startId, endId);

		for (let tempId = minPosition + 1; tempId < maxPosition - 1; tempId++) {
			if (
				document.querySelector(`#cell-${colId}${ROWS()[tempId - 1]}`)?.children
					?.length
			)
				return false;
		}
		return true;
	} else return false;
};

const bishopLegalMove = (rowId, colId) => diagonalMovePossible(rowId, colId);

const rookLegalMove = (rowId, colId) => straightMovePossible(rowId, colId);

const queenLegalMove = (rowId, colId) =>
	diagonalMovePossible(rowId, colId) || straightMovePossible(rowId, colId);

const kingLegalMove = (rowId, colId) =>
	Math.abs(
		COLS().indexOf(selectedCellObject.getSelectedCell().cellId[0]) -
			COLS().indexOf(colId)
	) < 2 &&
	Math.abs(
		ROWS().indexOf(selectedCellObject.getSelectedCell().cellId[1]) -
			ROWS().indexOf(rowId)
	) < 2;

const pawnLegalMove = (rowId, colId) => {
	const startCol = COLS().indexOf(
		selectedCellObject.getSelectedCell().cellId[0]
	);
	const endCol = COLS().indexOf(colId);

	const startRow = ROWS().indexOf(
		selectedCellObject.getSelectedCell().cellId[1]
	);
	const endRow = ROWS().indexOf(rowId);

	const rowDirection = endRow - startRow;
	const colDirection = endCol - startCol;

	// straight one
	if (rowDirection === -1 && colDirection === 0)
		return (
			document.querySelector(`#cell-${colId}${rowId}`).children?.length === 0
		);
	// straight two from start
	if (
		rowDirection === -2 &&
		colDirection === 0 &&
		ROWS().indexOf(selectedCellObject.getSelectedCell().cellId[1]) === 6
	)
		return (
			document.querySelector(`#cell-${colId}${rowId}`).children?.length === 0 &&
			document.querySelector(
				`#cell-${colId}${ROWS()[ROWS().indexOf(rowId) + 1]}`
			).children?.length === 0
		);
	// diagonal with kill
	if (rowDirection === -1 && Math.abs(colDirection) === 1) {
		const piece = document.querySelector(`#cell-${colId}${rowId}`)
			.children?.[0];
		return piece && piece?.[0]?.getAttribute("data-color") !== chosenColor;
	}

	return false;
};

const knightLegalMove = (rowId, colId) =>
	(Math.abs(
		COLS().indexOf(selectedCellObject.getSelectedCell().cellId[0]) -
			COLS().indexOf(colId)
	) === 2 &&
		Math.abs(
			ROWS().indexOf(selectedCellObject.getSelectedCell().cellId[1]) -
				ROWS().indexOf(rowId)
		) === 1) ||
	(Math.abs(
		COLS().indexOf(selectedCellObject.getSelectedCell().cellId[0]) -
			COLS().indexOf(colId)
	) === 1 &&
		Math.abs(
			ROWS().indexOf(selectedCellObject.getSelectedCell().cellId[1]) -
				ROWS().indexOf(rowId)
		) === 2);
