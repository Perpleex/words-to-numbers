
import { expect } from 'chai';
import wtn from '../';
const { describe, it } = global;

// Small decimals in the three locales, read three ways:
//   - digit by digit after the decimal marker ("zéro virgule zéro zéro trois")
//   - literal decimal place ("deux virgule cinq centièmes")
//   - scientific notation with an exponent ("deux virgule cinq fois dix puissance moins deux",
//     positive too: "dix puissance trois")
// Literal place rule: an integer numerator stays a fraction ("deux centièmes"
// -> "2/100"), a decimal numerator becomes a decimal ("deux virgule cinq
// centièmes" -> 0.025).
// Values are compared exactly: the result must not carry float artifacts
// (0.12, not 0.12000000000000001).
const fr = (text, options = {}) => wtn(text, { ...options, locale: 'fr' });
const en = (text, options = {}) => wtn(text, { ...options, locale: 'en' });
const es = (text, options = {}) => wtn(text, { ...options, locale: 'es' });

describe('[fr] décimaux', () => {
  describe('chiffre par chiffre', () => {
    it('zéro virgule zéro zéro trois', () => {
      expect(fr('zéro virgule zéro zéro trois')).to.equal(0.003);
    });

    it('zero virgule zero zero trois (sans accent)', () => {
      expect(fr('zero virgule zero zero trois')).to.equal(0.003);
    });

    it('zéro virgule zéro zéro zéro un', () => {
      expect(fr('zéro virgule zéro zéro zéro un')).to.equal(0.0001);
    });

    it('zéro virgule un deux (sans artefact flottant)', () => {
      expect(fr('zéro virgule un deux')).to.equal(0.12);
    });

    it('zéro virgule trois trois trois (sans artefact flottant)', () => {
      expect(fr('zéro virgule trois trois trois')).to.equal(0.333);
    });
  });

  describe('zéros de tête avant un nombre', () => {
    it('zéro virgule zéro vingt cinq', () => {
      expect(fr('zéro virgule zéro vingt cinq')).to.equal(0.025);
    });

    it('un virgule zéro zéro douze', () => {
      expect(fr('un virgule zéro zéro douze')).to.equal(1.0012);
    });

    it('trois virgule zéro quatorze', () => {
      expect(fr('trois virgule zéro quatorze')).to.equal(3.014);
    });

    it('zéro virgule zéro cinquante', () => {
      expect(fr('zéro virgule zéro cinquante')).to.equal(0.05);
    });
  });

  describe('rang littéral', () => {
    it('deux centièmes (numérateur entier -> fraction)', () => {
      expect(fr('deux centièmes')).to.equal('2/100');
    });

    it('deux centième (singulier)', () => {
      expect(fr('deux centième')).to.equal('2/100');
    });

    it('trois dix-millièmes (numérateur entier -> fraction)', () => {
      expect(fr('trois dix-millièmes')).to.equal('3/10000');
    });

    it('deux virgule zéro centièmes (numérateur décimal -> décimal)', () => {
      expect(fr('deux virgule zéro centièmes')).to.equal(0.02);
    });

    it('deux virgule cinq centièmes', () => {
      expect(fr('deux virgule cinq centièmes')).to.equal(0.025);
    });

    it('zéro virgule trois millièmes', () => {
      expect(fr('zéro virgule trois millièmes')).to.equal(0.0003);
    });

    it('quatre virgule deux dix-millièmes', () => {
      expect(fr('quatre virgule deux dix-millièmes')).to.equal(0.00042);
    });

    it('un virgule cinq millionièmes', () => {
      expect(fr('un virgule cinq millionièmes')).to.equal(0.0000015);
    });

    it('dans une phrase', () => {
      expect(fr('il reste deux virgule cinq centièmes de litre')).to.equal('il reste 0.025 de litre');
    });
  });

  describe('exposant', () => {
    it('trois fois dix puissance moins trois', () => {
      expect(fr('trois fois dix puissance moins trois')).to.equal(0.003);
    });

    it('trois fois dix exposant moins trois', () => {
      expect(fr('trois fois dix exposant moins trois')).to.equal(0.003);
    });

    it('trois fois dix à la puissance moins trois', () => {
      expect(fr('trois fois dix à la puissance moins trois')).to.equal(0.003);
    });

    it('deux virgule cinq fois dix puissance moins deux', () => {
      expect(fr('deux virgule cinq fois dix puissance moins deux')).to.equal(0.025);
    });

    it('un virgule six fois dix puissance moins dix neuf', () => {
      expect(fr('un virgule six fois dix puissance moins dix neuf')).to.equal(1.6e-19);
    });

    it('dix puissance moins trois', () => {
      expect(fr('dix puissance moins trois')).to.equal(0.001);
    });

    it('trois fois dix puissance quatre (exposant positif)', () => {
      expect(fr('trois fois dix puissance quatre')).to.equal(30000);
    });

    it('dix puissance trois', () => {
      expect(fr('dix puissance trois')).to.equal(1000);
    });

    it('six virgule zéro deux fois dix puissance vingt trois', () => {
      expect(fr('six virgule zéro deux fois dix puissance vingt trois')).to.equal(6.02e23);
    });

    it('dans une phrase', () => {
      expect(fr('la masse vaut deux virgule cinq fois dix puissance moins deux grammes'))
        .to.equal('la masse vaut 0.025 grammes');
    });
  });
});

