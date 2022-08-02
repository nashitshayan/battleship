import { shipFactory } from './shipFactory';

describe('Ship Factory', () => {
	test('ship factory should return an object', () => {
		expect(typeof shipFactory()).toEqual('object');
	});
	test("ship factory should return an object with a 'body' array", () => {
		expect(Array.isArray(shipFactory(4).body)).toEqual(true);
	});
});
