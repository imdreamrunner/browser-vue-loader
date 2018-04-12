import { fetchFromUrl } from './fetch-source'

const defaultExtension = 'js'

export const addDefaultExtension = url => {
  const pathSplits = url.split('/')
  const filename = pathSplits[pathSplits.length - 1]
  if (url.indexOf('http') >= 0 && filename.indexOf('.') < 0) {
    url = url + '.' + defaultExtension
  }
  return url
}

const npmBlacklist = ['empty', 'component-normalizer']

export const lookupNpmPackage = async name => {
  if (npmBlacklist.indexOf(name) >= 0) return null
  const unpkgUrl = `https://unpkg.com/${name}`
  const response = await fetchFromUrl(unpkgUrl)
  if (response.url) return response.url
  return null
}

export const splitKey = key => {
  let processor, url, options
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
      options = JSON.stringify(processorOptions.substring(questionMarkPosition + 1))
    }
  }
  return { processor, url, options }
}

export const constructKey = ({ processor, options, url }) => {
  let result = ''
  if (processor) {
    result += processor
    if (options) {
      result += `?${JSON.stringify(options)}`
    }
    result += '!'
  }
  return result + url
}
