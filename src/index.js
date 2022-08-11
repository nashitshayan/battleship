import { gameController } from './gameController/gameController';
import { setupDOM } from './setupDOM/setupDOM';
import './css/styles.css';
import { screenController } from './screenController/screenController';
(() => {
	document.body.append(...setupDOM());
	screenController();
})();
