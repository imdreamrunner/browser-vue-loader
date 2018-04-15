/**
 * Util functions for key related actions.
 *
 * Format of the key
 *
 *   [processor]?[base64 formatted options]![url]
 *
 * You may use {@link splitKey} to turn a string key into parts
 * and {@link constructKey} to make parts to form a string key.
 */

import { checkResourceByUrl, fetchFromUrl } from './fetch-source'

export const resolveActualUrl = async url => {
  const pathSplits = url.split('/')
  const filename = pathSplits[pathSplits.length - 1]
  if (url.indexOf('http') >= 0 && filename.indexOf('.') < 0 && url.indexOf('unpkg') < 0) {
    if (await checkResourceByUrl(url + '.js')) {
      url = url + '.js'
      return url
    }
    if (await checkResourceByUrl(url + '/index.js')) {
      url = url + '/index.js'
      return url
    }
  }
  return url
}

const npmBlacklist = ['empty', 'component-normalizer']

export const lookupNpmPackage = async name => {
  if (npmBlacklist.indexOf(name) >= 0) return null
  const unpkgUrl = `https://unpkg.com/${name}`
  const response = await fetchFromUrl(unpkgUrl)
  if (response.url) return unpkgUrl
  return null
}

const defaultBinary = [/\.(gif|png|jpe?g|svg)$/i]

export const checkDefaultBinary = url => {
  for (let tester of defaultBinary) {
    if (tester.test(url)) {
      return true
    }
  }
  return false
}

/**
 * Encode the URL and ! character.
 * @param {String} str URL
 * @returns {String} encoded URL
 */
const encodeURIComponentFix = (str) => {
  return encodeURIComponent(str).replace(/!/g, '%21')
}

/**
 * Split the key into components
 * @param key {String} the key
 * @returns {{processor: {String}, url: {String}, options: {}}} the result
 */
export const splitKey = key => {
  let processor, url, options
  // set default value to options
  options = {}
  if (!key) return {processor, url, options}
  const exclamationMarkPosition = key.indexOf('!')
  if (exclamationMarkPosition < 0) {
    url = key
  } else {
    url = key.substring(exclamationMarkPosition + 1)
    const processorOptions = key.substring(0, exclamationMarkPosition)
    const questionMarkPosition = processorOptions.indexOf('?')
    if (questionMarkPosition < 0) {
      processor = processorOptions
    } else {
      processor = processorOptions.substring(0, questionMarkPosition)
      options = JSON.parse(decodeURIComponent(processorOptions.substring(questionMarkPosition + 1)))
    }
  }
  return { processor, url, options }
}

export const constructKey = ({ processor, options, url }) => {
  let result = ''
  if (processor) {
    result += processor
  }
  if (options) {
    result += `?${encodeURIComponentFix(JSON.stringify(options))}`
  }
  if (processor || options) {
    result += '!'
  }
  return result + url
}

export const extractExtension = url => url.split('.').pop().split(/#|\?/)[0]
