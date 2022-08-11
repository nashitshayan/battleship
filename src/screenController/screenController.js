import { gameController } from '../gameController/gameController';
import { addClass, elem, grab, addId, setContent } from '../utils/domHelper';
import * as R from 'ramda';
export const screenController = () => {
	const game = gameController();
	const boardOneDiv = grab('#boardOne');
	const boardTwoDiv = grab('#boardTwo');
	const dialogBox = grab('.dialogBox');
	game.placeDummyShipsPlayerOne();
	game.placeDummyShipsPlayerTwo();

	const updateScreen = () => {
		boardOneDiv.textContent = '';
		boardTwoDiv.textContent = '';
		const playerOneBoard = game.getPlayerOneBoardWithValues();
		const playerTwoBoard = game.getPlayerTwoBoardWithValues();
		const activePlayer = game.getActivePlayer();

		dialogBox.textContent = `${activePlayer.name}'s turn...`;

		playerOneBoard.forEach((row, rIndex) => {
			row.forEach((col, cIndex) => {
				addCells(boardOneDiv, playerOneBoard, rIndex, cIndex, true);
			});
		});

		playerTwoBoard.forEach((row, rIndex) => {
			row.forEach((col, cIndex) => {
				addCells(boardTwoDiv, playerTwoBoard, rIndex, cIndex, false);
			});
		});
	};

	const handleBoardClick = (e) => {
		const row = e.target.dataset.row;
		const col = e.target.dataset.col;
		let result;

		if (!row || !col) return;

		//player's turn
		const playerOneName = getActivePlayerFromDOM();
		result = game.playRound([row, col]);
		updateScreen();

		// check if player one has sunk all enemy ships
		if (result === playerOneName) handleGameOver(playerOneName);
		//cpu turn after some time
		else {
			setTimeout(() => {
				const playerTwoName = getActivePlayerFromDOM();
				game.playRound();
				updateScreen();

				//check if cpu has all enemy ships
				if (result === playerTwoName) handleGameOver(playerTwoName);
			}, 0);
		}
	};

	function handleGameOver(winner) {
		setContent(`The winner is ${winner}`, dialogBox);

		//show all ships of cpu board
		boardTwoDiv.textContent = '';
		const playerTwoBoard = game.getPlayerTwoBoardWithValues();
		playerTwoBoard.forEach((row, rIndex) => {
			row.forEach((col, cIndex) => {
				addCells(boardTwoDiv, playerTwoBoard, rIndex, cIndex, true);
			});
		});
	}

	boardTwoDiv.addEventListener('click', handleBoardClick);
	updateScreen();
};

function getActivePlayerFromDOM() {
	return grab('.dialogBox').textContent.split("'")[0];
}

function addCells(boardDiv, board, rIndex, cIndex, markShips) {
	const cellBtn = R.compose(addClass('cell'))(elem('button'));

	if (markShips && board[rIndex][cIndex] === 1) addClass('ship', cellBtn);

	if (board[rIndex][cIndex] === 'x') addId('ship-hit', cellBtn);

	if (board[rIndex][cIndex] === 'o') addId('ship-miss', cellBtn);
	cellBtn.dataset.row = rIndex;
	cellBtn.dataset.col = cIndex;
	boardDiv.appendChild(cellBtn);
}
