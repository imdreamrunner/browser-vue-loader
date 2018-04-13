/**
 * The content of this file is modified from the following repository
 * https://github.com/css-modules/postcss-modules
 * The modification is to turn off the support for node.js and @import.
 */

import stringHash from 'string-hash'

export default function generateScopedName (name, filename, css) {
  const i = css.indexOf(`.${name}`)
  const lineNumber = css.substr(0, i).split(/[\r\n]/).length
  const hash = stringHash(css).toString(36).substr(0, 5)

  return `_${name}_${hash}_${lineNumber}`
}
