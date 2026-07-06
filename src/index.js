import parser from './parser';
import compiler from './compiler';
import { setLocale } from './constants';
import replaceFractions from './fractions';

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
  // then the regular number compilation on what remains.
  const withFractions = replaceFractions(text, options, compile);
  return compile(withFractions, options);
}

export default wordsToNumbers;
