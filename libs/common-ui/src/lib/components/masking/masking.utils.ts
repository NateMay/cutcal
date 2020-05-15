export type CharChecker = (char: string) => boolean

const single = (char: string) => char.length == 1
const lowerCaseChecker = (char: string) => single(char) && /[a-z]{1}/.test(char)
const upperCaseChecker = (char: string) => single(char) && /[A-Z]{1}/.test(char)
const anyChecker = (char: string) => true
export const numericChecker = (char: string) => /[0-9]{1}/.test(char)
export const alphaNumericChecker = (char: string) =>
  single(char) && /^[a-z0-9]{1}/i.test(char)
export const nonZeroNumericChecker = (char: string) =>
  single(char) && /[1-9]{1}/.test(char)

export const lteChecker = (maxValue: number) => (char: string) =>
  numericChecker(char) && parseInt(char, 10) <= maxValue
export const neverChecker = (char: string) => false

export interface CharCheckerMap {
  [key: string]: CharChecker
}

export const MASK_CHECKERS: CharCheckerMap = {
  a: lowerCaseChecker,
  A: upperCaseChecker,
  9: numericChecker,
  8: lteChecker(8),
  7: lteChecker(7),
  6: lteChecker(6),
  5: lteChecker(5),
  4: lteChecker(4),
  3: lteChecker(3),
  2: lteChecker(2),
  1: lteChecker(1),
  0: (char: string) => char === '0',
  '#': anyChecker,
  '&': alphaNumericChecker,
  '^': nonZeroNumericChecker
}

export const MASK_SPECIALS = [' ', '/', '(', ')', '+', '/', '-']

export const HIDER = '•'

export interface Digit {
  index: number
  value: string
  writable: boolean
  hidden: boolean
  checker: CharChecker
}

export const isWritable = (digit: Digit): boolean => digit.writable

export const createMaskDigit = (
  index: number,
  value: string,
  writable: boolean,
  hidden: boolean,
  checker: CharChecker
): Digit => ({ index, value, writable, hidden, checker })

export const replaceAt = (
  original: string,
  newCharacters: string,
  index: number
): string =>
  `${original.substr(0, index)}${newCharacters}${original.substr(
    index + 1,
    original.length
  )}`

export const insertAt = (
  original: string,
  newCharacters: string,
  index: number
): string =>
  index > 0
    ? original.substring(0, index) +
      newCharacters +
      original.substring(index, original.length)
    : newCharacters + original
