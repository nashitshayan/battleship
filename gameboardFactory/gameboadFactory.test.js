import { gameboardFactory } from './gameboadFactory';

describe('Gameboard Factory', () => {
	test("Gameboard shouldn't be null", () => {
		expect(gameboardFactory()).not.toBeNull();
	});
	test('Gameboard should be an object', () => {
		expect(typeof gameboardFactory()).toEqual('object');
	});
	test('Gameboard should expose a function that gives us the initial 10x10 0-filled grid', () => {
		let stringyfiedInitialGrid = JSON.stringify([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);
		expect(JSON.stringify(gameboardFactory().getBoard())).toEqual(
			stringyfiedInitialGrid,
		);
	});
});
