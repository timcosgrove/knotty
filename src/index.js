import { gsap } from "gsap";

import './style.css';

const underlaySVG = require('./images/underlay.svg');

function component() {
   const element = document.createElement('div');
   element.innerHTML = underlaySVG;
    return element;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomRGBString() {
  const r = getRandomInt(256);
  const g = getRandomInt(256);
  const b = getRandomInt(256);

  return `rgb(${r},${g},${b})`;
}


function randomColorFade(element) {
  const tl = gsap.timeline();
  const randomDuration = 1 + Math.random() * 4;
  const randomDelayedCall = Math.random() * 5;
  tl.set(element, {
    delay: randomDelayedCall,
    fill: getRandomRGBString(),
    opacity: 1,
  }).to(element, {
    duration: randomDuration,
    opacity: 0,
    onComplete: randomColorFade,
    onCompleteParams:[element],
  });
}

function randomStrokeWidth(element) {
  const tl = gsap.timeline();
  const strokeWidth = Math.floor(Math.random() * 25);
  tl.set(element, {
    fill: '#FFFFFF',
  });
  tl.to(element, {
    duration: (1 / 30),
    strokeWidth: strokeWidth,
    onComplete: randomStrokeWidth,
    onCompleteParams:[element],
  });
}

document.body.appendChild(component());

const SVGPaths = document.querySelectorAll('svg #rings path, svg #knots path');
SVGPaths.forEach(path => {
  //randomColorFade(path);
  randomStrokeWidth(path);
});

randomColorFade(document.querySelectorAll('svg #background_clear path'));




