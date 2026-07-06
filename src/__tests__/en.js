 
import { expect } from 'chai';
import wtn from '../';
const { it } = global;

// Run every case against the English locale of the multilingual engine.
const en = (text, options = {}) => wtn(text, { ...options, locale: 'en' });

it('[en] one hundred', () => {
  expect(en('one hundred')).to.equal(100);
});

it('[en] one hundred two', () => {
  expect(en('one hundred two')).to.equal(102);
});

it('[en] one hundred and five', () => {
  expect(en('one hundred and five')).to.equal(105);
});

it('[en] one hundred and twenty five', () => {
  expect(en('one hundred and twenty five')).to.equal(125);
});

it('[en] four thousand and thirty', () => {
  expect(en('four thousand and thirty')).to.equal(4030);
});

it('[en] six million five thousand and two', () => {
  expect(en('six million five thousand and two')).to.equal(6005002);
});

it('[en] a thousand one hundred and eleven', () => {
  expect(en('a thousand one hundred and eleven')).to.equal(1111);
});

it('[en] sixty nine', () => {
  expect(en('sixty nine')).to.equal(69);
});

it('[en] twenty thousand five hundred and sixty nine', () => {
  expect(en('twenty thousand five hundred and sixty nine')).to.equal(20569);
});

it('[en] five quintillion', () => {
  expect(en('five quintillion')).to.equal(5000000000000000000);
});

it('[en] one-hundred', () => {
  expect(en('one-hundred')).to.equal(100);
});

it('[en] one-hundred and five', () => {
  expect(en('one-hundred and five')).to.equal(105);
});

it('[en] one-hundred and twenty-five', () => {
  expect(en('one-hundred and twenty-five')).to.equal(125);
});

it('[en] four-thousand and thirty', () => {
  expect(en('four-thousand and thirty')).to.equal(4030);
});

it('[en] six-million five-thousand and two', () => {
  expect(en('six-million five-thousand and two')).to.equal(6005002);
});

it('[en] a thousand, one-hundred and eleven', () => {
  expect(en('a thousand, one-hundred and eleven')).to.equal(1111);
});

it('[en] twenty-thousand, five-hundred and sixty-nine', () => {
  expect(en('twenty-thousand, five-hundred and sixty-nine')).to.equal(20569);
});

it('[en] there were twenty-thousand, five-hundred and sixty-nine X in the five quintillion Y', () => {
  expect(en('there were twenty-thousand, five-hundred and sixty-nine X in the five quintillion Y'))
  .to
  .equal('there were 20569 X in the 5000000000000000000 Y');
});

it('[en] one two three', () => {
  expect(en('one two three')).to.equal('1 2 3');
});

it('[en] test one two three test', () => {
  expect(en('test one two three test')).to.equal('test 1 2 3 test');
});

it('[en] won huntred', () => {
  expect(en('won huntred', { fuzzy: true })).to.equal(100);
});

it('[en] too thousant and fiev', () => {
  expect(en('too thousant and fiev', { fuzzy: true })).to.equal(2005);
});

it('[en] tree millyon sefen hunderd and twinty sex', () => {
  expect(en('tree millyon sefen hunderd and twinty sex', { fuzzy: true })).to.equal(3000726);
});

it('[en] forty two point five', () => {
  expect(en('forty two point five')).to.equal(42.5);
});

it('[en] ten point five', () => {
  expect(en('ten point five')).to.equal(10.5);
});

it('[en] three point one four one five nine two six', () => {
  expect(en('three point one four one five nine two six')).to.equal(3.1415926);
});

it('[en] first', () => {
  expect(en('first')).to.equal(1);
});

it('[en] second', () => {
  expect(en('second')).to.equal(2);
});

it('[en] third', () => {
  expect(en('third')).to.equal(3);
});

it('[en] fourteenth', () => {
  expect(en('fourteenth')).to.equal(14);
});

it('[en] twenty fifth', () => {
  expect(en('twenty fifth')).to.equal(25);
});

