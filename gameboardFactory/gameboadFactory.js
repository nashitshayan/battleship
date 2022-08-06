import { shipFactory } from '../shipFactory/shipFactory';
export const gameboardFactory = () => {
	const rows = 10;
	const cols = 10;
	const board = [];
	//create a 2-d array filled with 0's. This will be our initial gameboard
	for (let i = 0; i < rows; i++) {
		board[i] = [];
		for (let j = 0; j < cols; j++) {
			board[i].push(0);
		}
	}

	const getBoard = () => board;
	const placeShip = (shipType, coordinates) => {
		const { name, axis, length } = shipType;
		const [x_coord, y_coord] = coordinates;

		let count = 0;
		let i = 1;
		//regardless of axis, the ship has to be placed at (x,y)
		board[x_coord][y_coord] = shipFactory(length, name);

		while (count < length - 1) {
			if (axis === 'vertical') {
				if (x_coord - i >= 0) {
					board[x_coord - i][y_coord] = shipFactory(length, name);
					count++;
					if (count >= length - 1) break;
				}
				if (x_coord + i < 10) {
					board[x_coord + i][y_coord] = shipFactory(length, name);
					count++;
					if (count >= length - 1) break;
				}
				i++;
			}
			if (axis === 'horizontal') {
				if (y_coord - i >= 0) {
					board[x_coord][y_coord - i] = shipFactory(length, name);
					count++;
					if (count >= length - 1) break;
				}
				if (y_coord + i < 10) {
					board[x_coord][y_coord + i] = shipFactory(length, name);
					count++;
					if (count >= length - 1) break;
				}
				i++;
			}
		}
		return { printBoard };
	};
	const printBoard = () => {
		const boardWithValues = board.map((row) =>
			row.map((cell) => {
				if (cell) return cell.getShip()[0];
				return cell;
			}),
		);
		return boardWithValues;
	};
	return { getBoard, placeShip, printBoard };
};

/**
Gameboard factory:
After reading Bender’s Connect Four article, I got some ideas. The Gameboard will be a 2-d array, and it will call the ship factory and place the ships on the board. 
- So the gameboard factory can start off as something like this :
- (I realised later that I wrote the code here before the test lol)
```
const gameboardFactory= (){
	const rows= 10;
	const cols= 10;
	const board= []

	// 2-d array to represent the board. Initially, the board will be empty (without ships), so each cell will contain 0

	for(let i=0; i<rows; i++){
		board[i]=[];
		for(let j=0; j<cols; j++){
			board[i].push(0);
		}
	}
	
}
```
- Gameboard should return an object with 
	- a function to get the board (DONE)
	- a function to print the board on console
	- a function to place ships on the board
	- a function recieveAttack that takes a pair of coords, determines whether or not the attack hit a ship, then sends the hit() function to the correct ship, or records the coordinates of the missed shot.
	- a function to report whether all ships have sunk or not 


*“1. Gameboards should be able to place ships at specific coordinates by calling the ship factory function.”*

The ship factory instruction says : *“1. Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.”* 

So the assumption is that the ship factory doesn’t do anything else. Well then what about the ship types? Are they specified in the ship factory or is it the gameboard that specifies the ship type and the coordinates where to place them?
	- I think they should be passed to the ship factory from gameboard. 
	- This is because I think the player should get to choose where a particular ship is placed. 
		- for eg: place 'patrol boat' at (5,8)
	- So then these two things - coordinates, ship type should come from the gameController, meaning the player.
	- gameController -> placeShip -> ship factory
	- This means that this operation of placing ships would have to be done one at a time. The placeShip function will get called for each shipType. 
	- so the shipType array should be on gameController. We iterate through each ship and ask the player where to place it. 
	- Player enters the co-ords and we call placeShip to add the ship and then we display the updated gameboard. Then repeat for each ship.
	
-- SHIP TYPES - Carrier(5), Battleship(4), Destroyer(3), Submarine(3), Patrol Boat(2)
	- { name: 'carrier', axis: 'vertical', length: 5 }
	- { name: 'battleship', axis: 'horizontal', length: 4 }
	- { name: 'destroyer', axis: 'vertical', length: 3 }
	- { name: 'submarine', axis: 'horizontal', length: 3 }
	- { name: 'patrol boat', axis: 'horizontal', length: 2 }
	
So, how will the placeShip function work? 

- The coordinates will basically be the row and col number.
- The player can choose the coordinates for each ship type.
- * the placeShip function takes in the coordinates and the ship type and places the ship on the board. 
	- how will it place the ship on the board? Ship factory returns an object
	- we also want the ship to occupy the cells on the board based on its length
	
	- also, some ships will be placed horizontally and others vertically. Gotta take care about that too. Hmm
		- maybe shipTypes can be an array of OBJECTS
		- eg: shipTypes= [{name: 'battleship', axis: 'horizontal'}, ...]
		- maybe based on this 'axis' property, placeShip can choose to place them horizontally or vertically

	- okay so I have a 10x10 0-filled grid. The ship factory right now returns a ship body which is an array.
	- How do I 'place' this ship on the board?
	- What I want is that the board gets marked with 1's wherever there is a ship
		- so it should become something like this 
		- [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
		]
		- So first, I'll have to change the ship body array to be an array of 1's initially. And on every hit, replace with an "x", when the whole array gets filled with 'x's then the ship is sunk
		- I'll also need to do something so that based on the shipType from the param, a ship body of a particular length is created. 
			- maybe have an object that that maps shipTypes to their length.
			- eg: const shipLength= {
				'battleship': 4,
				//etc
			}
			- then-> const shipBody= new Array(shipLength[shipType]).fill(1)
		
		- As for placing the ship on the board, I can iterate through the returned body array and mark the spots on the board with the values (1's). But then how to deal with hits and updating the board?
		- the ship factory should take in Type and Length.

	- Aug 5, 2022
		- So Toby suggested that references of the ship object can be stored in the board cells. This changes things. Till now I thought of the ships being an array but now they can just be an object with 'hit' and 'type' properties. 
			-eg: { hit: true, type: 'carrier'}
		- The info about the ship length and their orientation would then be in passed to gameBoard or be in Gameboard. 
		- So based on the type, length and orientation, placeShip can add that many ship objects on the board. 
	

	TODO:
	-(DONE) test if gameboard factory returns a method that will give us an empty 10x10 board (filled with zeros)
		- gameboard should create this 0 filled 2-d grid and have a fn to get the board.
		- how to test it tho?
			- the return value will be a 2-d array filled with zeroes. Ofc another 2-d array filled with 0's will not be equal to this because js compares non-primitive values by reference. 
			- lol, found a nice hack on stack overflow
				- JSON.stringyfy the arrays and then compare!
	- test the placeShip function
		- how, lol?
		- it's an incoming 'command' message, it changes the internal state but does not return anything back.
		- maybe we call this function inside the test with the params and then expect the board to be filled with the ship
		- eg: 
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
				
				gameboardFactory().placeShip({name: 'carrier', axis: 'vertical'}, 5,9);

				expect(JSON.stringify(gameboardFactory().getBoard())).toEqual(
				updatedGridStringyfied,
				);
			});
		- change the ship factory
			- remove the ship body
			- instead have a isHit variable, and return something like {isHit, hit, is}
 */
