export const shipFactory = (length) => {
	const body = new Array(length).fill(0);
	const hit = (x) => {
		if (x >= body.length) throw new Error();
		body[x] = 'hit';
		return body;
	};
	const isSunk = () => body.every((pos) => pos === 'hit');
	return { body, hit, isSunk };
};
