 
import {
  PUNCTUATION,
  NUMBER_WORDS,
  UNIT_KEYS,
  TEN_KEYS,
  MAGNITUDE_KEYS,
  TOKEN_TYPE,
  JOINERS,
  DECIMALS,
  BLACKLIST_SINGULAR_WORDS,
  NUMBER,
} from './constants';
import fuzzyMatch from './fuzzy';

const SKIP = 0;
const ADD = 1;
const START_NEW_REGION = 2;
const NOPE = 3;

// SubRegion tokens are collected right-to-left with push (see getSubRegions),
// so the most recently added (leftmost) token is the last one.
const lastToken = (subRegion, back = 0) => subRegion.tokens[subRegion.tokens.length - 1 - back];

const canAddTokenToEndOfSubRegion = (subRegion, currentToken, { impliedHundreds }) => {
  const prevToken = lastToken(subRegion);
  const prevprevToken = lastToken(subRegion, 1);
  if (!prevToken) return true;
  if (
    prevToken.type === TOKEN_TYPE.MAGNITUDE &&
    currentToken.type === TOKEN_TYPE.UNIT &&
    (NUMBER[prevToken.lowerCaseValue] < 1000 ||
      (prevprevToken && NUMBER[prevprevToken.lowerCaseValue] > NUMBER[prevToken.lowerCaseValue]))
  ) return true;
  if (
    prevToken.type === TOKEN_TYPE.MAGNITUDE &&
    currentToken.type === TOKEN_TYPE.TEN &&
    (NUMBER[prevToken.lowerCaseValue] < 1000 ||
      (prevprevToken && NUMBER[prevprevToken.lowerCaseValue] > NUMBER[prevToken.lowerCaseValue]))
  ) return true;
  if (
    impliedHundreds &&
    subRegion.type === TOKEN_TYPE.MAGNITUDE &&
    prevToken.type === TOKEN_TYPE.TEN &&
    currentToken.type === TOKEN_TYPE.UNIT
  ) return true;
  if (
    impliedHundreds &&
    subRegion.type === TOKEN_TYPE.MAGNITUDE &&
    prevToken.type === TOKEN_TYPE.UNIT &&
    currentToken.type === TOKEN_TYPE.TEN
  ) return true;
  if (
    prevToken.type === TOKEN_TYPE.TEN &&
    currentToken.type === TOKEN_TYPE.UNIT
  ) return true;
  if (
    !impliedHundreds &&
    prevToken.type === TOKEN_TYPE.TEN &&
    currentToken.type === TOKEN_TYPE.UNIT
  ) return true;
  // Two magnitudes combine only if the left is a smaller multiplier of the right
  // ("cent mille" = 100*1000); "cent vingt" (100+20) must stay additive.
  // currentToken is LEFT of prevToken (right-to-left scan).
  if (
    prevToken.type === TOKEN_TYPE.MAGNITUDE &&
    currentToken.type === TOKEN_TYPE.MAGNITUDE
  ) return NUMBER[currentToken.lowerCaseValue] < NUMBER[prevToken.lowerCaseValue];
  if (
    !impliedHundreds &&
    prevToken.type === TOKEN_TYPE.TEN &&
    currentToken.type === TOKEN_TYPE.TEN
  ) return false;
  if (
    impliedHundreds &&
    prevToken.type === TOKEN_TYPE.TEN &&
    currentToken.type === TOKEN_TYPE.TEN
  ) return true;
  return false;
};

const getSubRegionType = (subRegion, currentToken) => {
  if (!subRegion) {
    return { type: currentToken.type };
  }
  const prevToken = lastToken(subRegion);
  const isHundred = (
    (prevToken.type === TOKEN_TYPE.TEN && currentToken.type === TOKEN_TYPE.UNIT) ||
    (prevToken.type === TOKEN_TYPE.TEN && currentToken.type === TOKEN_TYPE.TEN) ||
    (
      prevToken.type === TOKEN_TYPE.UNIT && currentToken.type === TOKEN_TYPE.TEN &&
      NUMBER[prevToken.lowerCaseValue] > 9
    ) ||
    (prevToken.type === TOKEN_TYPE.UNIT && currentToken.type === TOKEN_TYPE.UNIT) ||
    (prevToken.type === TOKEN_TYPE.TEN && currentToken.type === TOKEN_TYPE.UNIT && subRegion.type === TOKEN_TYPE.MAGNITUDE)
  );
  if (subRegion.type === TOKEN_TYPE.MAGNITUDE) return { type: TOKEN_TYPE.MAGNITUDE, isHundred };
  if (isHundred) return { type: TOKEN_TYPE.HUNDRED, isHundred };
  return { type: currentToken.type, isHundred };
};

const checkIfTokenFitsSubRegion = (subRegion, token, options) => {
  const { type, isHundred } = getSubRegionType(subRegion, token);
  if (!subRegion) return { action: START_NEW_REGION, type, isHundred };
  if (canAddTokenToEndOfSubRegion(subRegion, token, options)) {
    return { action: ADD, type, isHundred };
  }
  return { action: START_NEW_REGION, type, isHundred };
};

