import { gameController } from '../gameController/gameController';
import { addClass, elem, grab, addId } from '../utils/domHelper';
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

		console.log(activePlayer.name);
		// console.log(playerOneBoard);
		dialogBox.textContent = `${activePlayer.name}'s turn...`;

		playerOneBoard.forEach((row, rIndex) => {
			row.forEach((col, cIndex) => {
				const cellBtn = R.compose(addClass('cell'))(elem('button'));

				if (playerOneBoard[rIndex][cIndex] === 'x') addId('ship-hit', cellBtn);

				if (playerOneBoard[rIndex][cIndex] === 'o') addId('ship-miss', cellBtn);

				cellBtn.dataset.row = rIndex;
				cellBtn.dataset.col = cIndex;
				boardOneDiv.appendChild(cellBtn);
			});
		});
		playerTwoBoard.forEach((row, rIndex) => {
			row.forEach((col, cIndex) => {
				const cellBtn = R.compose(addClass('cell'))(elem('button'));

				if (playerTwoBoard[rIndex][cIndex] === 'x') addId('ship-hit', cellBtn);

				if (playerTwoBoard[rIndex][cIndex] === 'o') addId('ship-miss', cellBtn);
				cellBtn.dataset.row = rIndex;
				cellBtn.dataset.col = cIndex;
				boardTwoDiv.appendChild(cellBtn);
			});
		});
	};
	const handleBoardClick = (e) => {
		const row = e.target.dataset.row;
		const col = e.target.dataset.col;

		if (!row || !col) return;
		console.log(`row : ${row} and col: ${col}`);
		game.playRound([row, col]);
		updateScreen();
		setTimeout(() => {
			game.playRound();
			updateScreen();
		}, 2000);
	};
	boardTwoDiv.addEventListener('click', handleBoardClick);
	updateScreen();
};
