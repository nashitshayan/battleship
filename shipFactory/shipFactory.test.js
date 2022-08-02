import { shipFactory } from './shipFactory';

describe('Ship Factory', () => {
	test('ship factory should return an object', () => {
		expect(typeof shipFactory()).toEqual('object');
	});
});
