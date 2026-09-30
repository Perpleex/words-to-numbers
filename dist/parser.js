"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("./constants");
var _fuzzy = _interopRequireDefault(require("./fuzzy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LETTER = /[a-zàâäáãåéèêëíìîïóòôöõøúùûüýÿœæçñ]/i;
const SKIP = 0;
const ADD = 1;
const START_NEW_REGION = 2;
const NOPE = 3;
const lastToken = (subRegion, back = 0) => subRegion.tokens[subRegion.tokens.length - 1 - back];
const canAddTokenToEndOfSubRegion = (subRegion, currentToken, {
  impliedHundreds
}) => {
  const prevToken = lastToken(subRegion);
  const prevprevToken = lastToken(subRegion, 1);
  if (!prevToken) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.MAGNITUDE && currentToken.type === _constants.TOKEN_TYPE.UNIT && (_constants.NUMBER[prevToken.lowerCaseValue] < 1000 || prevprevToken && _constants.NUMBER[prevprevToken.lowerCaseValue] > _constants.NUMBER[prevToken.lowerCaseValue])) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.MAGNITUDE && currentToken.type === _constants.TOKEN_TYPE.TEN && (_constants.NUMBER[prevToken.lowerCaseValue] < 1000 || prevprevToken && _constants.NUMBER[prevprevToken.lowerCaseValue] > _constants.NUMBER[prevToken.lowerCaseValue])) return true;
  if (impliedHundreds && subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT) return true;
  if (impliedHundreds && subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE && prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.TEN) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT) return true;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT) return true;
  if (prevToken.type === _constants.TOKEN_TYPE.MAGNITUDE && currentToken.type === _constants.TOKEN_TYPE.MAGNITUDE) return _constants.NUMBER[currentToken.lowerCaseValue] < _constants.NUMBER[prevToken.lowerCaseValue];
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN) return false;
  if (impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN) return true;
  return false;
};
const getSubRegionType = (subRegion, currentToken) => {
  if (!subRegion) {
    return {
      type: currentToken.type
    };
  }
  const prevToken = lastToken(subRegion);
  const isHundred = prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT || prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN || prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.TEN && _constants.NUMBER[prevToken.lowerCaseValue] > 9 || prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.UNIT || prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.UNIT && subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE;
  if (subRegion.type === _constants.TOKEN_TYPE.MAGNITUDE) return {
    type: _constants.TOKEN_TYPE.MAGNITUDE,
    isHundred
  };
  if (isHundred) return {
    type: _constants.TOKEN_TYPE.HUNDRED,
    isHundred
  };
  return {
    type: currentToken.type,
    isHundred
  };
};
const checkIfTokenFitsSubRegion = (subRegion, token, options) => {
  const {
    type,
    isHundred
  } = getSubRegionType(subRegion, token);
  if (!subRegion) return {
    action: START_NEW_REGION,
    type,
    isHundred
  };
  if (canAddTokenToEndOfSubRegion(subRegion, token, options)) {
    return {
      action: ADD,
      type,
      isHundred
    };
  }
  return {
    action: START_NEW_REGION,
    type,
    isHundred
  };
};
const getSubRegions = (region, options) => {
  const subRegions = [];
  let currentSubRegion;
  const tokensCount = region.tokens.length;
  const decimalIndex = region.tokens.findIndex(token => token.type === _constants.TOKEN_TYPE.DECIMAL);
  let i = tokensCount - 1;
  while (i >= 0) {
    const token = region.tokens[i];
    if (token.type === _constants.TOKEN_TYPE.DECIMAL) {
      currentSubRegion = {
        tokens: [token],
        type: _constants.TOKEN_TYPE.DECIMAL
      };
      subRegions.push(currentSubRegion);
      currentSubRegion = undefined;
      i--;
      continue;
    }
    if (decimalIndex !== -1 && i > decimalIndex && _constants.NUMBER[token.lowerCaseValue] === 0) {
      subRegions.push({
        tokens: [token],
        type: token.type
      });
      currentSubRegion = undefined;
      i--;
      continue;
    }
    const {
      action,
      type,
      isHundred
    } = checkIfTokenFitsSubRegion(currentSubRegion, token, options);
    token.type = isHundred ? _constants.TOKEN_TYPE.HUNDRED : token.type;
    switch (action) {
      case ADD:
        {
          currentSubRegion.type = type;
          currentSubRegion.tokens.push(token);
          break;
        }
      case START_NEW_REGION:
        {
          currentSubRegion = {
            tokens: [token],
            type
          };
          subRegions.push(currentSubRegion);
          break;
        }
    }
    i--;
  }
  subRegions.forEach(subRegion => subRegion.tokens.reverse());
  return subRegions.reverse();
};
const canAddTokenToEndOfRegion = (region, currentToken, {
  impliedHundreds
}) => {
  const {
    tokens
  } = region;
  const prevToken = tokens[tokens.length - 1];
  if (region.hasDecimal && _constants.NUMBER[prevToken.lowerCaseValue] === 0) return true;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.UNIT && !region.hasDecimal) return false;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.UNIT && currentToken.type === _constants.TOKEN_TYPE.TEN) return false;
  if (!impliedHundreds && prevToken.type === _constants.TOKEN_TYPE.TEN && currentToken.type === _constants.TOKEN_TYPE.TEN) return false;
  return true;
};
const checkIfTokenFitsRegion = (region, token, options) => {
  const isDecimal = _constants.DECIMALS.includes(token.lowerCaseValue);
  if ((!region || !region.tokens.length) && isDecimal) {
    return START_NEW_REGION;
  }
  const isPunctuation = _constants.PUNCTUATION.includes(token.lowerCaseValue);
  if (isPunctuation) return SKIP;
  const isJoiner = _constants.JOINERS.includes(token.lowerCaseValue);
  if (isJoiner) return SKIP;
  if (isDecimal && !region.hasDecimal) {
    return ADD;
  }
  const isNumberWord = _constants.NUMBER_WORDS.includes(token.lowerCaseValue);
  if (isNumberWord) {
    if (!region) return START_NEW_REGION;
    if (canAddTokenToEndOfRegion(region, token, options)) {
      return ADD;
    }
    return START_NEW_REGION;
  }
  return NOPE;
};
const checkBlacklist = tokens => tokens.length === 1 && _constants.BLACKLIST_SINGULAR_WORDS.includes(tokens[0].lowerCaseValue);
const matchRegions = (tokens, options) => {
  const regions = [];
  if (checkBlacklist(tokens)) return regions;
  let i = 0;
  let currentRegion;
  const tokensCount = tokens.length;
  while (i < tokensCount) {
    const token = tokens[i];
    const tokenFits = checkIfTokenFitsRegion(currentRegion, token, options);
    switch (tokenFits) {
      case SKIP:
        {
          break;
        }
      case ADD:
        {
          if (currentRegion) {
            currentRegion.end = token.end;
            currentRegion.tokens.push(token);
            if (token.type === _constants.TOKEN_TYPE.DECIMAL) {
              currentRegion.hasDecimal = true;
            }
          }
          break;
        }
      case START_NEW_REGION:
        {
          currentRegion = {
            start: token.start,
            end: token.end,
            tokens: [token]
          };
          regions.push(currentRegion);
          if (token.type === _constants.TOKEN_TYPE.DECIMAL) {
            currentRegion.hasDecimal = true;
          }
          break;
        }
      case NOPE:
      default:
        {
          currentRegion = null;
          break;
        }
    }
    i++;
  }
  return regions.map(region => ({
    ...region,
    subRegions: getSubRegions(region, options)
  }));
};
const getTokenType = chunk => {
  if (_constants.UNIT_KEYS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.UNIT;
  if (_constants.TEN_KEYS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.TEN;
  if (_constants.MAGNITUDE_KEYS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.MAGNITUDE;
  if (_constants.DECIMALS.includes(chunk.toLowerCase())) return _constants.TOKEN_TYPE.DECIMAL;
};
var _default = (text, options) => {
  const tokens = text.split(/([\wàâäáãåéèêëíìîïóòôöõøúùûüýÿœæçñ]+|\s|[[:punct:]])/i).reduce((acc, chunk) => {
    const unfuzzyChunk = chunk.length && options.fuzzy && !_constants.PUNCTUATION.includes(chunk) && LETTER.test(chunk) ? (0, _fuzzy.default)(chunk) : chunk;
    const start = acc.length ? acc[acc.length - 1].end + 1 : 0;
    const end = start + chunk.length;
    if (end !== start) {
      acc.push({
        start,
        end: end - 1,
        value: unfuzzyChunk,
        lowerCaseValue: unfuzzyChunk.toLowerCase(),
        type: getTokenType(unfuzzyChunk, options)
      });
    }
    return acc;
  }, []);
  const regions = matchRegions(tokens, options);
  return regions;
};
exports.default = _default;