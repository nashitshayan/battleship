import {
	addClass,
	addId,
	elem,
	setContent,
	setInnerHTML,
	append,
} from '../utils/domHelper';
import * as R from 'ramda';
export const setupDOM = () => {
	const header = R.compose(setContent('Battleship'))(elem('header'));

	const dialogBox = R.compose(addClass('dialogBox'))(elem('section'));

	const boardOneHeader = R.compose(
		setContent('Player Board'),
		addClass('boardHeader'),
	)(elem('h3'));

	const boardTwoHeader = R.compose(
		setContent('CPU Board'),
		addClass('boardHeader'),
	)(elem('h3'));

	const boardOne = R.compose(addClass('board'), addId('boardOne'))(elem('div'));
	const boardTwo = R.compose(addClass('board'), addId('boardTwo'))(elem('div'));

	const boardOneWrapper = R.compose(
		append(boardOne),
		append(boardOneHeader),
	)(elem('div'));

	const boardTwoWrapper = R.compose(
		append(boardTwo),
		append(boardTwoHeader),
	)(elem('div'));

	const boardsWrapper = R.compose(
		append(boardTwoWrapper),
		append(boardOneWrapper),
		addClass('boardsWrapper'),
	)(elem('div'));

	const main = R.compose(append(boardsWrapper))(elem('main'));

	const screenRotateMessage = R.compose(
		setContent(
			'Please turn on landscape mode and rotate your screen to play the game.',
		),
		addClass('screenRotateMessage'),
	)(elem('div'));
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

	return [header, screenRotateMessage, dialogBox, main, footer];
};
