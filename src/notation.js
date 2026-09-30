import { DECIMAL_SEPARATOR } from './constants';

// Numbers produced by the passes (compiler, fractions, scientific) are wrapped
// in private-use markers until the final formatting pass, so digits the user
// typed are never reformatted and the scientific pass only reads our numbers.
export const OPEN = '';
export const CLOSE = '';
export const mark = (value) => `${OPEN}${value}${CLOSE}`;
const MARKED = /([^]*)/g;
const WHOLE_MARKED = /^([^]*)$/;

const NOTATIONS = ['auto', 'full', 'school'];
// Unknown or missing notation -> 'auto' (JavaScript's own number form).
export const getNotation = (options) =>
  (NOTATIONS.indexOf(options.notation) !== -1 ? options.notation : 'auto');

// JavaScript number string in exponent form ("2.5e-7", "6.02e+23") ->
// positional digits ("0.00000025", "602000000000000000000000"). Other strings
// are returned as is.
export const toFull = (numberString) => {
  const match = /^(\d+)(?:\.(\d+))?e([+-]\d+)$/i.exec(numberString);
  if (!match) return numberString;
  const [, integer, fraction = '', exponent] = match;
  const digits = integer + fraction;
  const point = integer.length + Number(exponent);
  if (point <= 0) return `0.${'0'.repeat(-point)}${digits}`;
  if (point >= digits.length) return digits + '0'.repeat(point - digits.length);
  return `${digits.slice(0, point)}.${digits.slice(point)}`;
};

// 'auto': as JavaScript prints it; 'full': no exponent; 'school': no exponent
// and the locale decimal separator.
export const formatValue = (numberString, notation) => {
  if (notation === 'full') return toFull(numberString);
  if (notation === 'school') return toFull(numberString).replace('.', DECIMAL_SEPARATOR);
  return numberString;
};

const SUPERSCRIPT = {
  0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻',
};
export const toSuperscript = (s) => s.replace(/[0-9-]/g, (c) => SUPERSCRIPT[c]);

/**
 * Final pass: strip the markers and write each produced number in the
 * requested notation. In 'auto', a text that is a single produced number is
 * returned as a Number (like any whole-text number); 'full' and 'school'
 * always return text.
 */
export const finalize = (result, notation) => {
  if (typeof result === 'number') {
    return notation === 'auto' ? result : formatValue(`${result}`, notation);
  }
  if (typeof result !== 'string') return result;
  const whole = WHOLE_MARKED.exec(result);
  if (whole && notation === 'auto') return Number(whole[1]);
  return result.replace(MARKED, (m, value) => formatValue(value, notation));
};
