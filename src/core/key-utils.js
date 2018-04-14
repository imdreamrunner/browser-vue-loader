import { fetchFromUrl } from './fetch-source'

const defaultExtension = 'js'

export const addDefaultExtension = url => {
  const pathSplits = url.split('/')
  const filename = pathSplits[pathSplits.length - 1]
  if (url.indexOf('http') >= 0 && filename.indexOf('.') < 0 && url.indexOf('unpkg') < 0) {
    url = url + '.' + defaultExtension
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

export const splitKey = key => {
  let processor, url, options = {}
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

export const extractExtension = url => url.split('.').pop().split(/#|\?/)[0];