const getSubRegions = (region, options) => {
  const subRegions = [];
  let currentSubRegion;
  const tokensCount = region.tokens.length;
  const decimalIndex = region.tokens.findIndex((token) => token.type === TOKEN_TYPE.DECIMAL);
  let i = tokensCount - 1;
  while (i >= 0) {
    const token = region.tokens[i];
    // A decimal marker is its own subRegion and a barrier: magnitude/HUNDRED
    // type promotion must not leak left across it (it would mistype the marker).
    if (token.type === TOKEN_TYPE.DECIMAL) {
      currentSubRegion = { tokens: [token], type: TOKEN_TYPE.DECIMAL };
      subRegions.push(currentSubRegion);
      currentSubRegion = undefined;
      i--;
      continue;
    }
    // In a decimal part, zero never combines with its neighbours ("zéro vingt"
    // is not 0 × 20): it stands alone, so the compiler can keep leading zeros.
    if (decimalIndex !== -1 && i > decimalIndex && NUMBER[token.lowerCaseValue] === 0) {
      subRegions.push({ tokens: [token], type: token.type });
      currentSubRegion = undefined;
      i--;
      continue;
    }
    const { action, type, isHundred } = checkIfTokenFitsSubRegion(currentSubRegion, token, options);
    token.type = isHundred ? TOKEN_TYPE.HUNDRED : token.type;
    switch (action) {
      case ADD: {
        currentSubRegion.type = type;
        currentSubRegion.tokens.push(token);
        break;
      }
      case START_NEW_REGION: {
        currentSubRegion = {
          tokens: [token],
          type,
        };
        subRegions.push(currentSubRegion);
        break;
      }
      // no default
    }
    i--;
  }
  // Built right-to-left with push (unshift is O(n) per call): restore reading
  // order once at the end.
  subRegions.forEach((subRegion) => subRegion.tokens.reverse());
  return subRegions.reverse();
};

const canAddTokenToEndOfRegion = (region, currentToken, { impliedHundreds }) => {
  const { tokens } = region;
  const prevToken = tokens[tokens.length - 1];
  // Leading zeros of a decimal part may precede any number word
  // ("zéro virgule zéro cinquante" = 0.050).
  if (region.hasDecimal && NUMBER[prevToken.lowerCaseValue] === 0) return true;
  if (
    !impliedHundreds &&
    prevToken.type === TOKEN_TYPE.UNIT &&
    currentToken.type === TOKEN_TYPE.UNIT &&
    !region.hasDecimal
  ) return false;
  if (!impliedHundreds && prevToken.type === TOKEN_TYPE.UNIT && currentToken.type === TOKEN_TYPE.TEN) return false;
  if (!impliedHundreds && prevToken.type === TOKEN_TYPE.TEN && currentToken.type === TOKEN_TYPE.TEN) return false;
  return true;
};

const checkIfTokenFitsRegion = (region, token, options) => {
  const isDecimal = DECIMALS.includes(token.lowerCaseValue);
  if ((!region || !region.tokens.length) && isDecimal) {
    return START_NEW_REGION;
  }
  const isPunctuation = PUNCTUATION.includes(token.lowerCaseValue);
  if (isPunctuation) return SKIP;
  const isJoiner = JOINERS.includes(token.lowerCaseValue);
  if (isJoiner) return SKIP;
  if (isDecimal && !region.hasDecimal) {
    return ADD;
  }
  const isNumberWord = NUMBER_WORDS.includes(token.lowerCaseValue);
  if (isNumberWord) {
    if (!region) return START_NEW_REGION;
    if (canAddTokenToEndOfRegion(region, token, options)) {
      return ADD;
    }
    return START_NEW_REGION;
  }
  return NOPE;
};

const checkBlacklist = tokens =>
  tokens.length === 1 &&
  BLACKLIST_SINGULAR_WORDS.includes(tokens[0].lowerCaseValue);

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
      case SKIP: {
        break;
      }
      case ADD: {
        if (currentRegion) {
          currentRegion.end = token.end;
          currentRegion.tokens.push(token);
          if (token.type === TOKEN_TYPE.DECIMAL) {
            currentRegion.hasDecimal = true;
          }
        }
        break;
      }
      case START_NEW_REGION: {
        currentRegion = {
          start: token.start,
          end: token.end,
          tokens: [token],
        };
        regions.push(currentRegion);
        if (token.type === TOKEN_TYPE.DECIMAL) {
          currentRegion.hasDecimal = true;
        }
        break;
      }
      case NOPE:
      default: {
        currentRegion = null;
        break;
      }
    }
    i++;
  }

  return regions.map(region => ({ ...region, subRegions: getSubRegions(region, options) }));
};

const getTokenType = (chunk) => {
  if (UNIT_KEYS.includes(chunk.toLowerCase())) return TOKEN_TYPE.UNIT;
  if (TEN_KEYS.includes(chunk.toLowerCase())) return TOKEN_TYPE.TEN;
  if (MAGNITUDE_KEYS.includes(chunk.toLowerCase())) return TOKEN_TYPE.MAGNITUDE;
  if (DECIMALS.includes(chunk.toLowerCase())) return TOKEN_TYPE.DECIMAL;
};

export default (text, options) => {
  const tokens = text
    // \w is ASCII-only and would split accented words; allow Latin accents + ñ
    // so they stay a single token.
    .split(/([\wàâäáãåéèêëíìîïóòôöõøúùûüýÿœæçñ]+|\s|[[:punct:]])/i)
    // push (not concat): concat copies the accumulator on every chunk, which
    // made tokenizing quadratic in the text length.
    .reduce((acc, chunk) => {
      const unfuzzyChunk = chunk.length && options.fuzzy && !PUNCTUATION.includes(chunk) ?
        fuzzyMatch(chunk) :
        chunk;
      const start = acc.length ? acc[acc.length - 1].end + 1 : 0;
      const end = start + chunk.length;
      if (end !== start) {
        acc.push({
          start,
          end: end - 1,
          value: unfuzzyChunk,
          lowerCaseValue: unfuzzyChunk.toLowerCase(),
          type: getTokenType(unfuzzyChunk, options),
        });
      }
      return acc;
    }, []);
  const regions = matchRegions(tokens, options);
  return regions;
};

