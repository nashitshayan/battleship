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
		const { getPlayerOneBoard } = game;

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
		const { getPlayerTwoBoard } = game;

		expect(getPlayerTwoBoard()).toEqual(initialPlayerTwoBoard);
	});
	test('gameController should expose a function to switch player turn', () => {
		const game = gameController('Nashit');
		const { switchTurn, getActivePlayer } = game;
		expect(getActivePlayer().name).toEqual('Nashit');
		switchTurn();
		expect(getActivePlayer().name).toEqual('CPU');
	});
});
