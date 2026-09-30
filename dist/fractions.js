"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceFractions;
var _constants = require("./constants");
var _notation = require("./notation");
const MAX_NUMERATOR_WORDS = 20;
const powerOfTen = denom => /^10*$/.test(`${denom}`) ? `${denom}`.length - 1 : -1;
const byLengthDesc = (a, b) => b.length - a.length;
const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const alternation = words => words.slice().sort(byLengthDesc).map(escapeRegExp).join('|');
function replaceFractions(text, options, toNumber) {
  if (typeof text !== 'string' || options.fractions === false) return text;
  const mode = options.fractions;
  const denomWords = Object.keys(_constants.FRACTIONS);
  if (!denomWords.length && !_constants.DIVIDERS.length) return text;
  const resolve = str => {
    const n = toNumber(str, options);
    if (typeof n === 'number') return n;
    const single = _constants.NUMBER[str.trim().toLowerCase()];
    return single !== undefined ? single : null;
  };
  const numWord = '(?:' + alternation(_constants.NUMBER_WORDS) + ')';
  const numRun = numWord + '(?:[\\s-]+' + numWord + '){0,' + (MAX_NUMERATOR_WORDS - 1) + '}?';
  let result = text;
  if (_constants.DIVIDERS.length) {
    const reDiv = new RegExp('(' + numRun + ')[\\s-]+(?:' + alternation(_constants.DIVIDERS) + ')[\\s-]+(' + numWord + '(?:[\\s-]+' + numWord + ')*)', 'gi');
    result = result.replace(reDiv, (m, a, b) => {
      const n = resolve(a);
      const d = resolve(b);
      return n !== null && d !== null ? `${(0, _notation.mark)(n)}/${(0, _notation.mark)(d)}` : m;
    });
  }
  if (denomWords.length) {
    const decimalPart = _constants.DECIMALS.length ? '(?:' + numRun + '[\\s-]+(' + alternation(_constants.DECIMALS) + ')[\\s-]+)?' : '()';
    const reFrac = new RegExp('(' + decimalPart + numRun + ')[\\s-]+(' + alternation(denomWords) + ')\\b', 'gi');
    result = result.replace(reFrac, (m, numerator, decimalMarker, denomWord) => {
      const denom = _constants.FRACTIONS[denomWord.toLowerCase()];
      if (!denom) return m;
      if (_constants.NUMBER[denomWord.toLowerCase()] !== undefined && mode !== 'force') {
        const lastWord = numerator.split(/[\s-]+/).pop().toLowerCase();
        if (_constants.TEN_KEYS.indexOf(lastWord) !== -1) return m;
      }
      const n = resolve(numerator);
      if (n === null) return m;
      const exponent = powerOfTen(denom);
      if (decimalMarker && exponent > 0) return (0, _notation.mark)(Number(`${n}e-${exponent}`));
      return `${(0, _notation.mark)(n)}/${(0, _notation.mark)(denom)}`;
    });
  }
  return result;
}