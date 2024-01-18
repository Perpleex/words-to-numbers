import { splice } from './util';
import { TOKEN_TYPE, NUMBER } from './constants';

const getNumber = region => {
  let sum = 0;
  let lastMagnitudeResult;
  let decimalReached = false;
  let decimalUnits = [];
  region.subRegions.forEach((subRegion) => {
    const { tokens, type } = subRegion;
    let subRegionSum = 0;
    if (type === TOKEN_TYPE.DECIMAL) {
      decimalReached = true;
      return;
    }
    if (decimalReached) {
      decimalUnits.push(subRegion);
      return;
    }
    switch (type) {
      case TOKEN_TYPE.MAGNITUDE:
      case TOKEN_TYPE.HUNDRED: {
        subRegionSum = 1;
        const tokensCount = tokens.length;
       if ( tokensCount === 1 && tokens[0].type === TOKEN_TYPE.MAGNITUDE && sum !== 0 && NUMBER[tokens[0].lowerCaseValue] > 999) {
          if (!lastMagnitudeResult){
            sum *= NUMBER[tokens[0].lowerCaseValue];
            subRegionSum = 0;
            lastMagnitudeResult = sum;
          }
          else {
            const localDelta = sum - lastMagnitudeResult;
            subRegionSum = (localDelta) * NUMBER[tokens[0].lowerCaseValue] - localDelta;
            sum += subRegionSum;
            subRegionSum = 0;
            lastMagnitudeResult = sum;
          }
          break;
        }
        tokens.reduce((acc, token, i) => {
          if (token.type === TOKEN_TYPE.HUNDRED) {
            let tokensToAdd = tokensCount - 1 ? tokens.slice(i + 1) : [];
            tokensToAdd = tokensToAdd.filter((tokenToAdd, j) =>
              j === 0 || tokensToAdd[j - 1].type > tokenToAdd.type
            );
            const tokensToAddSum = tokensToAdd.reduce((acc2, tokenToAdd) =>
                acc2 + NUMBER[tokenToAdd.lowerCaseValue]
            , 0);
            return acc.concat({
              ...tokens[i + 1],
              numberValue: tokensToAddSum + (NUMBER[token.lowerCaseValue] * 100),
            });
          }
          if (i > 0 && tokens[i - 1].type === TOKEN_TYPE.HUNDRED) return acc;
          if (
            i > 1 &&
            tokens[i - 1].type === TOKEN_TYPE.TEN &&
            tokens[i - 2].type === TOKEN_TYPE.HUNDRED
          ) return acc;
          /*if (token.type === TOKEN_TYPE.UNIT && sum > 0){
            let tempSum = sum;
            sum = 0;
            return acc.concat({ token, numberValue: NUMBER[token.lowerCaseValue] + tempSum });
          }*/
          return acc.concat({ token, numberValue: NUMBER[token.lowerCaseValue] });
        }, []).forEach(({ token, numberValue }, index, accArray) => {
          if (index > 0 && accArray[index - 1].type !== TOKEN_TYPE.UNIT && token.type === TOKEN_TYPE.UNIT){
            subRegionSum += numberValue;
          }
          else {
            subRegionSum *= numberValue;
          }
        });
        break;
      }
      case TOKEN_TYPE.UNIT:
      case TOKEN_TYPE.TEN: {
        tokens.forEach(token => {
          subRegionSum += NUMBER[token.lowerCaseValue];
        });
        break;
      }
      // no default
    }
    sum += subRegionSum;
  });

  let currentDecimalPlace = 1;
  decimalUnits.forEach(({ tokens }) => {
    tokens.forEach(({ lowerCaseValue }) => {
      sum += NUMBER[lowerCaseValue] / Math.pow(10, currentDecimalPlace);
      currentDecimalPlace += 1;
    });
  });

  return sum;
};

const replaceRegionsInText = (regions, text) => {
  let replaced = text;
  let offset = 0;
  regions.forEach(region => {
    const length = region.end - region.start + 1;
    const replaceWith = `${getNumber(region)}`;
    replaced = splice(replaced, region.start + offset, length, replaceWith);
    offset -= length - replaceWith.length;
  });
  return replaced;
};

export default ({ regions, text }) => {
  if (!regions) return text;
  if (regions[0].end - regions[0].start === text.length - 1) return getNumber(regions[0]);
  return replaceRegionsInText(regions, text);
};
