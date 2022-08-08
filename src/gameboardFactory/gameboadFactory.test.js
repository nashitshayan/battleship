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
	test('placeShip should place a ship vertically on the gameboard, top-to-down from the chosen coordinate', () => {
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [2, 2]);
		expect(getBoardWithValues()[2][2]).toEqual(1);
		expect(getBoardWithValues()[3][2]).toEqual(1);
		expect(getBoardWithValues()[4][2]).toEqual(1);
		expect(getBoardWithValues()[5][2]).toEqual(1);
		expect(getBoardWithValues()[6][2]).toEqual(1);
	});

	test('placeShip should place a ship horizontally on the gameboard, left-to-right from the chosen coordinate', () => {
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 1]);
		expect(getBoardWithValues()[1][1]).toEqual(1);
		expect(getBoardWithValues()[1][2]).toEqual(1);
		expect(getBoardWithValues()[1][3]).toEqual(1);
		expect(getBoardWithValues()[1][4]).toEqual(1);
	});
	test("When placing the ship vertically, if another ship object is encountered, then don't place any ships", () => {
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'destroyer', axis: 'horizontal', length: 3 }, [4, 1]);
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [2, 1]);
		expect(getBoardWithValues()[2][1]).toEqual(0);
		expect(getBoardWithValues()[3][1]).toEqual(0);
		// not checking [4][1] because destroyer will be there
		expect(getBoardWithValues()[5][1]).toEqual(0);
		expect(getBoardWithValues()[6][1]).toEqual(0);
	});
	test("When placing the ship horizontally, if another ship object is encountered, then don't place any ships", () => {
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues } = gameboard;
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [2, 1]); // (2,1),(3,1),(4,1),(5,1),(6,1)
		placeShip({ name: 'destroyer', axis: 'horizontal', length: 3 }, [3, 0]);
		expect(getBoardWithValues()[3][0]).toEqual(0);
		// not checking (3,1) because carrier will be there
		expect(getBoardWithValues()[3][2]).toEqual(0);
	});

	test("recieveAttack function should take coordinates and mark 'x' for hit", () => {
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues, receiveAttack } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 6]);
		receiveAttack([1, 6]);
		expect(getBoardWithValues()[1][6]).toEqual('x');
	});
	test("recieveAttack function should take coordinates and mark 'o' for miss", () => {
		const gameboard = gameboardFactory();
		const { placeShip, getBoardWithValues, receiveAttack } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 6]);
		receiveAttack([2, 2]);
		expect(getBoardWithValues()[2][2]).toEqual('o');
	});
	test('isShipSunk function should report if a particular ship has sunk or not', () => {
		const gameboard = gameboardFactory();
		const { placeShip, receiveAttack, isShipSunk } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 6]);
		receiveAttack([1, 6]);
		receiveAttack([1, 7]);
		receiveAttack([1, 8]);
		receiveAttack([1, 9]);
		expect(isShipSunk('battleship')).toEqual(true);
	});
	test('areAllShipsSunk should function report if all ships on the board have been sunk or not', () => {
		const gameboard = gameboardFactory();
		const { placeShip, receiveAttack, areAllShipsSunk } = gameboard;
		placeShip({ name: 'battleship', axis: 'horizontal', length: 4 }, [1, 6]);
		placeShip({ name: 'carrier', axis: 'vertical', length: 5 }, [2, 1]);
		placeShip({ name: 'patrol boat', axis: 'horizontal', length: 2 }, [6, 3]);
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