describe('[en] decimals', () => {
  describe('digit by digit', () => {
    it('zero point zero zero three', () => {
      expect(en('zero point zero zero three')).to.equal(0.003);
    });

    it('zero point zero zero zero one', () => {
      expect(en('zero point zero zero zero one')).to.equal(0.0001);
    });

    it('zero point one two (no float artifact)', () => {
      expect(en('zero point one two')).to.equal(0.12);
    });

    it('zero point three three three (no float artifact)', () => {
      expect(en('zero point three three three')).to.equal(0.333);
    });
  });

  describe('leading zeros before a number', () => {
    it('zero point zero twenty five', () => {
      expect(en('zero point zero twenty five')).to.equal(0.025);
    });

    it('one point zero zero twelve', () => {
      expect(en('one point zero zero twelve')).to.equal(1.0012);
    });

    it('three point zero fourteen', () => {
      expect(en('three point zero fourteen')).to.equal(3.014);
    });
  });

  describe('literal decimal place', () => {
    it('two hundredths (integer numerator -> fraction)', () => {
      expect(en('two hundredths')).to.equal('2/100');
    });

    it('three ten-thousandths (integer numerator -> fraction)', () => {
      expect(en('three ten-thousandths')).to.equal('3/10000');
    });

    it('two point zero hundredths (decimal numerator -> decimal)', () => {
      expect(en('two point zero hundredths')).to.equal(0.02);
    });

    it('two point five hundredths', () => {
      expect(en('two point five hundredths')).to.equal(0.025);
    });

    it('zero point three thousandths', () => {
      expect(en('zero point three thousandths')).to.equal(0.0003);
    });

    it('four point two ten-thousandths', () => {
      expect(en('four point two ten-thousandths')).to.equal(0.00042);
    });

    it('one point five millionths', () => {
      expect(en('one point five millionths')).to.equal(0.0000015);
    });

    it('in a sentence', () => {
      expect(en('there is two point five hundredths of liquid left'))
        .to.equal('there is 0.025 of liquid left');
    });
  });

  describe('exponent', () => {
    it('three times ten to the minus three', () => {
      expect(en('three times ten to the minus three')).to.equal(0.003);
    });

    it('three times ten to the power of minus three', () => {
      expect(en('three times ten to the power of minus three')).to.equal(0.003);
    });

    it('three times ten to the negative three', () => {
      expect(en('three times ten to the negative three')).to.equal(0.003);
    });

    it('two point five times ten to the power of negative two', () => {
      expect(en('two point five times ten to the power of negative two')).to.equal(0.025);
    });

    it('one point six times ten to the minus nineteen', () => {
      expect(en('one point six times ten to the minus nineteen')).to.equal(1.6e-19);
    });

    it('ten to the minus three', () => {
      expect(en('ten to the minus three')).to.equal(0.001);
    });

    it('three times ten to the four (positive exponent)', () => {
      expect(en('three times ten to the four')).to.equal(30000);
    });

    it('ten to the power of three', () => {
      expect(en('ten to the power of three')).to.equal(1000);
    });

    it('six point zero two times ten to the twenty three', () => {
      expect(en('six point zero two times ten to the twenty three')).to.equal(6.02e23);
    });

    it('in a sentence', () => {
      expect(en('the mass is two point five times ten to the minus two grams'))
        .to.equal('the mass is 0.025 grams');
    });
  });
});

