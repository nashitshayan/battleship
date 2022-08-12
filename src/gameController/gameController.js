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
	// keep track of coords that cannot be used to place new CPU ships
	const alreadyPlaced = [];

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
	// 2. Add in a way for CPU to randomly place ships. (DONE)
	const placeShips = (board, coords) => {
		ships.forEach((ship, index) => {
			board.placeShip(ship, coords[index]);
		});
	};
	const placeShipsCPU = (ship) => {
		const status = playerTwoBoard.placeShip(ship, getRandomCoords());
		if (status === -1) placeShipsCPU(ship);
	};

	const placeDummyShipsPlayerOne = () => placeShips(playerOneBoard, p1Coords);
	const placeDummyShipsPlayerTwo = () => placeShips(playerTwoBoard, p2Coords);

	// randomly place ships on CPU board
	const randomlyPlaceShipsCPU = () => {
		ships.forEach((ship) => placeShipsCPU(ship));
	};

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

	const attackBoard = (board, coords) => board.receiveAttack(coords);
	const cpuPlay = (board) => {
		let randomCoords = getRandomTarget();
		attackBoard(board, randomCoords);
		alreadyTargeted.push(randomCoords);
	};
	return {
		getPlayerOneBoardWithValues: playerOneBoard.getBoardWithValues,
		getPlayerTwoBoardWithValues: playerTwoBoard.getBoardWithValues,
		getPlayerTwoBoard: playerTwoBoard.getBoard,
		placeDummyShipsPlayerOne,
		placeDummyShipsPlayerTwo,
		getActivePlayer,
		switchTurn,
		playRound,
		getRandomTarget,
		randomlyPlaceShipsCPU,
	};
	function getRandomTarget() {
		let randomCoords = [randomNumber(), randomNumber()];
		let checkPresent = alreadyTargeted.map(
			(coords) =>
				coords.includes(randomCoords[0]) && coords.includes(randomCoords[1]),
		);
		if (checkPresent.includes(true)) getRandomTarget();
		return randomCoords;
	}

	function getRandomCoords() {
		let randomCoords = [randomNumber(), randomNumber()];
		let checkPresent = alreadyPlaced.map(
			(coords) =>
				coords.includes(randomCoords[0]) && coords.includes(randomCoords[1]),
		);
		if (checkPresent.includes(true)) getRandomTarget();
		return randomCoords;
	}
};

function randomNumber() {
	return Math.floor(Math.random() * 10);
}