it('[en] thirty fourth', () => {
  expect(en('thirty fourth')).to.equal(34);
});

it('[en] forty seventh', () => {
  expect(en('forty seventh')).to.equal(47);
});

it('[en] fifty third', () => {
  expect(en('fifty third')).to.equal(53);
});

it('[en] sixtieth', () => {
  expect(en('sixtieth')).to.equal(60);
});

it('[en] seventy second', () => {
  expect(en('seventy second')).to.equal(72);
});

it('[en] eighty ninth', () => {
  expect(en('eighty ninth')).to.equal(89);
});

it('[en] ninety sixth', () => {
  expect(en('ninety sixth')).to.equal(96);
});

it('[en] one hundred and eighth', () => {
  expect(en('one hundred and eighth')).to.equal(108);
});

it('[en] one hundred and tenth', () => {
  expect(en('one hundred and tenth')).to.equal(110);
});

it('[en] one hundred and ninety ninth', () => {
  expect(en('one hundred and ninety ninth')).to.equal(199);
});

it('[en] digit one', () => {
  expect(en('digit one')).to.equal('digit 1');
});

it('[en] digit one (trailing space)', () => {
  expect(en('digit one ')).to.equal('digit 1 ');
});

it('[en] thousand', () => {
  expect(en('thousand')).to.equal(1000);
});

it('[en] million', () => {
  expect(en('million')).to.equal(1000000);
});

it('[en] billion', () => {
  expect(en('billion')).to.equal(1000000000);
});

it('[en] xxxxxxx one hundred', () => {
  expect(en('xxxxxxx one hundred')).to.equal('xxxxxxx 100');
});

it('[en] and', () => {
  expect(en('and')).to.equal('and');
});

it('[en] a', () => {
  expect(en('a')).to.equal('a');
});

it('[en] junkvalue', () => {
  expect(en('junkvalue')).to.equal('junkvalue');
});

it('[en] eleven dot one', () => {
  expect(en('eleven dot one')).to.eq(11.1);
});

it('[en] Fifty People, One Question: Brooklyn', () => {
  expect(en('Fifty People, One Question: Brooklyn')).to.eq('50 People, 1 Question: Brooklyn');
});

it('[en] Model Fifty-One Fifty-Six', () => {
  expect(en('Model Fifty-One Fifty-Six')).to.eq('Model 51 56');
});

it('[en] Fifty Million Frenchmen', () => {
  expect(en('Fifty Million Frenchmen')).to.eq('50000000 Frenchmen');
});

it('[en] A Thousand and One Wives', () => {
  expect(en('A Thousand and One Wives')).to.eq('1001 Wives');
});

it('[en] Ten Thousand Pictures of You', () => {
  expect(en('Ten Thousand Pictures of You')).to.eq('10000 Pictures of You');
});

it('[en] nineteen eighty four', () => {
  expect(en('nineteen eighty four', { impliedHundreds: true })).to.eq(1984);
});

it('[en] one thirty (implied)', () => {
  expect(en('one thirty', { impliedHundreds: true })).to.eq(130);
});

it('[en] six sixty two', () => {
  expect(en('six sixty two', { impliedHundreds: true })).to.eq(662);
});

it('[en] ten twelve', () => {
  expect(en('ten twelve', { impliedHundreds: true })).to.eq(1012);
});

it('[en] nineteen ten', () => {
  expect(en('nineteen ten', { impliedHundreds: true })).to.eq(1910);
});

it('[en] twenty ten', () => {
  expect(en('twenty ten', { impliedHundreds: true })).to.eq(2010);
});

it('[en] twenty seventeen', () => {
  expect(en('twenty seventeen', { impliedHundreds: true })).to.eq(2017);
});

it('[en] twenty twenty', () => {
  expect(en('twenty twenty', { impliedHundreds: true })).to.eq(2020);
});

it('[en] twenty twenty one', () => {
  expect(en('twenty twenty one', { impliedHundreds: true })).to.eq(2021);
});

