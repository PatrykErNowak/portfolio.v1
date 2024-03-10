import * as nav from './sections/nav.js';
import * as header from './sections/header.js';
import * as aboutme from './sections/aboutme.js';
import * as projects from './sections/projects.js';
import * as contactme from './sections/contactme.js';
import * as footer from './sections/footer.js';

const init = function () {
  nav.mobileBtnHandler();
  nav.handleNavbarBackground();
  nav.handleScrollSpy();
  header.controlHeaderAnimation();
  aboutme.animateMotto();
  projects.handl3DImgAnimation();
  contactme.formHandler();
  footer.updateYear();
};
init();
