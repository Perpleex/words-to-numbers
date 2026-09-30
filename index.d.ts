export interface WordsToNumbersOptions {
  fuzzy?: boolean;
  impliedHundreds?: boolean;
  locale?: 'fr' | 'en' | 'es';
  fractions?: boolean | 'force';
  notation?: 'auto' | 'full' | 'school';
}
export declare function wordsToNumbers(text: string, options?: WordsToNumbersOptions): string | number | null;
export default wordsToNumbers;
