// French number words. vingt/soixante are MAGNITUDE (not TEN) to support
// the French "quatre-vingt" / "soixante-dix" compositions.
export const UNIT = {
  zero: 0,
  zéro: 0,
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
  trente: 30,
  quarante: 40,
  cinquante: 50,
  septante: 70,
  octante: 80,
  huitante: 80,
  nonante: 90,
};

export const MAGNITUDE = {
  vingt: 20,
  vingts: 20, // "quatre-vingts" (80) prend un s ; "quatre-vingt-un" (81) le perd
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

export const JOINERS = ['et'];
export const DECIMALS = ['point', 'points', 'virgule'];
export const BLACKLIST_SINGULAR_WORDS = ['a'];

// Fraction denominator words -> denominator value. None of these are French
// cardinals, so there is no ordinal ambiguity to resolve.
export const FRACTIONS = {
  demi: 2, demis: 2, demie: 2, demies: 2,
  tiers: 3,
  quart: 4, quarts: 4,
  cinquième: 5, cinquièmes: 5,
  sixième: 6, sixièmes: 6,
  septième: 7, septièmes: 7,
  huitième: 8, huitièmes: 8,
  neuvième: 9, neuvièmes: 9,
  dixième: 10, dixièmes: 10,
  douzième: 12, douzièmes: 12,
  centième: 100, centièmes: 100,
  millième: 1000, millièmes: 1000,
};
// Explicit fraction divider: "trois sur quatre" -> 3/4.
export const DIVIDERS = ['sur'];