describe('[es] decimales', () => {
  describe('cifra por cifra', () => {
    it('cero coma cero cero tres', () => {
      expect(es('cero coma cero cero tres')).to.equal(0.003);
    });

    it('cero coma cero cero cero uno', () => {
      expect(es('cero coma cero cero cero uno')).to.equal(0.0001);
    });

    it('cero coma uno dos (sin artefacto flotante)', () => {
      expect(es('cero coma uno dos')).to.equal(0.12);
    });

    it('cero coma tres tres tres (sin artefacto flotante)', () => {
      expect(es('cero coma tres tres tres')).to.equal(0.333);
    });
  });

  describe('ceros iniciales antes de un número', () => {
    it('cero coma cero veinticinco', () => {
      expect(es('cero coma cero veinticinco')).to.equal(0.025);
    });

    it('uno coma cero cero doce', () => {
      expect(es('uno coma cero cero doce')).to.equal(1.0012);
    });

    it('tres coma cero catorce', () => {
      expect(es('tres coma cero catorce')).to.equal(3.014);
    });
  });

  describe('orden decimal literal', () => {
    it('dos centésimos (numerador entero -> fracción)', () => {
      expect(es('dos centésimos')).to.equal('2/100');
    });

    it('dos centésimo (singular)', () => {
      expect(es('dos centésimo')).to.equal('2/100');
    });

    it('tres diezmilésimos (numerador entero -> fracción)', () => {
      expect(es('tres diezmilésimos')).to.equal('3/10000');
    });

    it('dos coma cero centésimos (numerador decimal -> decimal)', () => {
      expect(es('dos coma cero centésimos')).to.equal(0.02);
    });

    it('dos coma cinco centésimos', () => {
      expect(es('dos coma cinco centésimos')).to.equal(0.025);
    });

    it('cero coma tres milésimos', () => {
      expect(es('cero coma tres milésimos')).to.equal(0.0003);
    });

    it('cuatro coma dos diezmilésimos', () => {
      expect(es('cuatro coma dos diezmilésimos')).to.equal(0.00042);
    });

    it('uno coma cinco millonésimos', () => {
      expect(es('uno coma cinco millonésimos')).to.equal(0.0000015);
    });

    it('en una frase', () => {
      expect(es('quedan dos coma cinco centésimos de litro'))
        .to.equal('quedan 0.025 de litro');
    });
  });

  describe('exponente', () => {
    it('tres por diez elevado a menos tres', () => {
      expect(es('tres por diez elevado a menos tres')).to.equal(0.003);
    });

    it('tres por diez a la menos tres', () => {
      expect(es('tres por diez a la menos tres')).to.equal(0.003);
    });

    it('dos coma cinco por diez elevado a menos dos', () => {
      expect(es('dos coma cinco por diez elevado a menos dos')).to.equal(0.025);
    });

    it('uno coma seis por diez elevado a menos diecinueve', () => {
      expect(es('uno coma seis por diez elevado a menos diecinueve')).to.equal(1.6e-19);
    });

    it('diez elevado a menos tres', () => {
      expect(es('diez elevado a menos tres')).to.equal(0.001);
    });

    it('tres por diez elevado a cuatro (exponente positivo)', () => {
      expect(es('tres por diez elevado a cuatro')).to.equal(30000);
    });

    it('diez elevado a tres', () => {
      expect(es('diez elevado a tres')).to.equal(1000);
    });

    it('seis coma cero dos por diez elevado a veintitrés', () => {
      expect(es('seis coma cero dos por diez elevado a veintitrés')).to.equal(6.02e23);
    });

    it('en una frase', () => {
      expect(es('la masa es de dos coma cinco por diez elevado a menos dos gramos'))
        .to.equal('la masa es de 0.025 gramos');
    });
  });
});
