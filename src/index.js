import parser from './parser';
import compiler from './compiler';
import { setLocale } from './constants';
import replaceFractions from './fractions';
import replaceScientific from './scientific';

// A text that is nothing but a decimal literal, as produced by the decimal
// place and scientific passes ("0.025", "1.6e-19", "6.02e+23").
const NUMERIC_LITERAL = /^\d+(?:\.\d+)?(?:e[-+]\d+)?$/;

// Numbers only: runs the parser/compiler without switching locale or handling
// fractions. Used for the final pass and to resolve fraction numerators.
function compile(text, options) {
  const regions = parser(text, options);
  if (!regions.length) return text;
  return compiler({ text, regions });
}

export function wordsToNumbers (text, options = {}) {
  // Select the language word set for this call (default locale if unset).
  setLocale(options.locale);
  // Fractions first (before ordinal-shaped words are collapsed to numbers),
  // then the regular number compilation on what remains, then powers of ten
  // (which need the mantissa and exponent already compiled to digits).
  const withFractions = replaceFractions(text, options, compile);
  const compiled = compile(withFractions, options);
  const result = replaceScientific(compiled);
  // A whole text read as one decimal ("deux virgule cinq centièmes") is a
  // number, like any other whole-text number. Only when a pass rewrote it: a
  // digit-only input ("12") keeps coming back unchanged.
  if (result !== text && typeof result === 'string' && NUMERIC_LITERAL.test(result)) {
    return Number(result);
  }
  return result;
}

export default wordsToNumbers;
