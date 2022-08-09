import { gameController } from './gameController';

describe('Game Controller', () => {
	test('game controller should not return null', () => {
		expect(gameController()).not.toBeNull();
	});
	test('game controller should return an object', () => {
		expect(typeof gameController()).toEqual('object');
	});
	test('correctly place ships on playerOneBoard', () => {
		const initialPlayerOneBoard = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		];
		const game = gameController();
		const { getPlayerOneBoard, placeDummyShipsPlayerOne } = game;
		placeDummyShipsPlayerOne();
		expect(getPlayerOneBoard()).toEqual(initialPlayerOneBoard);
	});
	test('correctly place ships on playerTwoBoard', () => {
		const initialPlayerTwoBoard = [
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];

		const game = gameController();
		const { getPlayerTwoBoard, placeDummyShipsPlayerTwo } = game;
		placeDummyShipsPlayerTwo();
		expect(getPlayerTwoBoard()).toEqual(initialPlayerTwoBoard);
	});
	test('gameController should expose a function to switch player turn', () => {
		const game = gameController('Nashit');
		const { switchTurn, getActivePlayer } = game;
		expect(getActivePlayer().name).toEqual('Nashit');
		switchTurn();
		expect(getActivePlayer().name).toEqual('CPU');
	});
	//test playerRound function -> when it is playerOne's turns, it allows playerOne to send an attack to playeTwoBoard. Test that the attack is registered by checking the playerTwoBoard
	test("When playerOne attacks, mark enemy board as 'x' when hit", () => {
		const game = gameController('Nashit');
		const { playRound, getPlayerTwoBoard, placeDummyShipsPlayerTwo } = game;
		placeDummyShipsPlayerTwo();
		playRound([0, 0]);
		expect(getPlayerTwoBoard()[0][0]).toEqual('x');
	});
	test("When playerOne attacks, mark enemy board as 'o' when miss", () => {
		const game = gameController('Nashit');
		const { playRound, getPlayerTwoBoard, placeDummyShipsPlayerTwo } = game;
		placeDummyShipsPlayerTwo();
		playRound([1, 1]);
		expect(getPlayerTwoBoard()[1][1]).toEqual('o');
	});
	test('CPU should be able to pick a random coordinate', () => {
		const game = gameController('Nashit');
		const { switchTurn, getRandomCoords, getPlayerOneBoard } = game;
		switchTurn();
		const [x, y] = getRandomCoords();
		expect(getPlayerOneBoard()[x][y]).toEqual(0);
	});
});
