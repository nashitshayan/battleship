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
	test("ship should have a 'hit' function that takes a value and marks that postion as 'hit ", () => {
		expect(shipFactory(4).hit(2)[2]).toEqual('hit');
	});
	test("'hit' function shouldn't be able to extend the ship body", () => {
		expect(() => shipFactory(4).hit(5)[5]).toThrow();
	});
	test("ship should have a 'isSunk' function that checks whether all positions have been 'hit'", () => {
		expect(shipFactory(4).isSunk()).toBe(false);
	});
	test("ship should 'sink' when all position are 'hit", () => {
		const ship = shipFactory(4);
		ship.hit(0);
		ship.hit(1);
		ship.hit(2);
		ship.hit(3);
		expect(ship.isSunk()).toBe(true);
	});
});
