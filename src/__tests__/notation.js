
import { expect } from 'chai';
import wtn from '../';
const { describe, it } = global;

// options.notation — output form of the numbers:
//   - 'auto' (default): JavaScript's own form, exponent from 1e21 / below 1e-6
//     ("1e+21", "2.5e-7"); a whole-text number is returned as a Number.
//   - 'full':   never an exponent ("0.00000025"), decimal point; always text.
//   - 'school': numbers SAID with a power of ten keep the spoken form as
//     "a × 10ⁿ" (mantissa not normalized: "25 × 10³"); every other number is
//     written in full. Locale decimal separator (fr/es comma, en point);
//     always text.
const fr = (text, notation) => wtn(text, { locale: 'fr', notation });
const en = (text, notation) => wtn(text, { locale: 'en', notation });
const es = (text, notation) => wtn(text, { locale: 'es', notation });

describe('[fr] notation', () => {
  describe("'auto' (défaut, inchangé)", () => {
    it('sans option : Number', () => {
      expect(wtn('deux virgule cinq fois dix puissance moins sept', { locale: 'fr' })).to.equal(2.5e-7);
    });

    it("notation 'auto' explicite", () => {
      expect(fr('deux virgule cinq fois dix puissance moins sept', 'auto')).to.equal(2.5e-7);
    });

    it('dans une phrase : forme JavaScript', () => {
      expect(fr('soit dix puissance vingt et un', 'auto')).to.equal('soit 1e+21');
    });
  });

  describe("'full'", () => {
    it('petit nombre sans exposant', () => {
      expect(fr('deux virgule cinq fois dix puissance moins sept', 'full')).to.equal('0.00000025');
    });

    it('grand nombre sans exposant', () => {
      expect(fr('six virgule zéro deux fois dix puissance vingt trois', 'full')).to.equal('602000000000000000000000');
    });

    it('grand nombre dit en toutes lettres', () => {
      expect(fr('mille trillions', 'full')).to.equal('1000000000000000000000');
    });

    it('puissance positive écrite en entier', () => {
      expect(fr('trois fois dix puissance quatre', 'full')).to.equal('30000');
    });

    it('toujours du texte', () => {
      expect(fr('trente mille', 'full')).to.equal('30000');
    });

    it('point décimal conservé', () => {
      expect(fr('deux virgule cinq', 'full')).to.equal('2.5');
    });

    it('dans une phrase', () => {
      expect(fr('soit deux virgule cinq dix-millionièmes', 'full')).to.equal('soit 0.00000025');
    });
  });

  describe("'school'", () => {
    it('trois fois dix puissance quatre', () => {
      expect(fr('trois fois dix puissance quatre', 'school')).to.equal('3 × 10⁴');
    });

    it('mantisse décimale et exposant négatif', () => {
      expect(fr('deux virgule cinq fois dix puissance moins deux', 'school')).to.equal('2,5 × 10⁻²');
    });

    it('mantisse gardée telle que dite (non normalisée)', () => {
      expect(fr('vingt cinq fois dix puissance trois', 'school')).to.equal('25 × 10³');
    });

    it('sans mantisse dite', () => {
      expect(fr('dix puissance moins trois', 'school')).to.equal('10⁻³');
    });

    it('exposant à deux chiffres', () => {
      expect(fr('six virgule zéro deux fois dix puissance vingt trois', 'school')).to.equal('6,02 × 10²³');
    });

    it('exposant négatif à deux chiffres', () => {
      expect(fr('un virgule six fois dix puissance moins dix neuf', 'school')).to.equal('1,6 × 10⁻¹⁹');
    });

    it('nombre dit sans puissance : écrit en entier', () => {
      expect(fr('trente mille', 'school')).to.equal('30000');
    });

    it('grand nombre dit sans puissance : écrit en entier', () => {
      expect(fr('mille trillions', 'school')).to.equal('1000000000000000000000');
    });

    it('décimal : virgule', () => {
      expect(fr('deux virgule cinq', 'school')).to.equal('2,5');
    });

    it('rang décimal : virgule', () => {
      expect(fr('deux virgule cinq centièmes', 'school')).to.equal('0,025');
    });

    it('fraction inchangée', () => {
      expect(fr('deux centièmes', 'school')).to.equal('2/100');
    });

    it('dans une phrase', () => {
      expect(fr('la masse vaut deux virgule cinq fois dix puissance moins deux grammes', 'school'))
        .to.equal('la masse vaut 2,5 × 10⁻² grammes');
    });

    it('phrase mêlant nombre dit en entier et puissance', () => {
      expect(fr('il a trente pommes et trois fois dix puissance quatre graines', 'school'))
        .to.equal('il a 30 pommes et 3 × 10⁴ graines');
    });
  });
});

describe('[en] notation', () => {
  describe("'full'", () => {
    it('small number without exponent', () => {
      expect(en('two point five times ten to the minus seven', 'full')).to.equal('0.00000025');
    });

    it('large number without exponent', () => {
      expect(en('six point zero two times ten to the twenty three', 'full')).to.equal('602000000000000000000000');
    });
  });

  describe("'school'", () => {
    it('three times ten to the four', () => {
      expect(en('three times ten to the four', 'school')).to.equal('3 × 10⁴');
    });

    it('decimal mantissa, negative exponent: decimal point', () => {
      expect(en('two point five times ten to the minus two', 'school')).to.equal('2.5 × 10⁻²');
    });

    it('mantissa kept as said', () => {
      expect(en('twenty five times ten to the three', 'school')).to.equal('25 × 10³');
    });

    it('no mantissa said', () => {
      expect(en('ten to the minus three', 'school')).to.equal('10⁻³');
    });

    it('decimal: point', () => {
      expect(en('two point five', 'school')).to.equal('2.5');
    });

    it('in a sentence', () => {
      expect(en('the mass is two point five times ten to the minus two grams', 'school'))
        .to.equal('the mass is 2.5 × 10⁻² grams');
    });
  });
});

describe('[es] notation', () => {
  describe("'full'", () => {
    it('número pequeño sin exponente', () => {
      expect(es('dos coma cinco por diez elevado a menos siete', 'full')).to.equal('0.00000025');
    });
  });

  describe("'school'", () => {
    it('tres por diez elevado a cuatro', () => {
      expect(es('tres por diez elevado a cuatro', 'school')).to.equal('3 × 10⁴');
    });

    it('mantisa decimal, exponente negativo: coma', () => {
      expect(es('dos coma cinco por diez elevado a menos dos', 'school')).to.equal('2,5 × 10⁻²');
    });

    it('mantisa tal como se dijo', () => {
      expect(es('veinticinco por diez elevado a tres', 'school')).to.equal('25 × 10³');
    });

    it('sin mantisa', () => {
      expect(es('diez elevado a menos tres', 'school')).to.equal('10⁻³');
    });

    it('decimal: coma', () => {
      expect(es('dos coma cinco', 'school')).to.equal('2,5');
    });

    it('en una frase', () => {
      expect(es('la masa es de dos coma cinco por diez elevado a menos dos gramos', 'school'))
        .to.equal('la masa es de 2,5 × 10⁻² gramos');
    });
  });
});
