import { addClass, elem, setContent, setInnerHTML } from '../utils/domHelper';
import * as R from 'ramda';
export const setupDOM = () => {
	const header = R.compose(setContent('Battleship'))(elem('header'));

	const main = R.compose(setContent('main'))(elem('main'));

	const footer = R.compose(
		setInnerHTML(
			`Made by
			<a href="https://github.com/nashitshayan" target="_blank"
				>Nashit Shayan Khan</a
			>. Click
			<a href="https://github.com/nashitshayan/battleship" target="_blank"
				>here</a
			>
			to see the code.`,
		),
	)(elem('footer'));

	return [header, main, footer];
};
