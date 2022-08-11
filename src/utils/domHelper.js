import * as R from 'ramda';

const elem = (tag) => document.createElement(tag);
const grab = (tag) => document.querySelector(tag);
const chilrenArr = (parent) => Array.from(parent.children);

const addClass = R.curry((className, element) => {
	element.classList.add(className);
	return element;
});
const addId = R.curry((idName, element) => {
	element.id = idName;
	return element;
});
const attr = R.curry((attrName, attrVal, element) => {
	element.setAttribute(attrName, attrVal);
	return element;
});
const append = R.curry((node, element) => {
	element.appendChild(node);
	return element;
});

const setInnerHTML = R.curry((content, element) => {
	element.innerHTML = content;
	return element;
});
const setContent = R.curry((content, element) => {
	element.textContent = content;
	return element;
});
const setStyle = R.curry((prop, value, element) => {
	element.style[prop] = value;
	return element;
});

const setGridTemplate = R.curry((value, element) => {
	element.style.setProperty('--sideLength', value);
	return element;
});

const on = R.curry((eventType, fn, element) => {
	element.addEventListener(eventType, fn);
	return element;
});
const off = R.curry((eventType, fn, element) =>
	element.removeEventListener(eventType, fn),
);
const toggleClass = R.curry((cName, element) => {
	element.classList.toggle(cName);
	return element;
});
export {
	elem,
	grab,
	chilrenArr,
	addClass,
	toggleClass,
	addId,
	attr,
	append,
	setInnerHTML,
	setContent,
	setStyle,
	setGridTemplate,
	on,
	off,
};
