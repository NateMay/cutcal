/**
 * Gets the string suffix for a number
 * @param {number} integer
 * @example
 *   ordinalSuffixOf(12); => 'th'
 *   ordinalSuffixOf(22); => 'nd'
 */
export function ordinalSuffixOf(integer: number): string {
  const j = integer % 10
  const k = integer % 100

  if (j == 1 && k != 11) return `${integer}st`
  else if (j == 2 && k != 12) return `${integer}nd`
  else if (j == 3 && k != 13) return `${integer}rd`
  else return `${integer}th`
}
