// English number words (cardinals + ordinals).
export const UNIT = {
  zero: 0,
  first: 1,
  one: 1,
  second: 2,
  two: 2,
  third: 3,
  thirteenth: 13,
  thirteen: 13,
  three: 3,
  fourth: 4,
  fourteenth: 14,
  fourteen: 14,
  four: 4,
  fifteenth: 15,
  fifteen: 15,
  fifth: 5,
  five: 5,
  sixth: 6,
  sixteenth: 16,
  sixteen: 16,
  six: 6,
  seventeenth: 17,
  seventeen: 17,
  seventh: 7,
  seven: 7,
  eighteenth: 18,
  eighteen: 18,
  eighth: 8,
  eight: 8,
  nineteenth: 19,
  nineteen: 19,
  ninth: 9,
  nine: 9,
  tenth: 10,
  ten: 10,
  eleventh: 11,
  eleven: 11,
  twelfth: 12,
  twelve: 12,
  a: 1,
};

export const TEN = {
  twenty: 20,
  twentieth: 20,
  thirty: 30,
  thirtieth: 30,
  forty: 40,
  fortieth: 40,
  fifty: 50,
  fiftieth: 50,
  sixty: 60,
  sixtieth: 60,
  seventy: 70,
  seventieth: 70,
  eighty: 80,
  eightieth: 80,
  ninety: 90,
  ninetieth: 90,
};

export const MAGNITUDE = {
  hundred: 100,
  hundredth: 100,
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
  quadrillion: 1000000000000000,
  quintillion: 1000000000000000000,
  sextillion: 1000000000000000000000,
  septillion: 1000000000000000000000000,
  octillion: 1000000000000000000000000000,
  nonillion: 1000000000000000000000000000000,
  decillion: 1000000000000000000000000000000000,
};

export const JOINERS = ['and'];
export const DECIMALS = ['point', 'dot'];
export const BLACKLIST_SINGULAR_WORDS = ['a'];

// Fraction denominator words -> denominator value. Several singular forms
// (third, fourth, fifth...) are ALSO cardinals in UNIT, so they are ambiguous:
// "one fifth" = 1/5 but "twenty fifth" = 25. That ambiguity is resolved at
// runtime by the numerator type (UNIT -> fraction, TEN -> ordinal).
export const FRACTIONS = {
  half: 2, halves: 2,
  third: 3, thirds: 3,
  quarter: 4, quarters: 4,
  fourth: 4, fourths: 4,
  fifth: 5, fifths: 5,
  sixth: 6, sixths: 6,
  seventh: 7, sevenths: 7,
  eighth: 8, eighths: 8,
  ninth: 9, ninths: 9,
  tenth: 10, tenths: 10,
};
// Decimal places: plural only, since the singular "hundredth" is also an
// ordinal ("two hundredth" = 200). Compounds are hyphenated so "two hundred
// thousandths" (200/1000) is not read as 2 + "hundred thousandths".
// Kept out of FRACTIONS so they stay out of the fuzzy dictionary, where they
// would capture misspellings of hundred/cent/cien ("huntred" -> hundredths).
// setLocale merges them into the fraction denominators.
export const PLACES = {
  hundredths: 100,
  thousandths: 1e3,
  'ten-thousandths': 1e4,
  'hundred-thousandths': 1e5,
  millionths: 1e6,
  'ten-millionths': 1e7,
  'hundred-millionths': 1e8,
  billionths: 1e9,
};
// Explicit fraction divider: "three over four" -> 3/4.
export const DIVIDERS = ['over'];
// Scientific notation: "two point five times ten to the minus two".
export const SCIENTIFIC = {
  TIMES: ['times', 'multiplied by'],
  POWER: ['to the', 'to the power of', 'raised to the', 'raised to the power of'],
  MINUS: ['minus', 'negative'],
};
