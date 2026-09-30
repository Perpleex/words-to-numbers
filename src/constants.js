import * as fr from './locales/fr';
import * as en from './locales/en';
import * as es from './locales/es';

const LOCALES = { fr, en, es };
const DEFAULT_LOCALE = 'fr';

// Language-agnostic constants (never change with the locale).
export const PUNCTUATION = [
  '.',
  ',',
  '\\',
  '#',
  '!',
  '$',
  '%',
  '^',
  '&',
  '/',
  '*',
  ';',
  ':',
  '{',
  '}',
  '=',
  '-',
  '_',
  '`',
  '~',
  '(',
  ')',
  ' ',
];

export const TOKEN_TYPE = {
  UNIT: 0,
  TEN: 1,
  MAGNITUDE: 2,
  DECIMAL: 3,
  HUNDRED: 4,
};

// Locale-dependent bindings. They are reassigned by setLocale(); thanks to ES
// module live bindings, every module that imports them (parser, compiler,
// fuzzy) sees the value for the locale selected on the current call.
export let UNIT;
export let TEN;
export let MAGNITUDE;
export let NUMBER;
export let UNIT_KEYS;
export let TEN_KEYS;
export let MAGNITUDE_KEYS;
export let NUMBER_WORDS;
export let JOINERS;
export let DECIMALS;
export let ALL_WORDS;
export let BLACKLIST_SINGULAR_WORDS;
export let FRACTIONS;
export let DIVIDERS;
export let SCIENTIFIC;
export let DECIMAL_SEPARATOR;

export function getLocales() {
  return Object.keys(LOCALES);
}

// Track locales we've already warned about, so an unsupported locale only logs
// once (not on every call).
const warnedLocales = new Set();

// Select the active locale before a parse. Unknown/undefined -> default locale.
// An explicitly-passed but unsupported locale warns once (undefined/null does
// not: relying on the default locale is a legitimate use).
export function setLocale(locale) {
  if (locale != null && !LOCALES[locale] && !warnedLocales.has(locale)) {
    warnedLocales.add(locale);
    console.warn(
      `words-to-numbers: unsupported locale "${locale}", falling back to "${DEFAULT_LOCALE}". Supported locales: ${Object.keys(LOCALES).join(', ')}.`
    );
  }
  const data = LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
  UNIT = data.UNIT;
  TEN = data.TEN;
  MAGNITUDE = data.MAGNITUDE;
  NUMBER = { ...UNIT, ...TEN, ...MAGNITUDE };
  UNIT_KEYS = Object.keys(UNIT);
  TEN_KEYS = Object.keys(TEN);
  MAGNITUDE_KEYS = Object.keys(MAGNITUDE);
  NUMBER_WORDS = [...UNIT_KEYS, ...TEN_KEYS, ...MAGNITUDE_KEYS];
  JOINERS = data.JOINERS;
  DECIMALS = data.DECIMALS;
  FRACTIONS = { ...data.FRACTIONS, ...data.PLACES };
  DIVIDERS = data.DIVIDERS || [];
  SCIENTIFIC = data.SCIENTIFIC;
  DECIMAL_SEPARATOR = data.DECIMAL_SEPARATOR || '.';
  ALL_WORDS = [...NUMBER_WORDS, ...JOINERS, ...DECIMALS, ...Object.keys(data.FRACTIONS || {}), ...DIVIDERS];
  BLACKLIST_SINGULAR_WORDS = data.BLACKLIST_SINGULAR_WORDS;
}

// Initialise with the default locale at module load.
setLocale(DEFAULT_LOCALE);
