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
var _scientific = _interopRequireDefault(require("./scientific"));
var _notation = require("./notation");
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
  const notation = (0, _notation.getNotation)(options);
  const withFractions = (0, _fractions.default)(text, options, compile);
  const compiled = compile(withFractions, options);
  const result = (0, _scientific.default)(compiled, notation);
  return (0, _notation.finalize)(result, notation);
}
var _default = exports.default = wordsToNumbers;