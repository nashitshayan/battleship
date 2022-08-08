import { shipFactory } from './shipFactory';

describe('Ship Factory', () => {
	test('ship should not be Null', () => {
		expect(shipFactory()).not.toBeNull();
	});
	test('ship should be an object', () => {
		expect(typeof shipFactory()).toEqual('object');
	});
	test('ship should have an isHit property', () => {
		const carrier = shipFactory('carrier');
		expect(carrier.hasOwnProperty('isHit')).toEqual(true);
	});
	test('ship should have a name', () => {
		const carrier = shipFactory('carrier');
		expect(carrier.name).toEqual('carrier');
	});
	// test("ship should have a 'ship' array", () => {
	// 	expect(Array.isArray(shipFactory().getShip())).toEqual(true);
	// });
	// test("shipFactory should take a 'length' and return a 'ship' array of that length", () => {
	// 	expect(shipFactory(4).getShip().length).toEqual(4);
	// });
	// test("shipFactory should take a 'name' and return an object with the name property", () => {
	// 	expect(shipFactory(4, 'battleship').getName()).toEqual('battleship');
	// });
	// test("ship should have a 'hit' function that takes a value and marks that postion as 'x' ", () => {
	// 	expect(shipFactory(4).hit(2)[2]).toEqual('x');
	// });
	// test("'hit' function shouldn't be able to extend the ship body", () => {
	// 	expect(() => shipFactory(4).hit(5)[5]).toThrow();
	// });
	// test("ship should have a 'isSunk' function that checks whether all positions have been 'hit'", () => {
	// 	expect(shipFactory(4).isSunk()).toBe(false);
	// });
	// test("ship should 'sink' when all position are 'hit", () => {
	// 	const ship = shipFactory(4);
	// 	ship.hit(0);
	// 	ship.hit(1);
	// 	ship.hit(2);
	// 	ship.hit(3);
	// 	expect(ship.isSunk()).toBe(true);
	// });
});
