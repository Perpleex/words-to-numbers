import {
  NUMBER,
  NUMBER_WORDS,
  TEN_KEYS,
  FRACTIONS,
  DIVIDERS,
} from './constants';

const byLengthDesc = (a, b) => b.length - a.length;
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Build a regex alternation, longest words first so "cinquièmes" wins over
// "cinquième" and multi-word forms are not truncated.
const alternation = (words) => words.slice().sort(byLengthDesc).map(escapeRegExp).join('|');

/**
 * Turn spoken fractions into "n/d" notation, BEFORE numeric compilation so that
 * English ordinal-shaped denominators (third/fifth...) are still present.
 *
 * options.fractions:
 *   - undefined | true -> auto: ambiguous ordinal words become fractions only
 *     when the numerator is a unit (1-9); a preceding ten ("twenty fifth") stays
 *     an ordinal number.
 *   - false            -> disabled (débrayage): no fraction conversion at all.
 *   - 'force'          -> ambiguous ordinal words are always treated as fractions
 *     (use when upstream context guarantees a fraction, e.g. a fractions drill).
 *
 * @param {string} text
 * @param {object} options
 * @param {function} toNumber  numbers-only compiler (text -> Number|string)
 */
export default function replaceFractions(text, options, toNumber) {
  if (typeof text !== 'string' || options.fractions === false) return text;
  const mode = options.fractions; // undefined | true | 'force'

  const denomWords = Object.keys(FRACTIONS);
  if (!denomWords.length && !DIVIDERS.length) return text;

  // Resolve a number phrase to its value. Falls back to a direct word lookup so
  // a single blacklisted numerator (Spanish "un medio", English "a half") still
  // resolves in fraction context, where it is unambiguously a numerator.
  const resolve = (str) => {
    const n = toNumber(str, options);
    if (typeof n === 'number') return n;
    const single = NUMBER[str.trim().toLowerCase()];
    return single !== undefined ? single : null;
  };

  const numWord = '(?:' + alternation(NUMBER_WORDS) + ')';
  // Numerator = a lazy run of number words (space/hyphen separated). Lazy so the
  // trailing denominator (which may itself be a number word in English) is left
  // for the denominator group to capture.
  const numRun = numWord + '(?:[\\s-]+' + numWord + ')*?';

  let result = text;

  // 1) Explicit divider: "<num> sur/over/sobre <num>".
  if (DIVIDERS.length) {
    const reDiv = new RegExp(
      '(' + numRun + ')[\\s-]+(?:' + alternation(DIVIDERS) + ')[\\s-]+(' + numWord + '(?:[\\s-]+' + numWord + ')*)',
      'gi'
    );
    result = result.replace(reDiv, (m, a, b) => {
      const n = resolve(a);
      const d = resolve(b);
      return n !== null && d !== null ? `${n}/${d}` : m;
    });
  }

  // 2) Denominator word: "<num> <denominator>".
  if (denomWords.length) {
    const reFrac = new RegExp(
      '(' + numRun + ')[\\s-]+(' + alternation(denomWords) + ')\\b',
      'gi'
    );
    result = result.replace(reFrac, (m, numerator, denomWord) => {
      const denom = FRACTIONS[denomWord.toLowerCase()];
      if (!denom) return m;
      // Ambiguity: a denominator that is also a cardinal (English ordinal form).
      if (NUMBER[denomWord.toLowerCase()] !== undefined && mode !== 'force') {
        const lastWord = numerator.split(/[\s-]+/).pop().toLowerCase();
        // "twenty fifth" (ten + ordinal) is a compound ordinal number, not 1/5.
        if (TEN_KEYS.indexOf(lastWord) !== -1) return m;
      }
      const n = resolve(numerator);
      if (n === null) return m;
      return `${n}/${denom}`;
    });
  }

  return result;
}
