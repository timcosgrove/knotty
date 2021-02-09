import tinycolor from 'tinycolor2';

const Utils = {};

// Utility function to map HSL values to RGB
Utils.hslValsToRgb = function hslValsToRgb(hue = 0, saturation = 100, lightness = 50) {
  return `${tinycolor(`hsl(${hue}, ${saturation}%, ${lightness}%)`).toRgbString()}`;
};

// Grabs a random int from a range.
// @todo: test negatives, non-numerical inputs.
Utils.getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
};

// Grabs a random number from a range.
// @todo: test negatives, non-numerical inputs.
Utils.getRandomFloat = function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
};

// Given integers values for a center and an allowed deviation, returns a random
// value within the allowed range.
// @todo: test negatives, non-numerical inputs.
Utils.getIntDeviation = function getIntDeviation(center, deviation = 0) {
  return Utils.getRandomInt(center - deviation, center + deviation);
}

// Given values for a center and an allowed deviation, returns a random
// value within the allowed range.
// @todo: test negatives, non-numerical inputs.
Utils.getFloatDeviation = function getFloatDeviation(center, deviation = 0) {
  return Utils.getRandomFloat(center - deviation, center + deviation);
}

// Provides random colors, given constraints.
// Default: any color, full saturation and normal luminosity (50%).
// Takes either lower/upper bounds or value & deviation, for each of HSL.
// Returns rgb(r, g, b) format since that is more widely understood by CSS.
Utils.getRandomColor = function getRandomColor({
  hue,
  hueLower = 0,
  hueUpper = 360,
  hueDeviation = 0,
  saturation,
  saturationLower = 100,
  saturationUpper = saturationLower,
  saturationDeviation = 0,
  luminosity,
  luminosityLower = 50,
  luminosityUpper = luminosityLower,
  luminosityDeviation = 0
} = {}) {
  hue = isNaN(hue) ?
    Utils.getRandomFloat(hueLower, hueUpper) :
    Utils.getFloatDeviation(hue, hueDeviation);
  saturation = isNaN(saturation) ?
    Utils.getRandomFloat(saturationLower, saturationUpper) :
    Utils.getFloatDeviation(saturation, saturationDeviation);
  luminosity = isNaN(luminosity) ?
    Utils.getRandomFloat(luminosityLower, luminosityUpper) :
    Utils.getFloatDeviation(luminosity, luminosityDeviation);
  return Utils.hslValsToRgb(hue, saturation, luminosity);
}

export default Utils;
