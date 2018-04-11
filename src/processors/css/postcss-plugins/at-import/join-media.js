/**
 * This module is modified from https://github.com/postcss/postcss-import
 * The original module is written for node.js environment.
 * Here we remove the support for node.js environment and add support for
 * loading resources from our loader.
 */

module.exports = function (parentMedia, childMedia) {
  if (!parentMedia.length && childMedia.length) return childMedia
  if (parentMedia.length && !childMedia.length) return parentMedia
  if (!parentMedia.length && !childMedia.length) return []

  const media = []

  parentMedia.forEach(parentItem => {
    childMedia.forEach(childItem => {
      if (parentItem !== childItem) media.push(`${parentItem} and ${childItem}`)
    })
  })

  return media
}
