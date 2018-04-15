import 'whatwg-fetch'

/**
 * A dictionary containing all the loaded source code from a URL.
 *
 * Key: {String} URL ------> {String|ByteArray} source code or loaded image
 */
const localCache = {}

/**
 * A dictionary containing resource fetched from a URL.
 *
 * Key: {String} URL ------> Fetched result
 */
const fetchCache = {}

/**
 * Add a content to the local cache.
 * The content may not actually exist at the URL given.
 * This is useful when we want to let other processor to handle a part
 * of a complex module such as Vue's Single-File Component.
 * @param {String} url - The URL of the Resource
 * @param {any} content - The content to be added to cached.
 */
export const addToCache = (url, content) => {
  localCache[url] = content
}

/**
 * This is essentially the WHATWG fetch function.
 * @param {String} url - the URL to fetch
 * @returns {Promise<object>}
 */
export const fetchFromUrl = async url => {
  if (url in fetchCache) {
    return fetchCache[url]
  } else {
    const result = await window.fetch(url)
    fetchCache[url] = result
    return result
  }
}

/**
 * Check if a remote resource exists.
 * The check is done by requesting the URL and compare the returned status code
 * with 200.
 * @param {String} url - the URL to check
 * @return {Promise<Boolean>}
 */
export const checkResourceByUrl = async url => {
  const result = await fetchFromUrl(url)
  return result.status === 200
}

/**
 * Fetch the content from the URL.
 * @param url {String} the URL to fetch
 * @param isBinary {Boolean} if the content is binary
 * @returns {Promise<String>}
 */
export const fetchContent = async (url, isBinary = false) => {
  if (url in localCache) {
    return localCache[url]
  } else {
    const response = await fetchFromUrl(url)
    if (isBinary) {
      return response.arrayBuffer()
    } else {
      return response.text()
    }
  }
}
