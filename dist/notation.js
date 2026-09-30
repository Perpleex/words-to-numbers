"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toSuperscript = exports.toFull = exports.mark = exports.getNotation = exports.formatValue = exports.finalize = exports.OPEN = exports.CLOSE = void 0;
var _constants = require("./constants");
const OPEN = exports.OPEN = '';
const CLOSE = exports.CLOSE = '';
const mark = value => `${OPEN}${value}${CLOSE}`;
exports.mark = mark;
const MARKED = /([^]*)/g;
const WHOLE_MARKED = /^([^]*)$/;
const NOTATIONS = ['auto', 'full', 'school'];
const getNotation = options => NOTATIONS.indexOf(options.notation) !== -1 ? options.notation : 'auto';
exports.getNotation = getNotation;
const toFull = numberString => {
  const match = /^(\d+)(?:\.(\d+))?e([+-]\d+)$/i.exec(numberString);
  if (!match) return numberString;
  const [, integer, fraction = '', exponent] = match;
  const digits = integer + fraction;
  const point = integer.length + Number(exponent);
  if (point <= 0) return `0.${'0'.repeat(-point)}${digits}`;
  if (point >= digits.length) return digits + '0'.repeat(point - digits.length);
  return `${digits.slice(0, point)}.${digits.slice(point)}`;
};
exports.toFull = toFull;
const formatValue = (numberString, notation) => {
  if (notation === 'full') return toFull(numberString);
  if (notation === 'school') return toFull(numberString).replace('.', _constants.DECIMAL_SEPARATOR);
  return numberString;
};
exports.formatValue = formatValue;
const SUPERSCRIPT = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
  '-': '⁻'
};
const toSuperscript = s => s.replace(/[0-9-]/g, c => SUPERSCRIPT[c]);
exports.toSuperscript = toSuperscript;
const finalize = (result, notation) => {
  if (typeof result === 'number') {
    return notation === 'auto' ? result : formatValue(`${result}`, notation);
  }
  if (typeof result !== 'string') return result;
  const whole = WHOLE_MARKED.exec(result);
  if (whole && notation === 'auto') return Number(whole[1]);
  return result.replace(MARKED, (m, value) => formatValue(value, notation));
};
exports.finalize = finalize;