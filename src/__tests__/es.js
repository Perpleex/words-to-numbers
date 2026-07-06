 
import { expect } from 'chai';
import wtn from '../';
const { it } = global;

const es = (text, options = {}) => wtn(text, { ...options, locale: 'es' });

it('[es] cero', () => {
  expect(es('cero')).to.equal(0);
});

it('[es] once', () => {
  expect(es('once')).to.equal(11);
});

it('[es] quince', () => {
  expect(es('quince')).to.equal(15);
});

it('[es] dieciséis', () => {
  expect(es('dieciséis')).to.equal(16);
});

it('[es] dieciseis (sans accent)', () => {
  expect(es('dieciseis')).to.equal(16);
});

it('[es] diecinueve', () => {
  expect(es('diecinueve')).to.equal(19);
});

it('[es] veintiuno', () => {
  expect(es('veintiuno')).to.equal(21);
});

it('[es] veintidós', () => {
  expect(es('veintidós')).to.equal(22);
});

it('[es] veinticinco', () => {
  expect(es('veinticinco')).to.equal(25);
});

it('[es] treinta y cuatro', () => {
  expect(es('treinta y cuatro')).to.equal(34);
});

it('[es] noventa y nueve', () => {
  expect(es('noventa y nueve')).to.equal(99);
});

it('[es] cien', () => {
  expect(es('cien')).to.equal(100);
});

it('[es] ciento uno', () => {
  expect(es('ciento uno')).to.equal(101);
});

it('[es] ciento cincuenta y tres', () => {
  expect(es('ciento cincuenta y tres')).to.equal(153);
});

it('[es] doscientos', () => {
  expect(es('doscientos')).to.equal(200);
});

it('[es] doscientos cincuenta y tres', () => {
  expect(es('doscientos cincuenta y tres')).to.equal(253);
});

it('[es] quinientos', () => {
  expect(es('quinientos')).to.equal(500);
});

it('[es] novecientos noventa y nueve', () => {
  expect(es('novecientos noventa y nueve')).to.equal(999);
});

it('[es] mil', () => {
  expect(es('mil')).to.equal(1000);
});

it('[es] dos mil', () => {
  expect(es('dos mil')).to.equal(2000);
});

it('[es] mil novecientos ochenta y cuatro', () => {
  expect(es('mil novecientos ochenta y cuatro')).to.equal(1984);
});

it('[es] un millón', () => {
  expect(es('un millón')).to.equal(1000000);
});

it('[es] dos millones', () => {
  expect(es('dos millones')).to.equal(2000000);
});

it('[es] tres millones quinientos mil', () => {
  expect(es('tres millones quinientos mil')).to.equal(3500000);
});

it('[es] tres coma cinco', () => {
  expect(es('tres coma cinco')).to.equal(3.5);
});

it('[es] cuarenta y dos coma cinco', () => {
  expect(es('cuarenta y dos coma cinco')).to.equal(42.5);
});

it('[es] cero coma cinco', () => {
  expect(es('cero coma cinco')).to.equal(0.5);
});

it('[es] tres coma catorce', () => {
  expect(es('tres coma catorce')).to.equal(3.14);
});

it('[es] dos coma setenta y cinco', () => {
  expect(es('dos coma setenta y cinco')).to.equal(2.75);
});

it('[es] siete coma cero cinco', () => {
  expect(es('siete coma cero cinco')).to.equal(7.05);
});

it('[es] veintitrés coma nueve', () => {
  expect(es('veintitrés coma nueve')).to.equal(23.9);
});

it('[es] diez coma veinticinco', () => {
  expect(es('diez coma veinticinco')).to.equal(10.25);
});

it('[es] tres punto uno cuatro', () => {
  expect(es('tres punto uno cuatro')).to.equal(3.14);
});

it('[es] tengo veinticinco años', () => {
  expect(es('tengo veinticinco años')).to.equal('tengo 25 años');
});

// --- fracciones ---
it('[es] un medio', () => {
  expect(es('un medio')).to.equal('1/2');
});

it('[es] tres cuartos', () => {
  expect(es('tres cuartos')).to.equal('3/4');
});

it('[es] dos tercios', () => {
  expect(es('dos tercios')).to.equal('2/3');
});

it('[es] tres quintos', () => {
  expect(es('tres quintos')).to.equal('3/5');
});

it('[es] siete décimos', () => {
  expect(es('siete décimos')).to.equal('7/10');
});

it('[es] tres sobre cuatro', () => {
  expect(es('tres sobre cuatro')).to.equal('3/4');
});
