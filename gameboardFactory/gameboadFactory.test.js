import { gameboardFactory } from './gameboadFactory';

describe('Gameboard Factory', () => {
	test("Gameboard shouldn't be null", () => {
		expect(gameboardFactory()).not.toBeNull();
	});
	test('Gameboard should be an object', () => {
		expect(typeof gameboardFactory()).toEqual('object');
	});
});
