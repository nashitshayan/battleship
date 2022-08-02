export const shipFactory = (length) => {
	const body = new Array(length);
	const hit = (x) => {
		if (x >= body.length) throw new Error();
		body[x] = 'hit';
		return body;
	};
	return { body, hit };
};