it('[en] fifty sixty three', () => {
  expect(en('fifty sixty three', { impliedHundreds: true })).to.eq(5063);
});

it('[en] fifty sixty', () => {
  expect(en('fifty sixty', { impliedHundreds: true })).to.eq(5060);
});

it('[en] three thousand (implied)', () => {
  expect(en('three thousand', { impliedHundreds: true })).to.eq(3000);
});

it('[en] fifty sixty three thousand', () => {
  expect(en('fifty sixty three thousand', { impliedHundreds: true })).to.eq(5063000);
});

it('[en] one hundred thousand', () => {
  expect(en('one hundred thousand')).to.eq(100000);
});

it('[en] I have zero apples and four oranges', () => {
  expect(en('I have zero apples and four oranges')).to.eq('I have 0 apples and 4 oranges');
});

it('[en] Dot two Dot', () => {
  expect(en('Dot two Dot')).to.eq('0.2 Dot');
});

it('[en] seventeen dot two four dot twelve dot five', () => {
  expect(en('seventeen dot two four dot twelve dot five')).to.eq('17.24 dot 12.5');
});

it('[en] two hundred ninety-five million', () => {
  expect(en('two hundred ninety-five million')).to.eq(295000000);
});

it('[en] two hundred ninety-five billion', () => {
  expect(en('two hundred ninety-five billion')).to.eq(295000000000);
});

it('[en] one thirty thousand', () => {
  expect(en('one thirty thousand', { impliedHundreds: true })).to.eq(130000);
});

it('[en] nineteen eighty thousand', () => {
  expect(en('nineteen eighty thousand', { impliedHundreds: true })).to.eq(1980000);
});

it('[en] one hundred two thousand', () => {
  expect(en('one hundred two thousand')).to.eq(102000);
});

it('[en] one hundred and two thousand', () => {
  expect(en('one hundred and two thousand')).to.eq(102000);
});

it('[en] two thousand ninety-five billion', () => {
  expect(en('two thousand ninety-five billion')).to.eq(2095000000000);
});

it('[en] nine hundred ninety nine billion', () => {
  expect(en('nine hundred ninety nine billion')).to.eq(999000000000);
});

it('[en] one thousand ninety nine billion', () => {
  expect(en('one thousand ninety nine billion')).to.eq(1099000000000);
});

it('[en] two thousand ninety-five trillion', () => {
  expect(en('two thousand ninety-five trillion')).to.eq(2095000000000000);
});

it('[en] two thousand billion', () => {
  expect(en('two thousand billion')).to.eq(2000000000000);
});

it('[en] two thousand million', () => {
  expect(en('two thousand million')).to.eq(2000000000);
});

// --- fractions ---
it('[en] one half', () => {
  expect(en('one half')).to.equal('1/2');
});

it('[en] a half', () => {
  expect(en('a half')).to.equal('1/2');
});

it('[en] three quarters', () => {
  expect(en('three quarters')).to.equal('3/4');
});

it('[en] two thirds', () => {
  expect(en('two thirds')).to.equal('2/3');
});

it('[en] three fifths', () => {
  expect(en('three fifths')).to.equal('3/5');
});

it('[en] one third (singular ordinal form)', () => {
  expect(en('one third')).to.equal('1/3');
});

it('[en] one fifth (singular ordinal form)', () => {
  expect(en('one fifth')).to.equal('1/5');
});

it('[en] three over four', () => {
  expect(en('three over four')).to.equal('3/4');
});

it('[en] twenty fifth stays an ordinal (25)', () => {
  expect(en('twenty fifth')).to.equal(25);
});

it('[en] thirty fourth stays an ordinal (34)', () => {
  expect(en('thirty fourth')).to.equal(34);
});

it('[en] fractions:false disables fraction handling', () => {
  expect(en('one fifth', { fractions: false })).to.equal('1 5');
});

it('[en] fractions:force treats ambiguous ordinal as fraction', () => {
  expect(en('one fifth', { fractions: 'force' })).to.equal('1/5');
});
