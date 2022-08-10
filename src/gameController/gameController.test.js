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
		const { getPlayerOneBoard, placeDummyShipsPlayerOne } = game;
		placeDummyShipsPlayerOne();
		expect(getPlayerOneBoard()).toEqual(initialPlayerOneBoard);
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
		const { getPlayerTwoBoard, placeDummyShipsPlayerTwo } = game;
		placeDummyShipsPlayerTwo();
		expect(getPlayerTwoBoard()).toEqual(initialPlayerTwoBoard);
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
		const { playRound, getPlayerTwoBoard, placeDummyShipsPlayerTwo } = game;
		placeDummyShipsPlayerTwo();
		playRound([0, 0]);
		expect(getPlayerTwoBoard()[0][0]).toEqual('x');
	});
	test("When playerOne attacks, mark enemy board as 'o' when miss", () => {
		const game = gameController('Nashit');
		const { playRound, getPlayerTwoBoard, placeDummyShipsPlayerTwo } = game;
		placeDummyShipsPlayerTwo();
		playRound([1, 1]);
		expect(getPlayerTwoBoard()[1][1]).toEqual('o');
	});
	test('CPU should be able to pick a random coordinate', () => {
		const game = gameController('Nashit');
		const { switchTurn, getRandomCoords, getPlayerOneBoard } = game;
		switchTurn();
		const [x, y] = getRandomCoords();
		expect(getPlayerOneBoard()[x][y]).toEqual(0);
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
		playRound([1, 9]);
		playRound([2, 9]);
		playRound([3, 9]);
		playRound([4, 9]);

		playRound([4, 2]);
		playRound([4, 3]);
		playRound([4, 4]);
		playRound([4, 5]);

		playRound([7, 0]);
		playRound([8, 0]);
		playRound([9, 0]);

		playRound([6, 7]);
		playRound([6, 8]);
		playRound([6, 9]);

		playRound([0, 0]);

		expect(playRound([0, 1])).toEqual('Nashit');
	});
});
