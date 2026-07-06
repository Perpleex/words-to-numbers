"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.wordsToNumbers = wordsToNumbers;
var _parser = _interopRequireDefault(require("./parser"));
var _compiler = _interopRequireDefault(require("./compiler"));
var _constants = require("./constants");
var _fractions = _interopRequireDefault(require("./fractions"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function compile(text, options) {
  const regions = (0, _parser.default)(text, options);
  if (!regions.length) return text;
  return (0, _compiler.default)({
    text,
    regions
  });
}
function wordsToNumbers(text, options = {}) {
  (0, _constants.setLocale)(options.locale);
  const withFractions = (0, _fractions.default)(text, options, compile);
  return compile(withFractions, options);
}
var _default = exports.default = wordsToNumbers;