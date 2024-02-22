// --------- NAVIGATION
// Elements
const mobileBtn = document.querySelector('[data-js="nav-mobile-btn"]');
const navlist = document.querySelector('[data-js="nav-list"]');

export const mobileBtnHandler = function () {
  mobileBtn.addEventListener('click', (e) => {
    mobileBtn.classList.toggle('is-active');

    navlist.classList.toggle('active');
  });
};
