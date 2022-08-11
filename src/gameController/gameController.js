import { gameboardFactory } from '../gameboardFactory/gameboadFactory';
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

	//coords already targeted by CPU (this array is later used by cpuPlay)
	const alreadyTargeted = [];
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

	//pre determinded ship placement.
	//TODO:
	// 1. Add in a way for player to place ships
	// 2. Add in a way for CPU to randomly place ships.
	const placeShips = (board, coords) => {
		ships.forEach((ship, index) => {
			board.placeShip(ship, coords[index]);
		});
	};
	const placeDummyShipsPlayerOne = () => placeShips(playerOneBoard, p1Coords);
	const placeDummyShipsPlayerTwo = () => placeShips(playerTwoBoard, p2Coords);

	// to play game on console
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
		//printNewRound();

		//right after the player's turn,  make the CPU play
		// if (activePlayer.name === 'CPU') playRound();

		// Winning conditions
		if (playerOneBoard.areAllShipsSunk()) return `${playerTwoName}`;
		if (playerTwoBoard.areAllShipsSunk()) return `${playerOneName}`;
	};

	const getRandomCoords = () => [randomNumber(), randomNumber()];
	const attackBoard = (board, coords) => board.receiveAttack(coords);
	const cpuPlay = (board) => {
		let randomCoords = getRandomCoords();
		while (alreadyTargeted.includes(randomCoords))
			randomCoords = getRandomCoords();
		attackBoard(board, randomCoords);
		alreadyTargeted.push(randomCoords);
	};
	return {
		getPlayerOneBoardWithValues: playerOneBoard.getBoardWithValues,
		getPlayerTwoBoardWithValues: playerTwoBoard.getBoardWithValues,
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
