import { isMobileView } from '../helpers.js';

const aboutmeSection = document.querySelector('[data-js="aboutme"]');
const mottoEl = document.querySelector('[data-js="my-motto"]');
const mottoElQuotes = document.querySelectorAll('[data-js="my-motto__quote"]');

const animateTextTyping = function (element, textToType) {
  return new Promise((resolve, reject) => {
    const textToAnimate = textToType || element.innerText;
    const time = 100;
    let i = 0;

    // Clear before typing animation
    element.innerHTML = '';

    const typeText = function (str) {
      i++;
      mottoEl.textContent = str.slice(0, i);
      if (i === str.length) {
        clearInterval(animation);
        resolve();
      }
    };

    const animation = setInterval(() => {
      typeText(textToAnimate);
    }, time);
  });
};

export const animateMotto = function () {
  if (isMobileView()) return;

  const textToType = mottoEl.innerText;
  mottoElQuotes.forEach((q) => (q.style.opacity = '0'));
  mottoEl.innerHTML = '';

  const controlAnimation = async function (entries) {
    const { isIntersecting, target } = entries[0];

    if (isIntersecting) {
      observer.unobserve(target);
      mottoEl.dataset.typeText = true;
      await animateTextTyping(mottoEl, textToType);
      mottoElQuotes.forEach((q) => (q.style.opacity = '1'));
      mottoEl.dataset.typeText = false;
    }
  };

  const options = { rootMargin: '0px', threshold: 0.75 };

  const observer = new IntersectionObserver(controlAnimation, options);
  observer.observe(aboutmeSection);
};
