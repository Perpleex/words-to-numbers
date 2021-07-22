/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import wtn from '../';
const { it } = global;


it('quarante six millions', () => {
  expect(wtn('quarante six millions')).to.equal(46000000);
});

it('cent', () => {
  expect(wtn('cent')).to.equal(100);
});

it('cent soixante dix', () => {
  expect(wtn('cent soixante dix')).to.equal(170);
});

it('quarante six million', () => {
  expect(wtn('quarante six million')).to.equal(46000000);
});

it('un milliard deux cent trente million dix huit mille six', () => {
  expect(wtn('un milliard deux cent trente million dix huit mille six')).to.equal(1230018006);
});


it('deux cent million', () => {
  expect(wtn('deux cent million')).to.equal(200000000);
});

it('deux cent deux million', () => {
  expect(wtn('deux cent deux million')).to.equal(202000000);
});

it('deux cent mille', () => {
  expect(wtn('deux cent mille')).to.equal(200000);
});

it('deux cent neuf mille', () => {
  expect(wtn('deux cent neuf mille')).to.equal(209000);
});

it('deux cent dix neuf mille', () => {
  expect(wtn('deux cent dix neuf mille')).to.equal(219000);
});

it('dix sept', () => {
  expect(wtn('dix sept')).to.equal(17);
});

it('vingt et un', () => {
  expect(wtn('vingt et un')).to.equal(21);
});

it('vingt trois', () => {
  expect(wtn('vingt trois')).to.equal(23);
});

it('cent deux', () => {
  expect(wtn('cent deux')).to.equal(102);
});

it('quatre vingt un', () => {
  expect(wtn('quatre vingt un')).to.equal(81);
});

it('quatre-vingt-un', () => {
  expect(wtn('quatre-vingt-un')).to.equal(81);
});

it('quatre vingt dix', () => {
  expect(wtn('quatre vingt dix')).to.equal(90);
});

it('quatre-vingt-dix', () => {
  expect(wtn('quatre vingt dix')).to.equal(90);
});

it('nonante', () => {
  expect(wtn('nonante')).to.equal(90);
});

it('nonante cinq', () => {
  expect(wtn('nonante cinq')).to.equal(95);
});

it('soixante dix', () => {
  expect(wtn('soixante dix')).to.equal(70);
});

it('soixante et onze', () => {
  expect(wtn('soixante et onze')).to.equal(71);
});

it('quatre vingt onze', () => {
  expect(wtn('quatre vingt onze')).to.equal(91);
});

it('cent cinq', () => {
  expect(wtn('cent cinq')).to.equal(105);
});

it('cent vingt cinq', () => {
  expect(wtn('cent vingt cinq')).to.equal(125);
});

it('quatre mille trente', () => {
  expect(wtn('quatre mille trente')).to.equal(4030);
});

it('six million cinq mille deux', () => {
  expect(wtn('six million cinq mille deux')).to.equal(6005002);
});

it('mille cent onze', () => {
  expect(wtn('mille cent onze')).to.equal(1111);
});

it('soixante neuf', () => {
  expect(wtn('soixante neuf')).to.equal(69);
});

it('douze mille nonante cinq', () => {
  expect(wtn('douze mille nonante cinq')).to.equal(12095);
});

it('vingt mille cinq cent soixante neuf', () => {
  expect(wtn('vingt mille cinq cent soixante neuf')).to.equal(20569);
});

it('cinq quintillion', () => {
  expect(wtn('cinq quintillion')).to.equal(5000000000000000000000000000000);
});

it('cent mille', () => {
  expect(wtn('cent mille')).to.equal(100000);
});

it('dix mille', () => {
  expect(wtn('dix mille')).to.equal(10000);
});

it('dix neuf mille', () => {
  expect(wtn('dix neuf mille')).to.equal(19000);
});

it('vingt neuf mille', () => {
  expect(wtn('vingt neuf mille')).to.equal(29000);
});

it('seize mille', () => {
  expect(wtn('seize mille')).to.equal(16000);
});

it('there were vingt mille cinq cent soixante neuf X in the cinq quintillion six Y', () => {
  expect(wtn('there were vingt mille cinq cent soixante neuf X in the cinq quintillion six Y'))
  .to
  .equal('there were 20569 X in the 5e+30 Y');
});

it('there were trente mille cinq cent soixante neuf X in the cinq quintillion Y', () => {
  expect(wtn('there were trente mille cinq cent soixante neuf X in the cinq quintillion Y'))
  .to
  .equal('there were 30569 X in the 5e+30 Y');
});

it('un deux trois', () => {
  expect(wtn('un deux trois')).to.equal('1 2 3');
});

it('test un deux trois test', () => {
  expect(wtn('test un deux trois test')).to.equal('test 1 2 3 test');
});

it('quarante deux virgule cinq', () => {
  expect(wtn('quarante deux virgule cinq')).to.equal(42.5);
});

it('quarante deux point cinq', () => {
  expect(wtn('quarante deux point cinq')).to.equal(42.5);
});

it('dix virgule cinq', () => {
  expect(wtn('dix virgule cinq')).to.equal(10.5);
});

it('trois virgule un quatre un cinq neuf deux six', () => {
  expect(wtn('trois virgule un quatre un cinq neuf deux six')).to.equal(3.1415926);
});

