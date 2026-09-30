"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceScientific;
var _constants = require("./constants");
var _notation = require("./notation");
const byLengthDesc = (a, b) => b.length - a.length;
const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const alternation = phrases => phrases.slice().sort(byLengthDesc).map(phrase => escapeRegExp(phrase).replace(/ +/g, '\\s+')).join('|');
function replaceScientific(text, notation) {
  if (typeof text !== 'string' || !_constants.SCIENTIFIC) return text;
  const {
    TIMES,
    POWER,
    MINUS
  } = _constants.SCIENTIFIC;
  const re = new RegExp('(?:' + _notation.OPEN + '(\\d+(?:\\.\\d+)?)' + _notation.CLOSE + '\\s+(?:' + alternation(TIMES) + ')\\s+)?' + _notation.OPEN + '10' + _notation.CLOSE + '\\s+(?:' + alternation(POWER) + ')\\s+' + '(?:(' + alternation(MINUS) + ')\\s+)?' + _notation.OPEN + '(\\d+)' + _notation.CLOSE, 'gi');
  return text.replace(re, (m, mantissa, minus, exponent) => {
    const sign = minus ? '-' : '';
    if (notation === 'school') {
      const power = `10${(0, _notation.toSuperscript)(sign + exponent)}`;
      return mantissa ? `${(0, _notation.formatValue)(mantissa, 'school')} × ${power}` : power;
    }
    return (0, _notation.mark)(Number(`${mantissa || 1}e${sign}${exponent}`));
  });
}