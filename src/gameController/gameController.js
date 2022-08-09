import { gameboardFactory } from '../gameboardFactory/gameboadFactory';
export const gameController = (
	playerOneName = 'playerOne',
	playerTwoName = 'CPU',
) => {
	const ships = [
		{ name: 'carrier', axis: 'vertical', length: 5 },
		{ name: 'battleship', axis: 'horizontal', length: 4 },
		{ name: 'destroyer', axis: 'vertical', length: 3 },
		{ name: 'submarine', axis: 'horizontal', length: 3 },
		{ name: 'patrol boat', axis: 'horizontal', length: 2 },
	];
	const players = [
		{
			name: playerOneName,
		},
		{
			name: playerTwoName,
		},
	];
	const activePlayer = players[0];
	const getActivePlayer = () => activePlayer;

	const playerOneBoard = gameboardFactory();
	const playerTwoBoard = gameboardFactory();

	const placeShips = (board, coords) => {
		ships.forEach((ship, index) => {
			board.placeShip(ship, coords[index]);
		});
	};
	const p1Coords = [
		[2, 0],
		[1, 3],
		[7, 3],
		[4, 7],
		[8, 8],
	];
	const p2Coords = [
		[0, 9],
		[4, 2],
		[7, 0],
		[6, 7],
		[0, 0],
	];
	placeShips(playerOneBoard, p1Coords);
	placeShips(playerTwoBoard, p2Coords);

	return {
		getPlayerOneBoard: playerOneBoard.getBoardWithValues,
		getPlayerTwoBoard: playerTwoBoard.getBoardWithValues,
	};
};