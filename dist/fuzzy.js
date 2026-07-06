"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cljFuzzy = _interopRequireDefault(require("clj-fuzzy"));
var _itsSet = _interopRequireDefault(require("its-set"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = (word, haystack) => {
  return (haystack || _constants.ALL_WORDS).map(numberWord => ({
    word: numberWord,
    score: _cljFuzzy.default.metrics.jaro(numberWord, word)
  })).reduce((acc, stat) => !(0, _itsSet.default)(acc.score) || stat.score > acc.score ? stat : acc, {}).word;
};
exports.default = _default;