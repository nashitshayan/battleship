import { gameboardFactory } from './gameboadFactory';

describe('Gameboard Factory', () => {
	test("Gameboard shouldn't be null", () => {
		expect(gameboardFactory()).not.toBeNull();
	});
	test('Gameboard should be an object', () => {
		expect(typeof gameboardFactory()).toEqual('object');
	});
	test('Gameboard should expose a function that gives us the initial 10x10 0-filled grid', () => {
		let initialGrid = [
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
		];
		const gameboard = gameboardFactory();
		const { getBoardWithValues } = gameboard;
		expect(getBoardWithValues()).toEqual(initialGrid);
	});
	test('placeShip should place a ship vertically on the gameboard, evenly extending it on the x axis around x-coord', () => {
		let updatedGrid = [
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
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [4, 2]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	test('When placing the ship vertically, extend the ship correctly along x-axis when x-coord is closer to 10', () => {
		let updatedGrid = [
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
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [8, 1]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	test('When placing the ship vertically, extend the ship correctly along x-axis when x-coord is closer to 10', () => {
		let updatedGrid = [
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
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [1, 1]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	// //hori
	test('placeShip should place a ship horizontally on the gameboard, evenly extending it on the y-axis around y-coord', () => {
		let updatedGrid = [
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
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 3]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	test('When placing the ship horizontally, extend the ship correctly along y-axis when y-coord is closer to 10', () => {
		let updatedGrid = [
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
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 1]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	test('When placing the ship horizontally, extend the ship correctly along y-axis when y-coord is closer to 0', () => {
		let updatedGrid = [
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
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 8]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	test("recieveAttack function should take coordinates and mark 'x' for hit", () => {
		let updatedGrid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 'x', 1, 1, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues, receiveAttack } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 8]);
		receiveAttack([1, 6]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	test("recieveAttack function should take coordinates and mark 'o' for miss", () => {
		let updatedGrid = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
			[0, 0, 'o', 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues, receiveAttack } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 8]);
		receiveAttack([2, 2]);
		expect(getBoardWithValues()).toEqual(updatedGrid);
	});
	test('isShipSunk function should report if a particular ship has sunk or not', () => {
		// let updatedGrid = [
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 'x', 'x', 'x', 'x'],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// ];
		const gameboard = gameboardFactory();
		const { placeShip, receiveAttack, isShipSunk } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 8]);
		receiveAttack([1, 6]);
		receiveAttack([1, 7]);
		receiveAttack([1, 8]);
		receiveAttack([1, 9]);
		expect(isShipSunk('battleship')).toEqual(true);
	});
	test('areAllShipsSunk should function report if all ships on the board have been sunk or not', () => {
		// let updatedGrid = [
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 'x', 'x', 'x', 'x'],
		// 	[0, 'x', 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 'x', 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 'x', 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 'x', 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 'x', 0, 'x', 'x', 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// ];
		const gameboard = gameboardFactory();
		const { placeShip, receiveAttack, areAllShipsSunk } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 8]);
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [4, 1]);
		placeShip({ name: 'patrol boat', axis: 'horizontal', length: 2 }, [6, 4]);
		receiveAttack([1, 6]);
		receiveAttack([1, 7]);
		receiveAttack([1, 8]);
		receiveAttack([1, 9]);

		receiveAttack([2, 1]);
		receiveAttack([3, 1]);
		receiveAttack([4, 1]);
		receiveAttack([5, 1]);
		receiveAttack([6, 1]);

		receiveAttack([6, 3]);
		receiveAttack([6, 4]);

		expect(areAllShipsSunk()).toEqual(true);
	});
});
