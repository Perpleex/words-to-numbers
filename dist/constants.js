'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BLACKLIST_SINGULAR_WORDS = exports.ALL_WORDS = exports.TOKEN_TYPE = exports.PUNCTUATION = exports.DECIMALS = exports.JOINERS = exports.NUMBER_WORDS = exports.MAGNITUDE_KEYS = exports.TEN_KEYS = exports.UNIT_KEYS = exports.NUMBER = exports.MAGNITUDE = exports.TEN = exports.UNIT = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UNIT = exports.UNIT = {
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
  onze: 11
};

var TEN = exports.TEN = {
  dix: 10,
  //  vingt: 20,
  trente: 30,
  quarante: 40,
  cinquante: 50,
  //  soixante: 60,
  septante: 70,
  octante: 80,
  huitante: 80,
  nonante: 90
};

var MAGNITUDE = exports.MAGNITUDE = {
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
  decillions: 1000000000000000000000000000000000000000000000000000000000000
};

var NUMBER = exports.NUMBER = (0, _extends3.default)({}, UNIT, TEN, MAGNITUDE);

var UNIT_KEYS = exports.UNIT_KEYS = (0, _keys2.default)(UNIT);
var TEN_KEYS = exports.TEN_KEYS = (0, _keys2.default)(TEN);
var MAGNITUDE_KEYS = exports.MAGNITUDE_KEYS = (0, _keys2.default)(MAGNITUDE);

var NUMBER_WORDS = exports.NUMBER_WORDS = [].concat((0, _toConsumableArray3.default)(UNIT_KEYS), (0, _toConsumableArray3.default)(TEN_KEYS), (0, _toConsumableArray3.default)(MAGNITUDE_KEYS));

var JOINERS = exports.JOINERS = ['et'];
var DECIMALS = exports.DECIMALS = ['point', 'points', 'virgule'];

var PUNCTUATION = exports.PUNCTUATION = ['.', ',', '\\', '#', '!', '$', '%', '^', '&', '/', '*', ';', ':', '{', '}', '=', '-', '_', '`', '~', '(', ')', ' '];

var TOKEN_TYPE = exports.TOKEN_TYPE = {
  UNIT: 0,
  TEN: 1,
  MAGNITUDE: 2,
  DECIMAL: 3,
  HUNDRED: 4
};

var ALL_WORDS = exports.ALL_WORDS = [].concat((0, _toConsumableArray3.default)(NUMBER_WORDS), JOINERS, DECIMALS);

var BLACKLIST_SINGULAR_WORDS = exports.BLACKLIST_SINGULAR_WORDS = ['a'];