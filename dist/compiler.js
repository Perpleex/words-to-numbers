"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _util = require("./util");
var _constants = require("./constants");
const sumSubRegions = subRegions => {
  let sum = 0;
  let lastMagnitudeResult;
  subRegions.forEach(subRegion => {
    const {
      tokens,
      type
    } = subRegion;
    let subRegionSum = 0;
    switch (type) {
      case _constants.TOKEN_TYPE.MAGNITUDE:
      case _constants.TOKEN_TYPE.HUNDRED:
        {
          subRegionSum = 1;
          const tokensCount = tokens.length;
          if (tokensCount === 1 && tokens[0].type === _constants.TOKEN_TYPE.MAGNITUDE && sum !== 0 && _constants.NUMBER[tokens[0].lowerCaseValue] > 999) {
            if (!lastMagnitudeResult || lastMagnitudeResult < _constants.NUMBER[tokens[0].lowerCaseValue]) {
              sum *= _constants.NUMBER[tokens[0].lowerCaseValue];
              subRegionSum = 0;
              lastMagnitudeResult = sum;
            } else {
              const localDelta = sum - lastMagnitudeResult;
              subRegionSum = localDelta * _constants.NUMBER[tokens[0].lowerCaseValue] - localDelta;
              sum += subRegionSum;
              subRegionSum = 0;
              lastMagnitudeResult = sum;
            }
            break;
          }
          tokens.reduce((acc, token, i) => {
            if (token.type === _constants.TOKEN_TYPE.HUNDRED) {
              let tokensToAdd = tokensCount - 1 ? tokens.slice(i + 1) : [];
              tokensToAdd = tokensToAdd.filter((tokenToAdd, j) => j === 0 || tokensToAdd[j - 1].type > tokenToAdd.type);
              const tokensToAddSum = tokensToAdd.reduce((acc2, tokenToAdd) => acc2 + _constants.NUMBER[tokenToAdd.lowerCaseValue], 0);
              return acc.concat({
                ...tokens[i + 1],
                numberValue: tokensToAddSum + _constants.NUMBER[token.lowerCaseValue] * 100
              });
            }
            if (i > 0 && tokens[i - 1].type === _constants.TOKEN_TYPE.HUNDRED) return acc;
            if (i > 1 && tokens[i - 1].type === _constants.TOKEN_TYPE.TEN && tokens[i - 2].type === _constants.TOKEN_TYPE.HUNDRED) return acc;
            return acc.concat({
              token,
              numberValue: _constants.NUMBER[token.lowerCaseValue]
            });
          }, []).forEach(({
            token,
            numberValue
          }, index, accArray) => {
            if (index > 0 && accArray[index - 1].type !== _constants.TOKEN_TYPE.UNIT && token.type === _constants.TOKEN_TYPE.UNIT) {
              subRegionSum += numberValue;
            } else {
              subRegionSum *= numberValue;
            }
          });
          break;
        }
      case _constants.TOKEN_TYPE.UNIT:
      case _constants.TOKEN_TYPE.TEN:
        {
          tokens.forEach(token => {
            subRegionSum += _constants.NUMBER[token.lowerCaseValue];
          });
          break;
        }
    }
    sum += subRegionSum;
  });
  return sum;
};
const getNumber = region => {
  const intSubRegions = [];
  const decimalSubRegions = [];
  let decimalReached = false;
  region.subRegions.forEach(subRegion => {
    if (subRegion.type === _constants.TOKEN_TYPE.DECIMAL) {
      decimalReached = true;
      return;
    }
    if (decimalReached) {
      decimalSubRegions.push(subRegion);
    } else {
      intSubRegions.push(subRegion);
    }
  });
  let sum = sumSubRegions(intSubRegions);
  if (decimalSubRegions.length) {
    const decimalTokens = decimalSubRegions.reduce((acc, subRegion) => acc.concat(subRegion.tokens), []);
    const digitByDigit = decimalTokens.every(token => {
      const value = _constants.NUMBER[token.lowerCaseValue];
      return value !== undefined && value < 10;
    });
    if (digitByDigit) {
      let currentDecimalPlace = 1;
      decimalTokens.forEach(({
        lowerCaseValue
      }) => {
        sum += _constants.NUMBER[lowerCaseValue] / Math.pow(10, currentDecimalPlace);
        currentDecimalPlace += 1;
      });
    } else {
      const fractional = sumSubRegions(decimalSubRegions);
      const digits = `${Math.round(Math.abs(fractional))}`.length;
      sum += fractional / Math.pow(10, digits);
    }
  }
  return sum;
};
const replaceRegionsInText = (regions, text) => {
  let replaced = text;
  let offset = 0;
  regions.forEach(region => {
    const length = region.end - region.start + 1;
    const replaceWith = `${getNumber(region)}`;
    replaced = (0, _util.splice)(replaced, region.start + offset, length, replaceWith);
    offset -= length - replaceWith.length;
  });
  return replaced;
};
var _default = ({
  regions,
  text
}) => {
  if (!regions) return text;
  if (regions[0].end - regions[0].start === text.length - 1) return getNumber(regions[0]);
  return replaceRegionsInText(regions, text);
};
exports.default = _default;