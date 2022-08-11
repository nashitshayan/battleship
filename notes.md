# Gameboard factory:

## Aug 03, 2022

After reading Bender’s Connect Four article, I got some ideas. The Gameboard will be a 2-d array, and it will call the ship factory and place the ships on the board.

- So the gameboard factory can start off as something like this (I realised later that I wrote the code here before the test lol) :

      const gameboardFactory= (){
      const rows= 10;
      const cols= 10;
      const board= []
      2-d array to represent the board. Initially, the board will be empty (without ships), so each cell will contain 0

      for(let i=0; i<rows; i++){
        board[i]=[];
        for(let j=0; j<cols; j++){
          board[i].push(0);
        }
      }

  }

- Gameboard should return an object with
  - a function to get the board (DONE)
  - a function to print the board on console
  - a function to place ships on the board
  - a function recieveAttack that takes a pair of coords, determines whether or not the attack hit a ship, then sends the hit() function to the correct ship, or records the coordinates of the missed shot.
  - a function to report whether all ships have sunk or not

The gameboard factory instruction says : _“1. Gameboards should be able to place ships at specific coordinates by calling the ship factory function.”_
The ship factory instruction says : _“1. Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.”_

So the assumption is that the ship factory doesn’t do anything else. Well then what about the ship types? Are they specified in the ship factory or is it the gameboard that specifies the ship type and the coordinates where to place them?

- I think they should be passed to the ship factory from gameboard. This is because I think the player should get to choose where a particular ship is placed. For eg: place 'patrol boat' at (5,8).
- So then these two things - coordinates and ship type should come from the gameController, meaning the player. gameController -> placeShip -> ship factory
- This means that this operation of placing ships would have to be done one at a time. The placeShip function will get called for each shipType.
- So the shipType array should be on gameController. We iterate through each ship and ask the player where to place it.
- Player enters the co-ords and we call placeShip to add the ship and then we display the updated gameboard.
- Then repeat for each ship.

SHIP TYPES - Carrier(5), Battleship(4), Destroyer(3), Submarine(3), Patrol Boat(2)

- { name: 'carrier', axis: 'vertical', length: 5 }
- { name: 'battleship', axis: 'horizontal', length: 4 }
- { name: 'destroyer', axis: 'vertical', length: 3 }
- { name: 'submarine', axis: 'horizontal', length: 3 }
- { name: 'patrol boat', axis: 'horizontal', length: 2 }

So, how will the placeShip function work?

- The coordinates will basically be the row and col number.
- The player can choose the coordinates for each ship type.
- The placeShip function takes in the coordinates and the ship type and places the ship on the board.
  - how will it place the ship on the board? Ship factory returns an object
  - We also want the ship to occupy the cells on the board based on its length
  - Also, some ships will be placed horizontally and others vertically. Gotta take care about that too. Hmm
    - maybe shipTypes can be an array of OBJECTS
    - eg: shipTypes= [{name: 'battleship', axis: 'horizontal'}, ...]
    - maybe based on this 'axis' property, placeShip can choose to place them horizontally or vertically

Okay so I have a 10x10 0-filled grid. The ship factory right now returns a ship body which is an array.

- How do I 'place' this ship on the board?
- What I want is that the board gets marked with 1's wherever there is a ship

  - so it should become something like this
  - ```[
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
    ```
  - So first, I'll have to change the ship body array to be an array of 1's initially. And on every hit, replace with an "x", when the whole array gets filled with 'x's then the ship is sunk
  - I'll also need to do something so that based on the shipType from the param, a ship body of a particular length is created.
    - maybe have an object that that maps shipTypes to their length.
    - `eg: const shipLength= {'battleship': 4,//etc}`
    - then-> const shipBody= new Array(shipLength[shipType]).fill(1)
  - As for placing the ship on the board, I can iterate through the returned body array and mark the spots on the board with the values (1's). But then how to deal with hits and updating the board?
  - the ship factory should take in Type and Length.

#### TODOs:

- [x] test if gameboard factory returns a method that will give us an empty 10x10 board (filled with zeros) - gameboard should create this 0 filled 2-d grid and have a fn to get the board. - how to test it tho? - the return value will be a 2-d array filled with zeroes. Ofc another 2-d array filled with 0's will not be equal to this because js compares non-primitive values by reference. - lol, found a nice hack on stack overflow - JSON.stringyfy the arrays and then compare! (Update from future: I decided to just compare the arrays themselves using jest's .toEqual() function)

## Aug 5, 2022

So Toby suggested that references of the ship object can be stored in the board cells. This changes things. Till now I thought of the ships being an array but now they can just be an object with 'hit' and 'type' properties. eg: { hit: true, type: 'carrier'}
The info about the ship length and their orientation would then be in passed to gameBoard or be in Gameboard.
So based on the type, length and orientation, placeShip can add that many ship objects on the board.

## Aug 6, 2022

- I've successfully managed to 'place' ships- either horizontally or vertially. Yay.
- Now, the way TOP instructions have specified that shipFactory should have the hit and isSunk function doesn't makes sense to me. Having a ship body array seems useless and I an't figure out how I will register hits and make isSunk work.
  - So I've decided to change stuff.
    - Ship factory now will only return an object like this : {isHit: false, name: 'carrier'}
    - GameBoard will handle work like hit and isSunk
    - So initially, placeShip is called with the starting coord and ship details, and it places the ship (references to the ship object)
    - Then when RecieveAtack takes the coords : it will check if at that particular position on the board there's an object reference or not.
      -If yes
      -It will call hit(obj), that will set 'isHit' of that object to 'true' - After this it will call isSunk(shipName), that will check if all the ship objects with that name have sunk or not (isHit should be true for all) - after that it will check if ALL the ship objects have sunk or not;
      -If No - It will mark that position on board as 'miss' or 'O'

