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
	const playerOneBoard = gameboardFactory();
	const playerTwoBoard = gameboardFactory();

	const players = [
		{
			name: playerOneName,
			board: playerOneBoard,
		},
		{
			name: playerTwoName,
			board: playerTwoBoard,
		},
	];
	let activePlayer = players[0];
	const switchTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
	const getActivePlayer = () => activePlayer;

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
	const placeDummyShipsPlayerOne = () => placeShips(playerOneBoard, p1Coords);
	const placeDummyShipsPlayerTwo = () => placeShips(playerTwoBoard, p2Coords);

	const printNewRound = () => {
		console.log(`${activePlayer.name}'s board`);
		console.log(activePlayer.board.getBoardWithValues());
		console.log(`${activePlayer.name}'s turn`);
	};
	const playRound = (coords) => {
		if (activePlayer.name === 'CPU') {
			cpuPlay(playerOneBoard);
		} else {
			attackBoard(playerTwoBoard, coords);
		}
		switchTurn();
		printNewRound();
	};

	const getRandomCoords = () => [randomNumber(), randomNumber()];
	const attackBoard = (board, coords) => board.receiveAttack(coords);
	const cpuPlay = (board) => {
		const alreadyTargeted = [];
		let randomCoords = getRandomCoords();
		while (alreadyTargeted.includes(randomCoords))
			randomCoords = getRandomCoords();
		attackBoard(board, randomCoords);
		alreadyTargeted.push(randomCoords);
	};
	return {
		getPlayerOneBoard: playerOneBoard.getBoardWithValues,
		getPlayerTwoBoard: playerTwoBoard.getBoardWithValues,
		placeDummyShipsPlayerOne,
		placeDummyShipsPlayerTwo,
		getActivePlayer,
		switchTurn,
		playRound,
		getRandomCoords,
	};
};

function randomNumber() {
	return Math.floor(Math.random() * 10);
}
