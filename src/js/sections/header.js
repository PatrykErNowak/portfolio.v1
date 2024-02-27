import { isMobileView } from '../helpers.js';

// ------------------------------------------------------------
// DOM ELEMENTS
const header = document.querySelector('[data-js="header"]');
const topHeader = document.querySelector('[data-js="header-heading-top"]');
const bottomHeader = document.querySelector(
  '[data-js="header-heading-bottom"]',
);
const subHeading = document.querySelector('[data-js="header-subheading"]');
const scroll = document.querySelector('[data-js="header-scroll"]');
const photo = document.querySelector('[data-js="header-photo"]');

// ---------------------------------------------------------------

const animationHandle = function () {
  const { bottom, height } = header.getBoundingClientRect();
  const fromTopPosPerc = (1 - bottom / height) * 100;
  const photoOpacity = 10;

  /**
   * Calculate visibility, e.g. For passed parameters: (10, 20) => 50 , (5, 20) => 25
   * @param {number} actualPos - Percentage of actual position from top observed DOM object/container.
   * @param {number} endPointPos - Targeted position in percentage from top observed DOM object/container when returned value will be '100'.
   * @returns {number}
   */

  const calcVisibility = function (actualPos, endPointPos) {
    return (actualPos / endPointPos) * 100;
  };
  const visibility = calcVisibility(fromTopPosPerc, 20);
  const scrollVisibility = 100 - calcVisibility(fromTopPosPerc, 50);

  topHeader.style.transform = `translateY(-${visibility}%)`;
  bottomHeader.style.transform = `translateY(${visibility}%)`;
  subHeading.style.opacity = visibility === 0 ? '1' : '0';
  photo.style.opacity = `${visibility < photoOpacity ? photoOpacity : visibility}%`;
  photo.style.filter = `grayscale(${100 - visibility}%)`;
  scroll.style.opacity = `${scrollVisibility}%`;
  scroll.style.pointerEvents = scrollVisibility <= 0 ? 'none' : 'all';
};

const observerOptions = {
  rootMargin: '0px',
  threshold: 0.3,
};

export const controlHeaderAnimation = function () {
  if (isMobileView()) return;

  const controlAnimation = function (entries) {
    const { isIntersecting } = entries[0];

    if (isIntersecting) window.addEventListener('scroll', animationHandle);
    if (!isIntersecting) window.removeEventListener('scroll', animationHandle);
  };

  const observer = new IntersectionObserver(controlAnimation, observerOptions);
  observer.observe(header);
};
