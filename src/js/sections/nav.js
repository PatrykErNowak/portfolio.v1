// --------- NAVIGATION
// Elements
const mobileBtn = document.querySelector('[data-js="nav-mobile-btn"]');
const navlist = document.querySelector('[data-js="nav-list"]');

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
