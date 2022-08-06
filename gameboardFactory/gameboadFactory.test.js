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
	test('placeShip should place a ship vertically on the gameboard, evenly extending it on the x axis around x-coord', () => {
		let updatedGridStringyfied = JSON.stringify([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);

		expect(
			JSON.stringify(
				gameboardFactory()
					.placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [4, 2])
					.printBoard(),
			),
		).toEqual(updatedGridStringyfied);
	});
	test('When placing the ship vertically, extend the ship correctly along x-axis when x-coord is closer to 10', () => {
		let updatedGridStringyfied = JSON.stringify([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		]);

		expect(
			JSON.stringify(
				gameboardFactory()
					.placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [8, 1])
					.printBoard(),
			),
		).toEqual(updatedGridStringyfied);
	});
	test('When placing the ship vertically, extend the ship correctly along x-axis when x-coord is closer to 10', () => {
		let updatedGridStringyfied = JSON.stringify([
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);

		expect(
			JSON.stringify(
				gameboardFactory()
					.placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [1, 1])
					.printBoard(),
			),
		).toEqual(updatedGridStringyfied);
	});
	//hori
	test('placeShip should place a ship horizontally on the gameboard, evenly extending it on the y-axis around y-coord', () => {
		let updatedGridStringyfied = JSON.stringify([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);

		expect(
			JSON.stringify(
				gameboardFactory()
					.placeShip(
						{ name: 'battleship', axis: 'horizontal', length: 4 },
						[1, 3],
					)
					.printBoard(),
			),
		).toEqual(updatedGridStringyfied);
	});
	test('When placing the ship horizontally, extend the ship correctly along y-axis when y-coord is closer to 10', () => {
		let updatedGridStringyfied = JSON.stringify([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);

		expect(
			JSON.stringify(
				gameboardFactory()
					.placeShip(
						{ name: 'battleship', axis: 'horizontal', length: 4 },
						[1, 1],
					)
					.printBoard(),
			),
		).toEqual(updatedGridStringyfied);
	});
	test('When placing the ship horizontally, extend the ship correctly along y-axis when y-coord is closer to 0', () => {
		let updatedGridStringyfied = JSON.stringify([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);

		expect(
			JSON.stringify(
				gameboardFactory()
					.placeShip(
						{ name: 'battleship', axis: 'horizontal', length: 4 },
						[1, 8],
					)
					.printBoard(),
			),
		).toEqual(updatedGridStringyfied);
	});
});
