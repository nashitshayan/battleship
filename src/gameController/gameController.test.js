import { gameController } from './gameController';

describe('Game Controller', () => {
	test('game controller should not return null', () => {
		expect(gameController()).not.toBeNull();
	});
	test('game controller should return an object', () => {
		expect(typeof gameController()).toEqual('object');
	});
	test('correctly place ships on playerOneBoard', () => {
		const initialPlayerOneBoard = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		];
		const game = gameController();
		const { getPlayerOneBoardWithValues, placeDummyShipsPlayerOne } = game;
		placeDummyShipsPlayerOne();
		expect(getPlayerOneBoardWithValues()).toEqual(initialPlayerOneBoard);
	});
	test('correctly place ships on playerTwoBoard', () => {
		const initialPlayerTwoBoard = [
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];

		const game = gameController();
		const { getPlayerTwoBoardWithValues, placeDummyShipsPlayerTwo } = game;
		placeDummyShipsPlayerTwo();
		expect(getPlayerTwoBoardWithValues()).toEqual(initialPlayerTwoBoard);
	});
	test('gameController should expose a function to switch player turn', () => {
		const game = gameController('Nashit');
		const { switchTurn, getActivePlayer } = game;
		expect(getActivePlayer().name).toEqual('Nashit');
		switchTurn();
		expect(getActivePlayer().name).toEqual('CPU');
	});
	test("When playerOne attacks, mark enemy board as 'x' when hit", () => {
		const game = gameController('Nashit');
		const { playRound, getPlayerTwoBoardWithValues, placeDummyShipsPlayerTwo } =
			game;
		placeDummyShipsPlayerTwo();
		playRound([0, 0]);
		expect(getPlayerTwoBoardWithValues()[0][0]).toEqual('x');
	});
	test("When playerOne attacks, mark enemy board as 'o' when miss", () => {
		const game = gameController('Nashit');
		const { playRound, getPlayerTwoBoardWithValues, placeDummyShipsPlayerTwo } =
			game;
		placeDummyShipsPlayerTwo();
		playRound([1, 1]);
		expect(getPlayerTwoBoardWithValues()[1][1]).toEqual('o');
	});
	test('CPU should be able to pick a random coordinate', () => {
		const game = gameController('Nashit');
		const { switchTurn, getRandomTarget, getPlayerOneBoardWithValues } = game;
		switchTurn();
		const [x, y] = getRandomTarget();
		expect(getPlayerOneBoardWithValues()[x][y]).toEqual(0);
	});

	test('playRound should return the name of the winner when all enemy ships have been destroyed', () => {
		const game = gameController('Nashit');
		const { playRound, placeDummyShipsPlayerOne, placeDummyShipsPlayerTwo } =
			game;
		placeDummyShipsPlayerOne();
		placeDummyShipsPlayerTwo();
		/**
	 * Initial PlayerTwoBoard
	[1, 1, 0, 0, 0, 0, 0, 0, 0, 1]
 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
	[0, 0, 1, 1, 1, 1, 0, 0, 0, 1]
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	[0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	 */
		playRound([0, 9]);
		playRound();
		playRound([1, 9]);
		playRound();
		playRound([2, 9]);
		playRound();
		playRound([3, 9]);
		playRound();
		playRound([4, 9]);
		playRound();

		playRound([4, 2]);
		playRound();
		playRound([4, 3]);
		playRound();
		playRound([4, 4]);
		playRound();
		playRound([4, 5]);
		playRound();

		playRound([7, 0]);
		playRound();
		playRound([8, 0]);
		playRound();
		playRound([9, 0]);
		playRound();

		playRound([6, 7]);
		playRound();
		playRound([6, 8]);
		playRound();
		playRound([6, 9]);
		playRound();

		playRound([0, 0]);
		playRound();

		expect(playRound([0, 1])).toEqual('Nashit');
	});
});
