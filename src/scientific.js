import { SCIENTIFIC } from './constants';

const byLengthDesc = (a, b) => b.length - a.length;
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Longest phrase first ("à la puissance" before "puissance"); a space inside a
// phrase matches any run of whitespace.
const alternation = (phrases) => phrases.slice().sort(byLengthDesc)
  .map((phrase) => escapeRegExp(phrase).replace(/ +/g, '\\s+'))
  .join('|');

/**
 * Turn powers of ten into their value, AFTER numeric compilation, so the
 * mantissa and exponent are already digits:
 *   "2.5 fois 10 puissance moins 2" -> "0.025"
 *   "10 puissance moins 3"          -> "0.001"
 *   "3 fois 10 puissance 4"         -> "30000"
 * The value goes through an exponent literal (Number("2.5e-2")) to stay exact.
 * Single left-to-right regex pass: linear in the text length.
 *
 * @param {string|number} text  output of the numeric compilation
 */
export default function replaceScientific(text) {
  if (typeof text !== 'string' || !SCIENTIFIC) return text;
  const { TIMES, POWER, MINUS } = SCIENTIFIC;
  const re = new RegExp(
    '(?:\\b(\\d+(?:\\.\\d+)?)\\s+(?:' + alternation(TIMES) + ')\\s+)?' +
    '\\b10\\s+(?:' + alternation(POWER) + ')\\s+' +
    '(?:(' + alternation(MINUS) + ')\\s+)?(\\d+)\\b',
    'gi'
  );
  return text.replace(re, (m, mantissa, minus, exponent) =>
    `${Number(`${mantissa || 1}e${minus ? '-' : ''}${exponent}`)}`
  );
}
