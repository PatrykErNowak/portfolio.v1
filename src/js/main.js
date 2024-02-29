import * as nav from './sections/nav.js';
import * as header from './sections/header.js';
import * as contactme from './sections/contactme.js';
import * as footer from './sections/footer.js';

const init = function () {
  nav.mobileBtnHandler();
  header.controlHeaderAnimation();
  footer.updateYear();
};
init();
