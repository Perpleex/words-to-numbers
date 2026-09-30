# Words To Numbers

Convert words to numbers. Optionally fuzzy match the words to numbers.

```
npm install words-to-numbers
```

If the whole string passed is a number then it will return a `Number` type otherwise it will return the original string with all instances of numbers replaced.

TODO: Add functionality for parsing mixed numbers and words. PRs welcome.

## Basic Examples

```javascript
import wordsToNumbers from 'words-to-numbers';
wordsToNumbers('one hundred'); //100
wordsToNumbers('one hundred and five'); //105
wordsToNumbers('one hundred and twenty five'); //125
wordsToNumbers('four thousand and thirty'); //4030
wordsToNumbers('six million five thousand and two'); //6005002
wordsToNumbers('a thousand one hundred and eleven'); //1111
wordsToNumbers('twenty thousand five hundred and sixty nine'); //20569
wordsToNumbers('five quintillion'); //5000000000000000000
wordsToNumbers('one-hundred'); //100
wordsToNumbers('one-hundred and five'); //105
wordsToNumbers('one-hundred and twenty-five'); //125
wordsToNumbers('four-thousand and thirty'); //4030
wordsToNumbers('six-million five-thousand and two'); //6005002
wordsToNumbers('a thousand, one-hundred and eleven'); //1111
wordsToNumbers('twenty-thousand, five-hundred and sixty-nine'); //20569
```

## Multiple numbers in a string

Returns a string with all instances replaced.

```javascript
wordsToNumbers('there were twenty-thousand, five-hundred and sixty-nine X in the five quintillion Y')) // 'there were 20569 X in the 5000000000000000000 Y'
```

## With Fuzzy Matching

Uses [Jaro distance](http://yomguithereal.github.io/clj-fuzzy/javascript.html#jaro) to find the best match for the number words. Don't rely on this being completely accurate...

```javascript
import wordsToNumbers from 'words-to-numbers';
wordsToNumbers('won huntred', {fuzzy: true}); //100
wordsToNumbers('too thousant and fiev', {fuzzy: true}); //2005
wordsToNumbers('tree millyon sefen hunderd and twinty sex', {fuzzy: true}); //3000726
```

## Decimal Points

```javascript
import wordsToNumbers from 'words-to-numbers';
wordsToNumbers('ten point five'); //10.5
wordsToNumbers('three point one four one five nine two six'); //3.1415926
```

### Decimal places

An integer numerator stays a fraction; a decimal numerator (with a decimal
marker, even "point zero") becomes a decimal number.

```javascript
wordsToNumbers('deux centièmes'); //'2/100'
wordsToNumbers('deux virgule cinq centièmes'); //0.025
wordsToNumbers('deux virgule zéro centièmes'); //0.02
wordsToNumbers('two point five hundredths', {locale: 'en'}); //0.025
wordsToNumbers('dos coma cinco centésimos', {locale: 'es'}); //0.025
```

Places up to 10^-9 are supported: dix-millième, cent-millième, millionième…
milliardième (fr), ten-thousandths… billionths (en, plural only),
diezmilésimo… milmillonésimo (es). Compound French and English places are
hyphenated (`dix-millièmes`, `ten-thousandths`).

### Scientific notation

```javascript
wordsToNumbers('deux virgule cinq fois dix puissance moins deux'); //0.025
wordsToNumbers('dix puissance moins trois'); //0.001
wordsToNumbers('six virgule zéro deux fois dix puissance vingt trois'); //6.02e+23
wordsToNumbers('three times ten to the minus three', {locale: 'en'}); //0.003
wordsToNumbers('tres por diez elevado a menos tres', {locale: 'es'}); //0.003
```

## Ordinal Numbers

```javascript
import wordsToNumbers from 'words-to-numbers';
wordsToNumbers('first'); //1
wordsToNumbers('second'); //2
wordsToNumbers('third'); //3
wordsToNumbers('fourteenth'); //14
wordsToNumbers('twenty fifth'); //25
wordsToNumbers('thirty fourth'); //34
wordsToNumbers('forty seventh'); //47
wordsToNumbers('fifty third'); //53
wordsToNumbers('sixtieth'); //60
wordsToNumbers('seventy second'); //72
wordsToNumbers('eighty ninth'); //89
wordsToNumbers('ninety sixth'); //96
wordsToNumbers('one hundred and eighth'); //108
wordsToNumbers('one hundred and tenth'); //110
wordsToNumbers('one hundred and ninety ninth'); //199
```

## Commonjs

```javascript
const { wordsToNumbers } = require('words-to-numbers');
wordsToNumbers('one hundred'); //100;
```

## Implied Hundreds

```javascript
wordsToNumbers('nineteen eighty four', { impliedHundreds: true }); //1984
wordsToNumbers('one thirty', { impliedHundreds: true }); //130
wordsToNumbers('six sixty two', { impliedHundreds: true }); //662
wordsToNumbers('ten twelve', { impliedHundreds: true }); //1012
wordsToNumbers('nineteen ten', { impliedHundreds: true }); //1910
wordsToNumbers('twenty ten', { impliedHundreds: true }); //2010
wordsToNumbers('twenty seventeen', { impliedHundreds: true }); //2017
wordsToNumbers('twenty twenty', { impliedHundreds: true }); //2020
wordsToNumbers('twenty twenty one', { impliedHundreds: true }); //2021
wordsToNumbers('fifty sixty three', { impliedHundreds: true }); //5063
wordsToNumbers('fifty sixty', { impliedHundreds: true }); //5060
wordsToNumbers('fifty sixty three thousand', { impliedHundreds: true }); //5063000
wordsToNumbers('one hundred thousand', { impliedHundreds: true }); //100000
```