#### TODOs:

- [x] Test the placeShip function

  - How, lol? It's an incoming 'command' message, it changes the internal state but does not return anything back.
  - Maybe we call this function inside the test with the params and then expect the board to be filled with the ship
  - Eg:

    ````test('placeShip should place a ship on the gameboard', () => {
        let updatedGrid = ([
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
        expect((gameboardFactory().getBoard())).toEqual(updatedGrid);
        });```


    ````

## Aug 07, 2022

- I encountered an issue with the way I'm implementing the placeShips functionality. Opposing the standard top-to-bottom and left-to-right approach when placing the ship objects, I went with extend-in-opposite-directions approach.
  - What that basically means is that normally, if the player wants to place a ship at (3,3) (note that this is (rowNo, colNo) and the ship has axis: 'vertical' and length 3 - then the ship objects placement would look like this : (3,3),(4,3),(5,3),(6,3) i.e from the chosen coordinate, go top-to-down along that axis.
  - But what I went with was that given the same inputs , the ship objects would be placed at -> (1,3),(2,3),(3,3),(4,3) i.e. from the chosen coordinate, go one-up-one-down along that axis
  - Same for when the ship axis is horizontal, difference being instead of left-to-right, it would be one-before-one-after.

#### TODOs:

- [x] Change ship factory to return object like {isHit: false, 'carrier'}
- [x] Change/Remove the relevant tests for this as well
- [x] Change the printBoard (update: renamed to getBoardWithValues) function to check if the element is an object or not, based on that print 'X' for hit and '1' for default. Rest elements should be '0'
- [x] Change/remove the relevant tests for this.
- [x] Add test for Recieve attack
- [x] test isShipSunk
- [x] test areAllShipsSunk

## Aug 08, 2022

(Thoughts continued to from yesterday)

- Now, the conditions I put in were that if it encounters the end of that row or column, then just proceed to add remaining ship objects in the other direction.
- So let's say the player wanted to place the ship (carrier, vertical, length 5) at (1,1). Now, following the one-above-one-below procedure, the ship object placement would go like : (1,1), (0,1), (2,1), now because (-1,1) isn't possible, rest objects are placed at (3,1)(4,1)
- Same thing for horizontal placement.
- So I did this and was pretty happy with it. Went on to implement recieveAttack and that worked well too.
- Then when I was about to get the gameController going, it struck me that I hadn't given any thought to deal with the scenario where, during ship object placement, another ship object of different ship is encountered. It is quite likely.
- Then after trying and failing to put in a condition for this, I realized it's better to just revert back to the conventional top-to-down and left-to-right placement.
- This would, first of all, make it easy to handle the edge-of-board condition, because I'll only have to check in one direction.
- Now, as for encountering another ship object in the path, for now I've come up with functions that will check all cells in that path and if any of them is an object then we simply return and don't do anything.

#### TODOs

- [x] change/remove relevant tests for placeShip functionality
- [x] re rewrite the placeship logic with new approach
- [x] handle board-edge and ship-overlap cases
- [x] refactor if possible
- [x] make all tests pass

## Aug 09, 2022

So I've decided that I don't need a player factory. Instead all this would be managed inside the gameController. Things that gameController should :

- have an array of ships with their details.
- Make gameboard for playerOne
- Populate playerOneBoard
- Make gameboard for playerTwo (CPU)
- Populate playerTwoBoard
- Have an active player
- Have a function to switch the active player
- Have a function to get active player (return this)
- Have a printRound function
- Have a playround function (return this)
- Have a function that allows CPU to make legal random plays

#### TODOs:

- [x] test that ships have been placed on playerOneBoard
- [x] test that ships have been placed on playerTwoBoard
- [x] test switchTurn function
- [x] test cpu play function
- [x] test playerRound function -> when it is playerOne's turns, it allows playerOne to send an attack to playeTwoBoard. Test that the attack is registered by checking the playerTwoBoard
- [x] test playerRound function -> when it is playerTwo's turns, it allows playerTwo to send an attack to playerOneBoard. Test that the attack is registered by checking the playerTwoBoard

## Aug 10, 2022

I need to start with the UI now. There will be a screenController that will build the UI. Since I'm using webpack, I'll have to build the basic HTML markup using JS, so I will do that in the index.js file. Or maybe have a domSetup module. The screenController will

- initialize the gameController()
- have an updateScreen method to re render the boards with updated data
- add event listener on the player board

The setupDOM module should :

- make containers for header, boards, footer and append them all to the body
- add relevant classes and ids

#### TODOs:

- [x] add test for winning condition in playRound
- [x] add and style header
- [x] add and style footer
- [x] add setupDOM module to build basic HTML skeleton

## Aug 11, 2022

Not much to think about today. Things are pretty straightforward. An update screen pattern will be followed, with every change in state, a function will re render the UI with updated values. This will involve marking the boards as 'miss' and 'hit'. The game winner message wil also be inside this function

Some additional things I'd like to add for now :

- A 'how to play' dropdown that will entail the game rules and also the color scheme for 'ship', 'ship-hit', and 'ship-miss'
-

#### TODOs:

- [x] add and style board
- [x] add and style dialog box
- [x] add updateScreen function to screenController
- [x] add eventlistener to cpuBoard, that allows playerOne to attack the board.
- [x] add functionality to handle game over
- [] add How to Play dropdown tab
