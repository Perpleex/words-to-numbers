'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _util = require('./util');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNumber = function getNumber(region) {
  var sum = 0;
  var lastMagnitudeResult = void 0;
  var decimalReached = false;
  var decimalUnits = [];
  region.subRegions.forEach(function (subRegion) {
    var tokens = subRegion.tokens;
    var type = subRegion.type;

    var subRegionSum = 0;
    if (type === _constants.TOKEN_TYPE.DECIMAL) {
      decimalReached = true;
      return;
    }
    if (decimalReached) {
      decimalUnits.push(subRegion);
      return;
    }
    switch (type) {
      case _constants.TOKEN_TYPE.MAGNITUDE:
      case _constants.TOKEN_TYPE.HUNDRED:
        {
          var _ret = function () {
            subRegionSum = 1;
            var tokensCount = tokens.length;
            if (tokensCount === 1 && tokens[0].type === _constants.TOKEN_TYPE.MAGNITUDE && sum !== 0 && _constants.NUMBER[tokens[0].lowerCaseValue] > 999) {
              if (!lastMagnitudeResult || lastMagnitudeResult < _constants.NUMBER[tokens[0].lowerCaseValue]) {
                sum *= _constants.NUMBER[tokens[0].lowerCaseValue];
                subRegionSum = 0;
                lastMagnitudeResult = sum;
              } else {
                var localDelta = sum - lastMagnitudeResult;
                subRegionSum = localDelta * _constants.NUMBER[tokens[0].lowerCaseValue] - localDelta;
                sum += subRegionSum;
                subRegionSum = 0;
                lastMagnitudeResult = sum;
              }
              return 'break';
            }
            tokens.reduce(function (acc, token, i) {
              if (token.type === _constants.TOKEN_TYPE.HUNDRED) {
                var _ret2 = function () {
                  var tokensToAdd = tokensCount - 1 ? tokens.slice(i + 1) : [];
                  tokensToAdd = tokensToAdd.filter(function (tokenToAdd, j) {
                    return j === 0 || tokensToAdd[j - 1].type > tokenToAdd.type;
                  });
                  var tokensToAddSum = tokensToAdd.reduce(function (acc2, tokenToAdd) {
                    return acc2 + _constants.NUMBER[tokenToAdd.lowerCaseValue];
                  }, 0);
                  return {
                    v: acc.concat((0, _extends3.default)({}, tokens[i + 1], {
                      numberValue: tokensToAddSum + _constants.NUMBER[token.lowerCaseValue] * 100
                    }))
                  };
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
              }
              if (i > 0 && tokens[i - 1].type === _constants.TOKEN_TYPE.HUNDRED) return acc;
              if (i > 1 && tokens[i - 1].type === _constants.TOKEN_TYPE.TEN && tokens[i - 2].type === _constants.TOKEN_TYPE.HUNDRED) return acc;
              /*if (token.type === TOKEN_TYPE.UNIT && sum > 0){
                let tempSum = sum;
                sum = 0;
                return acc.concat({ token, numberValue: NUMBER[token.lowerCaseValue] + tempSum });
              }*/
              return acc.concat({ token: token, numberValue: _constants.NUMBER[token.lowerCaseValue] });
            }, []).forEach(function (_ref, index, accArray) {
              var token = _ref.token;
              var numberValue = _ref.numberValue;

              if (index > 0 && accArray[index - 1].type !== _constants.TOKEN_TYPE.UNIT && token.type === _constants.TOKEN_TYPE.UNIT) {
                subRegionSum += numberValue;
              } else {
                subRegionSum *= numberValue;
              }
            });
            return 'break';
          }();

          if (_ret === 'break') break;
        }
      case _constants.TOKEN_TYPE.UNIT:
      case _constants.TOKEN_TYPE.TEN:
        {
          tokens.forEach(function (token) {
            subRegionSum += _constants.NUMBER[token.lowerCaseValue];
          });
          break;
        }
      // no default
    }
    sum += subRegionSum;
  });

  var currentDecimalPlace = 1;
  decimalUnits.forEach(function (_ref2) {
    var tokens = _ref2.tokens;

    tokens.forEach(function (_ref3) {
      var lowerCaseValue = _ref3.lowerCaseValue;

      sum += _constants.NUMBER[lowerCaseValue] / Math.pow(10, currentDecimalPlace);
      currentDecimalPlace += 1;
    });
  });

  return sum;
};

var replaceRegionsInText = function replaceRegionsInText(regions, text) {
  var replaced = text;
  var offset = 0;
  regions.forEach(function (region) {
    var length = region.end - region.start + 1;
    var replaceWith = '' + getNumber(region);
    replaced = (0, _util.splice)(replaced, region.start + offset, length, replaceWith);
    offset -= length - replaceWith.length;
  });
  return replaced;
};

exports.default = function (_ref4) {
  var regions = _ref4.regions;
  var text = _ref4.text;

  if (!regions) return text;
  if (regions[0].end - regions[0].start === text.length - 1) return getNumber(regions[0]);
  return replaceRegionsInText(regions, text);
};