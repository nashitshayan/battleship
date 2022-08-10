import { gameController } from './gameController/gameController';
import { setupDOM } from './setupDOM/setupDOM';
import './css/styles.css';
(() => {
	document.body.append(...setupDOM());
})();
