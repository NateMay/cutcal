
 /**
  * Gets all of the image references by size for a single image
  * @param {string} url one image url
  */

export function allImagesFromPrimary(url: string): string[] {
  if (url.includes('meal.png')) return [];
  return [ url,
    url.insertText('thumb_', 'after', 'meals%2F')
    // add others
  ]
}
