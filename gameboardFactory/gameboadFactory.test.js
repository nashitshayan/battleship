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
		expect(JSON.stringify(gameboardFactory().printBoard())).toEqual(
			stringyfiedInitialGrid,
		);
	});
	test('placeShip should place a ship on the gameboard', () => {
		let updatedGridStringyfied = JSON.stringify([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);

		gameboardFactory().placeShip(
			{ name: 'carrier', axis: 'vertical', length: 5 },
			[5, 9],
		);

		expect(JSON.stringify(gameboardFactory().printBoard())).toEqual(
			updatedGridStringyfied,
		);
	});
});
