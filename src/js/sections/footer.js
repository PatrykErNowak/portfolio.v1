const spanYear = document.querySelector('[data-js="footer-year"]');

export const updateYear = function () {
  const actualYear = new Date().getFullYear();
  spanYear.innerHTML = actualYear;
};
