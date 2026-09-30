// Spanish number words. Like French/English: tens before units, hundreds are
// multiplicative. Teens (11-15) and the contracted 16-19 / 21-29 forms are
// single words carrying their full value (same idea as French "onze").
export const UNIT = {
  cero: 0,
  uno: 1,
  un: 1,
  una: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
  siete: 7,
  ocho: 8,
  nueve: 9,
  once: 11,
  doce: 12,
  trece: 13,
  catorce: 14,
  quince: 15,
  dieciséis: 16,
  dieciseis: 16,
  diecisiete: 17,
  dieciocho: 18,
  diecinueve: 19,
  veintiuno: 21,
  veintiún: 21,
  veintiun: 21,
  veintiuna: 21,
  veintidós: 22,
  veintidos: 22,
  veintitrés: 23,
  veintitres: 23,
  veinticuatro: 24,
  veinticinco: 25,
  veintiséis: 26,
  veintiseis: 26,
  veintisiete: 27,
  veintiocho: 28,
  veintinueve: 29,
};

export const TEN = {
  diez: 10,
  veinte: 20,
  treinta: 30,
  cuarenta: 40,
  cincuenta: 50,
  sesenta: 60,
  setenta: 70,
  ochenta: 80,
  noventa: 90,
};

export const MAGNITUDE = {
  cien: 100,
  ciento: 100,
  cientos: 100,
  doscientos: 200,
  doscientas: 200,
  trescientos: 300,
  trescientas: 300,
  cuatrocientos: 400,
  cuatrocientas: 400,
  quinientos: 500,
  quinientas: 500,
  seiscientos: 600,
  seiscientas: 600,
  setecientos: 700,
  setecientas: 700,
  ochocientos: 800,
  ochocientas: 800,
  novecientos: 900,
  novecientas: 900,
  mil: 1000,
  millón: 1000000,
  millon: 1000000,
  millones: 1000000,
  millardo: 1000000000,
  millardos: 1000000000,
  billón: 1000000000000,
  billon: 1000000000000,
  billones: 1000000000000,
  trillón: 1000000000000000000,
  trillon: 1000000000000000000,
  trillones: 1000000000000000000,
};

export const JOINERS = ['y', 'e'];
export const DECIMALS = ['coma', 'punto'];
export const BLACKLIST_SINGULAR_WORDS = ['un', 'una'];

// Fraction denominator words -> denominator value. None collide with the
// Spanish cardinals defined above (cuarto != cuatro, quinto != cinco), so no
// ordinal ambiguity to resolve.
export const FRACTIONS = {
  medio: 2, medios: 2, media: 2, medias: 2,
  tercio: 3, tercios: 3,
  cuarto: 4, cuartos: 4,
  quinto: 5, quintos: 5,
  sexto: 6, sextos: 6,
  séptimo: 7, séptimos: 7,
  octavo: 8, octavos: 8,
  noveno: 9, novenos: 9,
  décimo: 10, décimos: 10,
  centésimo: 100, centésimos: 100,
  milésimo: 1000, milésimos: 1000,
};
// Decimal places beyond the thousandth (RAE closed forms; long scale:
// milmillonésimo = 10^-9).
// Kept out of FRACTIONS so they stay out of the fuzzy dictionary, where they
// would capture misspellings of hundred/cent/cien ("huntred" -> hundredths).
// setLocale merges them into the fraction denominators.
export const PLACES = {
  diezmilésimo: 1e4, diezmilésimos: 1e4,
  cienmilésimo: 1e5, cienmilésimos: 1e5,
  millonésimo: 1e6, millonésimos: 1e6,
  diezmillonésimo: 1e7, diezmillonésimos: 1e7,
  cienmillonésimo: 1e8, cienmillonésimos: 1e8,
  milmillonésimo: 1e9, milmillonésimos: 1e9,
};
// Explicit fraction divider: "tres sobre cuatro" -> 3/4.
export const DIVIDERS = ['sobre'];
// Scientific notation: "dos coma cinco por diez elevado a menos dos".
export const SCIENTIFIC = {
  TIMES: ['por', 'multiplicado por'],
  POWER: ['elevado a', 'elevado a la', 'a la'],
  MINUS: ['menos'],
};
