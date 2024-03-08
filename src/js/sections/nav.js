import { isMobileView } from '../helpers.js';

// --------- NAVIGATION
// Elements
const mobileBtn = document.querySelector('[data-js="nav-mobile-btn"]');
const navlist = document.querySelector('[data-js="nav-list"]');
const navLinks = document.querySelectorAll('[data-js="nav-link"]');
const sections = document.querySelectorAll('[data-spy="section"]');

// -------------------------------------------------------------------

const toggleMobileNav = function () {
  mobileBtn.classList.toggle('is-active');
  navlist.classList.toggle('active');
};

const clickLinkHandle = function (e) {
  const isLink = e.target.hasAttribute('href');

  if (!isLink) return;

  toggleMobileNav();
  navlist.removeEventListener('click', clickLinkHandle);
};

// -------------------------------------------------------------------
// Export

export const mobileBtnHandler = function () {
  mobileBtn.addEventListener('click', (e) => {
    toggleMobileNav();
    navlist.addEventListener('click', clickLinkHandle);

    // A11Y
    const isExpanded =
      mobileBtn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false';
    mobileBtn.setAttribute('aria-expanded', isExpanded);
  });
};

export const handleScrollSpy = function () {
  if (isMobileView()) return;

  const handleActiveSection = function (entries) {
    entries.forEach((entry) => {
      const { isIntersecting, target } = entry;
      const activeNav = document.querySelector(`a[href='#${target.id}']`);

      if (isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        activeNav.classList.add('active');
      }

      if (!isIntersecting) {
        activeNav.classList.remove('active');
      }
    });
  };

  const options = {
    rootMargin: '0px',
    threshold: [0.4, 0.7, 0.9],
  };

  const spyObserver = new IntersectionObserver(handleActiveSection, options);
  sections.forEach((section) => spyObserver.observe(section));
};
