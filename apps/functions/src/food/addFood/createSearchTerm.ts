import { FdcDump } from '@cutcal/core'

/**
 * "Segment" Definition = between commas
 *
 * 0) check cache
 * 1) split on comma and parenthases
 * 2) manual rules:
 * - apply segment replacements
 * - remove blacklist
 *
 * 3) if empty, use category image
 * last) update cache
 */

export const createSearchTerm = (food: FdcDump): string => {
  const namePieces = splitFdcName(food.description)
  const blacklistRemove = removeBlacklist(namePieces)
  const replacementsApplied = applyReplacements(blacklistRemove)
  const orsRemoved = removeAfter(replacementsApplied)
  return orsRemoved.join(', ')
}

const IMAGE_BLACKLIST_CONTAINS = [
  'NS as',
  'from ',
  'made with ',
  'prepared with ',
  '%',
  'fat',
  'NFS',
  'sodium',
  'calorie',
  'iron',
  'calcium',
  'fiber',
  'sweetene',
  'not ',
  'fortified',
  'ready-to-serve',
  'ready to',
  'reconstituted',
  'flavors other than',
  'vitamin',
  'added',
  'raw',
  'mature',
  'cooked',
  'solids',
  'liquids',
  'liquids'
]

export const removeBlacklist = (pieces: string[]): string[] =>
  pieces.filter(
    (piece) => !IMAGE_BLACKLIST_CONTAINS.some((bl) => piece.includes(bl))
  )

export const applyReplacements = (pieces: string[]): string[] =>
  pieces.map((piece) =>
    piece
      .replace('Babyfood', 'baby food')
      .replace('cooked or canned', 'canned')
      .replace('baked or broiled', 'broiled')
      .replace('and/or', 'and')
  )

export const removeAfter = (pieces: string[]): string[] =>
  pieces.map(
    (piece) =>
      piece.split(new RegExp(/ or | excludes | excluding | no |^no /))[0]
  )

export const splitFdcName = (incoming: string): string[] => {
  incoming = incoming.replace(';', ',')
  const parentheses = incoming.match(/\([^)]*\)|\[[^\]]*\]/g)
  const noParentheses = incoming.replace(/\([^)]*\)|\[[^\]]*\]/g, '')
  const commaSegments = noParentheses.split(',')
  const parenthesesRemoved = (parentheses || [])
    .map((match) => match.replace('(', ''))
    .map((match) => match.replace(')', ''))
  return [...commaSegments, ...parenthesesRemoved].map((str) => str.trim())
}
