import { isMobileView } from '../helpers.js';

const imgs3D = document.querySelectorAll('[data-js="img3D"]');

const rotate3dElement = function (e, target, maxDegrees, scale) {
  const rotateYposition =
    ((e.layerX / target.scrollWidth) * 2 - 1) * maxDegrees;
  const rotateXposition =
    ((e.layerY / target.scrollHeight) * 2 - 1) * maxDegrees;

  target.style.transform = `perspective(1200px) rotateX(${rotateXposition}deg) rotateY(${-rotateYposition}deg) scale3d(${scale}, ${scale}, ${scale})`;
};

export const handl3DImgAnimation = function () {
  if (isMobileView()) return;

  imgs3D.forEach((img) => {
    const screenCentralPoint = window.screen.width / 2;
    const isLeft = img.getBoundingClientRect().right < screenCentralPoint;
    const rotateY = isLeft ? '' : '-';

    img.addEventListener('mousemove', (e) => {
      img.style.transition = 'transform 100ms ease';
      rotate3dElement(e, img, 10, 1.05);
    });
    img.addEventListener('mouseout', (e) => {
      img.style.transition = 'transform 300ms ease';
      img.style.transform = `perspective(1200px) rotateX(-2deg) rotateY(${rotateY}7deg) scale3d(1.05, 1.05, 1)`;
    });
  });
};
