
import { expect } from 'chai';
import wtn from '../';
const { describe, it } = global;

// Processing time must stay linear in the input size. Compare the best-of-N
// time for an input 4x larger: linear gives a ratio of ~4, quadratic ~16. The
// threshold is loose so the check is not flaky on a busy machine.
const SMALL = 4000;
const LARGE = SMALL * 4;
const MAX_RATIO = 8;
const RUNS = 5;

const bestTime = (text, options) => {
  let best = Infinity;
  for (let i = 0; i < RUNS; i++) {
    const start = process.hrtime.bigint();
    wtn(text, options);
    best = Math.min(best, Number(process.hrtime.bigint() - start));
  }
  return best;
};

const expectLinear = (build, options = {}) => {
  const small = build(SMALL);
  const large = build(LARGE);
  wtn(small, options); // warm-up (JIT)
  const ratio = bestTime(large, options) / bestTime(small, options);
  expect(ratio).to.be.below(MAX_RATIO);
};

const repeat = (phrase, words) => Array(Math.ceil(words / phrase.split(' ').length)).fill(phrase).join(' ');

describe('performance linéaire', function () {
  this.timeout(10000);

  it('texte courant', () => {
    expectLinear((n) => repeat('il a vingt trois pommes', n));
  });

  it('longue suite de mots-nombres sans dénominateur', () => {
    expectLinear((n) => repeat('un deux trois quatre cinq', n));
  });

  it('fractions répétées', () => {
    expectLinear((n) => repeat('il a trois quarts pommes', n));
  });

  it('une seule région très longue', () => {
    expectLinear((n) => repeat('cent', n));
  });

  it('longue partie décimale', () => {
    expectLinear((n) => `trois virgule ${repeat('un', n)}`);
  });

  it('rangs décimaux répétés', () => {
    expectLinear((n) => repeat('il reste deux virgule cinq centièmes', n));
  });

  it('notation scientifique répétée', () => {
    expectLinear((n) => repeat('soit deux virgule cinq fois dix puissance moins deux', n));
  });

  it("notation 'school'", () => {
    expectLinear((n) => repeat('soit deux virgule cinq fois dix puissance moins deux et trente', n), { notation: 'school' });
  });
});
