export const shipFactory = (length) => {
	const body = new Array(length).fill(0);
	const hit = (x) => {
		if (x >= body.length) throw new Error();
		body[x] = 'x';
		return body;
	};
	const isSunk = () => body.every((pos) => pos === 'x');
	return { body, hit, isSunk };
};
