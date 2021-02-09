import { gsap } from 'gsap';
import Utils from './lib/utils';

import './style/style.css';

const underlaySVG = require('./images/underlay.svg');

function component() {
  const element = document.createElement('div');
  element.innerHTML = underlaySVG;
  return element;
}

function randomColorFade(element, tl = gsap.timeline()) {
  const randomDuration = 1 + Math.random() * 4;
  const randomDelayedCall = Math.random() * 5;
  tl.set(element, {
    delay: randomDelayedCall,
    fill: Utils.getRandomColor(),
    opacity: 1,
  }).to(element, {
    duration: randomDuration,
    opacity: 0,
    onComplete: randomColorFade,
    onCompleteParams: [element, tl],
  });
}

function randomStrokeWidth(element, tl = gsap.timeline()) {
  const strokeWidth = Math.floor(Math.random() * 25);
  tl.set(element, {
    strokeWidth,
  });
  tl.to(element, {
    duration: (1 / 30),
    onComplete: randomStrokeWidth,
    onCompleteParams: [element, tl],
  });
}

document.body.appendChild(component());

function basicColorFades() {
  const SVGPaths = document.querySelectorAll('svg #rings path, svg #knots path');
  SVGPaths.forEach((path) => {
    randomColorFade(path);
    randomStrokeWidth(path);
  });

  randomColorFade(document.querySelectorAll('svg #background_clear path'));
}

basicColorFades();
