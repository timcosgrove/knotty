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
  const randomDuration = Math.random() * 4;
  const randomDelayedCall = Math.random() * 1;
  tl.set(element, {
    delay: randomDelayedCall,
    fill: Utils.getRandomColor({ hue: 100 }),
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
    stroke: '#FFFFFF',
  });
  tl.to(element, {
    duration: (1 / 30),
    onComplete: randomStrokeWidth,
    onCompleteParams: [element, tl],
  });
}

document.body.appendChild(component());

function basicColorFades() {
  window.exTl = gsap.timeline();
  window.gsapGlobalTimeline = gsap.globalTimeline;

  const SVGPaths = document.querySelectorAll('svg #knots path');
  SVGPaths.forEach((path) => {
    randomColorFade(path);
    randomStrokeWidth(path);
  });

  randomColorFade(document.querySelectorAll('svg #rings path'), window.exTl);
}

// Filter, sort and group objects based on data-attrs.
function sortGroupPaths(elements, dataAttr) {
  const sortedElements = [];
  elements.forEach((element) => {
    if (element.dataset[dataAttr]) {
      sortedElements[element.dataset[dataAttr]] = sortedElements[element.dataset[dataAttr]]
        || [];
      sortedElements[element.dataset[dataAttr]].push(element);
    }
  });
  return sortedElements;
}

// Given groups of sequential items, run a linear sequence through each simultaneously.
// @todo: make this operate on one group only; this shouldn't assume sets of groups.
function linearSequence(groups) {
  groups.forEach((group) => {
    if (group.length) {
      const groupWrap = gsap.utils.wrap(group);
      const colorWrap = gsap.utils.wrap(0, 360);
      let groupIndex = 1;
      const groupFunction = () => {
        const currentIndex = groupIndex;
        const randomDuration = Utils.getRandomFloat(0.05, 0.1);
        groupIndex += 1;
        gsap.to(groupWrap(currentIndex - 1), {
          fill: '#000000',
          duration: randomDuration * (group.length / 1.5),
          ease: 'linear',
        });
        gsap.to(groupWrap(currentIndex), {
          fill: () => Utils.getRandomColor({ hue: colorWrap(groupIndex * 4) }),
          duration: randomDuration,
          ease: 'linear',
          onComplete: groupFunction,
        });
      };
      // Start it running.
      groupFunction();
    }
  });
}

function spinningRings() {
  linearSequence(sortGroupPaths(document.querySelectorAll('path'), 'knot'));
  linearSequence(sortGroupPaths(document.querySelectorAll('path'), 'ringLarge'));
  linearSequence(sortGroupPaths(document.querySelectorAll('path'), 'ringSmall'));
}

// basicColorFades();
spinningRings();
