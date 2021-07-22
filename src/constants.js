
export const UNIT = {
  zero: 0,
  un: 1,
  douze: 12,
  deux: 2,
  treize: 13,
  trois: 3,
  quatorze: 14,
  quatre: 4,
  quinze: 15,
  cinq: 5,
  seize: 16,
  six: 6,
  sept: 7,
  huit: 8,
  neuf: 9,
  onze: 11,
};

export const TEN = {
  dix: 10,
//  vingt: 20,
  trente: 30,
  quarante: 40,
  cinquante: 50,
//  soixante: 60,
  septante: 70,
  octante: 80,
  nonante: 90
};

export const MAGNITUDE = {
  vingt: 20,
  soixante: 60,
  cent: 100,
  cents: 100,
  mille: 1000,
  milles: 1000,
  million: 1000000,
  millions: 1000000,
  milliard: 1000000000,
  milliards: 1000000000,
  billion: 1000000000000,
  billions: 1000000000000,
  trillion: 1000000000000000000,
  trillions: 1000000000000000000,
  quadrillion: 1000000000000000000000000,
  quadrillions: 1000000000000000000000000,
  quintillion: 1000000000000000000000000000000,
  quintillions: 1000000000000000000000000000000,
  sextillion: 1000000000000000000000000000000000000,
  sextillions: 1000000000000000000000000000000000000,
  septillion: 1000000000000000000000000000000000000000000,
  septillions: 1000000000000000000000000000000000000000000,
  octillion: 1000000000000000000000000000000000000000000000000,
  octillions: 1000000000000000000000000000000000000000000000000,
  nonillion: 1000000000000000000000000000000000000000000000000000000,
  nonillions: 1000000000000000000000000000000000000000000000000000000,
  decillion: 1000000000000000000000000000000000000000000000000000000000000,
  decillions: 1000000000000000000000000000000000000000000000000000000000000,
};

export const NUMBER = { ...UNIT, ...TEN, ...MAGNITUDE };

export const UNIT_KEYS = Object.keys(UNIT);
export const TEN_KEYS = Object.keys(TEN);
export const MAGNITUDE_KEYS = Object.keys(MAGNITUDE);

export const NUMBER_WORDS = [ ...UNIT_KEYS, ...TEN_KEYS, ...MAGNITUDE_KEYS];

export const JOINERS = ['et'];
export const DECIMALS = ['point', 'virgule'];

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

export const ALL_WORDS = [ ...NUMBER_WORDS, ...JOINERS, ...DECIMALS ];

export const BLACKLIST_SINGULAR_WORDS = ['a'];