/* testing for ordinal numbers */
/*
it('first', () => {
  expect(wtn('first')).to.equal(1);
});

it('second', () => {
  expect(wtn('second')).to.equal(2);
});

it('third', () => {
  expect(wtn('third')).to.equal(3);
});

it('fourteenth', () => {
  expect(wtn('fourteenth')).to.equal(14);
});

it('twenty fifth', () => {
  expect(wtn('twenty fifth')).to.equal(25);
});

it('thirty fourth', () => {
  expect(wtn('thirty fourth')).to.equal(34);
});

it('forty seventh', () => {
  expect(wtn('forty seventh')).to.equal(47);
});

it('fifty third', () => {
  expect(wtn('fifty third')).to.equal(53);
});

it('sixtieth', () => {
  expect(wtn('sixtieth')).to.equal(60);
});

it('seventy second', () => {
  expect(wtn('seventy second')).to.equal(72);
});

it('eighty ninth', () => {
  expect(wtn('eighty ninth')).to.equal(89);
});

it('ninety sixth', () => {
  expect(wtn('ninety sixth')).to.equal(96);
});

it('one hundred and eighth', () => {
  expect(wtn('one hundred and eighth')).to.equal(108);
});

it('one hundred and tenth', () => {
  expect(wtn('one hundred and tenth')).to.equal(110);
});

it('one hundred and ninety ninth', () => {
  expect(wtn('one hundred and ninety ninth')).to.equal(199);
});

it('digit one', () => {
  expect(wtn('digit one')).to.equal('digit 1');
});

it('digit one ', () => {
  expect(wtn('digit one ')).to.equal('digit 1 ');
});

it('one thirty', () => {
  expect(wtn('one thirty')).to.equal('1 30');
});

it('thousand', () => {
  expect(wtn('thousand')).to.equal(1000);
});

it('million', () => {
  expect(wtn('million')).to.equal(1000000);
});

it('billion', () => {
  expect(wtn('billion')).to.equal(1000000000);
});

it('xxxxxxx one hundred', () => {
  expect(wtn('xxxxxxx one hundred')).to.equal('xxxxxxx 100');
});

it('and', () => {
  expect(wtn('and')).to.equal('and');
});

it('a', () => {
  expect(wtn('a')).to.equal('a');
});

it('junkvalue', () => {
  expect(wtn('junkvalue')).to.equal('junkvalue');
});

it('eleven dot one', () => {
  expect(wtn('eleven dot one')).to.eq(11.1);
});

it('Fifty People, One Question: Brooklyn', () => {
  expect(wtn('Fifty People, One Question: Brooklyn')).to.eq('50 People, 1 Question: Brooklyn');
});

it('Model Fifty-One Fifty-Six', () => {
  expect(wtn('Model Fifty-One Fifty-Six')).to.eq('Model 51 56');
});

it('Fifty Million Frenchmen', () => {
  expect(wtn('Fifty Million Frenchmen')).to.eq('50000000 Frenchmen');
});

it('A Thousand and One Wives', () => {
  expect(wtn('A Thousand and One Wives')).to.eq('1001 Wives');
});

it('Ten Thousand Pictures of You', () => {
  expect(wtn('Ten Thousand Pictures of You')).to.eq('10000 Pictures of You');
});

it('nineteen eighty four', () => {
  expect(wtn('nineteen eighty four', { impliedHundreds: true })).to.eq(1984);
});

it('one thirty', () => {
  expect(wtn('one thirty', { impliedHundreds: true })).to.eq(130);
});

it('six sixty two', () => {
  expect(wtn('six sixty two', { impliedHundreds: true })).to.eq(662);
});

it('ten twelve', () => {
  expect(wtn('ten twelve', { impliedHundreds: true })).to.eq(1012);
});

it('nineteen ten', () => {
  expect(wtn('nineteen ten', { impliedHundreds: true })).to.eq(1910);
});

it('twenty ten', () => {
  expect(wtn('twenty ten', { impliedHundreds: true })).to.eq(2010);
});

it('twenty seventeen', () => {
  expect(wtn('twenty seventeen', { impliedHundreds: true })).to.eq(2017);
});

it('twenty twenty', () => {
  expect(wtn('twenty twenty', { impliedHundreds: true })).to.eq(2020);
});

it('twenty twenty one', () => {
  expect(wtn('twenty twenty one', { impliedHundreds: true })).to.eq(2021);
});

it('fifty sixty three', () => {
  expect(wtn('fifty sixty three', { impliedHundreds: true })).to.eq(5063);
});

it('fifty sixty', () => {
  expect(wtn('fifty sixty', { impliedHundreds: true })).to.eq(5060);
});

it('three thousand', () => {
  expect(wtn('three thousand', { impliedHundreds: true })).to.eq(3000);
});

it('fifty sixty three thousand', () => {
  expect(wtn('fifty sixty three thousand', { impliedHundreds: true })).to.eq(5063000);
});

it('one hundred thousand', () => {
  expect(wtn('one hundred thousand')).to.eq(100000);
});

it('I have zero apples and four oranges', () => {
  expect(wtn('I have zero apples and four oranges')).to.eq('I have 0 apples and 4 oranges');
});

it('Dot two Dot', () => {
  expect(wtn('Dot two Dot')).to.eq('0.2 Dot');
});

it('seventeen dot two four dot twelve dot five', () => {
  expect(wtn('seventeen dot two four dot twelve dot five')).to.eq('17.24 dot 12.5');
});*/

// these dont work below fml

// it('one thirty thousand', () => {
//   expect(wtn('one thirty thousand', { impliedHundreds: true })).to.eq(130000);
// });

// it('nineteen eighty thousand', () => {
//   expect(wtn('nineteen eighty thousand', { impliedHundreds: true })).to.eq('19 80000');
// });

// it('one hundred two thousand', () => {
//   expect(wtn('one hundred two thousand')).to.eq(102000);
// });

// it('one hundred and two thousand', () => {
//   expect(wtn('one hundred and two thousand')).to.eq(102000);
// });
