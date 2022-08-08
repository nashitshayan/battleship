import { shipFactory } from '../shipFactory/shipFactory';
export const gameboardFactory = () => {
	const rows = 10;
	const cols = 10;
	const board = [];
	//create a 2-d array filled with 0's. This will be our initial gameboard
	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < cols; j++) {
			board[i].push(undefined);
		}
	}

	const getBoard = () => board;
	const placeShip = (shipType, coordinates) => {
		const { name, axis, length } = shipType;
		const [x_coord, y_coord] = coordinates;

		// we'll be placing ships either top-to-bottom or left-to-right.
		// if: a) we find that the ship will extend over the edge of the board
		//	   b) we encounter already placed ship objects along that path
		// 	then: do nothing, return
		// else: place the ship objects

		if (axis === 'vertical') {
			if (x_coord + length - 1 > 9) return;
			if (isVerticalOverlap(x_coord)) return;

			for (let i = 0; i < length; i++)
				board[x_coord + i][y_coord] = shipFactory(name);
		}
		if (axis === 'horizontal') {
			if (y_coord + length - 1 > 9) return;
			if (isHorizontalOverlap(y_coord)) return;

			for (let i = 0; i < length; i++)
				board[x_coord][y_coord + i] = shipFactory(name);
		}

		//util functions
		function isVerticalOverlap(x) {
			for (let i = x; i < length; i++) {
				if (typeof board[i][y_coord] === 'object') return true;
			}
			return false;
		}
		function isHorizontalOverlap(y) {
			for (let i = y; i < length; i++) {
				if (typeof board[x_coord][i] === 'object') return true;
			}
			return false;
		}
	};
	const hit = (ship) => (ship.isHit = true);
	const isShipHit = (ship) => ship.isHit;
	const getShipObjects = () =>
		board.flat().filter((cell) => typeof cell === 'object');

	const isShipSunk = (shipName) =>
		getShipObjects()
			.filter((cell) => cell.name === shipName)
			.every(isShipHit);

	const areAllShipsSunk = () => getShipObjects().every(isShipHit);

	const receiveAttack = (coordinates) => {
		const [x_coord, y_coord] = coordinates;
		if (typeof board[x_coord][y_coord] === 'object') {
			const ship = board[x_coord][y_coord];
			hit(ship);
		} else {
			board[x_coord][y_coord] = 'o';
		}
	};
	const getBoardWithValues = () => {
		const boardWithValues = board.map((row) =>
			row.map((cell) => {
				if (cell) {
					const value = cell.isHit ? 'x' : cell === 'o' ? 'o' : 1;
					return value;
				}
				return 0;
			}),
		);
		return boardWithValues;
	};
	return {
		getBoard,
		placeShip,
		getBoardWithValues,
		receiveAttack,
		isShipSunk,
		areAllShipsSunk,
	};
};
