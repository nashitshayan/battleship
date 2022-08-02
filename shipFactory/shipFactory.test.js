import { shipFactory } from './shipFactory';

describe('Ship Factory', () => {
	test('ship should not be Null', () => {
		expect(shipFactory()).not.toBeNull();
	});
	test('ship should be an object', () => {
		expect(typeof shipFactory()).toEqual('object');
	});
	test("ship should have a 'body' array", () => {
		expect(Array.isArray(shipFactory().body)).toEqual(true);
	});
	test("ship should take a 'length' and return a 'body' array of that length", () => {
		expect(shipFactory(4).body.length).toEqual(4);
	});
});
