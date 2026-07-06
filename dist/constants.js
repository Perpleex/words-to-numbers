"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNIT_KEYS = exports.UNIT = exports.TOKEN_TYPE = exports.TEN_KEYS = exports.TEN = exports.PUNCTUATION = exports.NUMBER_WORDS = exports.NUMBER = exports.MAGNITUDE_KEYS = exports.MAGNITUDE = exports.JOINERS = exports.FRACTIONS = exports.DIVIDERS = exports.DECIMALS = exports.BLACKLIST_SINGULAR_WORDS = exports.ALL_WORDS = void 0;
exports.getLocales = getLocales;
exports.setLocale = setLocale;
var fr = _interopRequireWildcard(require("./locales/fr"));
var en = _interopRequireWildcard(require("./locales/en"));
var es = _interopRequireWildcard(require("./locales/es"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const LOCALES = {
  fr,
  en,
  es
};
const DEFAULT_LOCALE = 'fr';
const PUNCTUATION = exports.PUNCTUATION = ['.', ',', '\\', '#', '!', '$', '%', '^', '&', '/', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ' '];
const TOKEN_TYPE = exports.TOKEN_TYPE = {
  UNIT: 0,
  TEN: 1,
  MAGNITUDE: 2,
  DECIMAL: 3,
  HUNDRED: 4
};
let UNIT = exports.UNIT = void 0;
let TEN = exports.TEN = void 0;
let MAGNITUDE = exports.MAGNITUDE = void 0;
let NUMBER = exports.NUMBER = void 0;
let UNIT_KEYS = exports.UNIT_KEYS = void 0;
let TEN_KEYS = exports.TEN_KEYS = void 0;
let MAGNITUDE_KEYS = exports.MAGNITUDE_KEYS = void 0;
let NUMBER_WORDS = exports.NUMBER_WORDS = void 0;
let JOINERS = exports.JOINERS = void 0;
let DECIMALS = exports.DECIMALS = void 0;
let ALL_WORDS = exports.ALL_WORDS = void 0;
let BLACKLIST_SINGULAR_WORDS = exports.BLACKLIST_SINGULAR_WORDS = void 0;
let FRACTIONS = exports.FRACTIONS = void 0;
let DIVIDERS = exports.DIVIDERS = void 0;
function getLocales() {
  return Object.keys(LOCALES);
}
const warnedLocales = new Set();
function setLocale(locale) {
  if (locale != null && !LOCALES[locale] && !warnedLocales.has(locale)) {
    warnedLocales.add(locale);
    console.warn(`words-to-numbers: unsupported locale "${locale}", falling back to "${DEFAULT_LOCALE}". Supported locales: ${Object.keys(LOCALES).join(', ')}.`);
  }
  const data = LOCALES[locale] || LOCALES[DEFAULT_LOCALE];
  exports.UNIT = UNIT = data.UNIT;
  exports.TEN = TEN = data.TEN;
  exports.MAGNITUDE = MAGNITUDE = data.MAGNITUDE;
  exports.NUMBER = NUMBER = {
    ...UNIT,
    ...TEN,
    ...MAGNITUDE
  };
  exports.UNIT_KEYS = UNIT_KEYS = Object.keys(UNIT);
  exports.TEN_KEYS = TEN_KEYS = Object.keys(TEN);
  exports.MAGNITUDE_KEYS = MAGNITUDE_KEYS = Object.keys(MAGNITUDE);
  exports.NUMBER_WORDS = NUMBER_WORDS = [...UNIT_KEYS, ...TEN_KEYS, ...MAGNITUDE_KEYS];
  exports.JOINERS = JOINERS = data.JOINERS;
  exports.DECIMALS = DECIMALS = data.DECIMALS;
  exports.FRACTIONS = FRACTIONS = data.FRACTIONS || {};
  exports.DIVIDERS = DIVIDERS = data.DIVIDERS || [];
  exports.ALL_WORDS = ALL_WORDS = [...NUMBER_WORDS, ...JOINERS, ...DECIMALS, ...Object.keys(FRACTIONS), ...DIVIDERS];
  exports.BLACKLIST_SINGULAR_WORDS = BLACKLIST_SINGULAR_WORDS = data.BLACKLIST_SINGULAR_WORDS;
}
setLocale(DEFAULT_LOCALE);