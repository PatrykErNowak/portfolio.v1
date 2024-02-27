import * as nav from './sections/nav.js';
import * as header from './sections/header.js';

const init = function () {
  nav.mobileBtnHandler();
  header.controlHeaderAnimation();
};
init();
