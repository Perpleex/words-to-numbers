import { SCIENTIFIC } from './constants';
import { OPEN, CLOSE, mark, formatValue, toSuperscript } from './notation';

const byLengthDesc = (a, b) => b.length - a.length;
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Longest phrase first ("à la puissance" before "puissance"); a space inside a
// phrase matches any run of whitespace.
const alternation = (phrases) => phrases.slice().sort(byLengthDesc)
  .map((phrase) => escapeRegExp(phrase).replace(/ +/g, '\\s+'))
  .join('|');

/**
 * Turn powers of ten into their value, AFTER numeric compilation, so the
 * mantissa and exponent are already (marked) digits:
 *   "2.5 fois 10 puissance moins 2" -> 0.025
 *   "10 puissance moins 3"          -> 0.001
 *   "3 fois 10 puissance 4"         -> 30000
 * The value goes through an exponent literal (Number("2.5e-2")) to stay exact.
 * In 'school' notation the spoken form is kept instead: "2,5 × 10⁻²".
 * Single left-to-right regex pass: linear in the text length.
 *
 * @param {string|number} text  output of the numeric compilation
 * @param {string} notation     'auto' | 'full' | 'school'
 */
export default function replaceScientific(text, notation) {
  if (typeof text !== 'string' || !SCIENTIFIC) return text;
  const { TIMES, POWER, MINUS } = SCIENTIFIC;
  const re = new RegExp(
    '(?:' + OPEN + '(\\d+(?:\\.\\d+)?)' + CLOSE + '\\s+(?:' + alternation(TIMES) + ')\\s+)?' +
    OPEN + '10' + CLOSE + '\\s+(?:' + alternation(POWER) + ')\\s+' +
    '(?:(' + alternation(MINUS) + ')\\s+)?' + OPEN + '(\\d+)' + CLOSE,
    'gi'
  );
  return text.replace(re, (m, mantissa, minus, exponent) => {
    const sign = minus ? '-' : '';
    if (notation === 'school') {
      const power = `10${toSuperscript(sign + exponent)}`;
      return mantissa ? `${formatValue(mantissa, 'school')} × ${power}` : power;
    }
    return mark(Number(`${mantissa || 1}e${sign}${exponent}`));
  });
}
