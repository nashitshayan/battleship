// export const shipFactory = (length, name) => {
// 	const ship = new Array(length).fill(1);
// 	const getName = () => name;
// 	const getShip = () => ship;
// 	const hit = (x) => {
// 		if (x >= ship.length) throw new Error();
// 		ship[x] = 'x';
// 		return ship;
// 	};
// 	const isSunk = () => ship.every((pos) => pos === 'x');
// 	return { getShip, getName, hit, isSunk };
// };
export const shipFactory = (name) => {
	return { isHit: false, name };
};
