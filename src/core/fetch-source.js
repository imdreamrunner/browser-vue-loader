import 'whatwg-fetch'

const localCache = {}
const fetchCache = {}

export const addToCache = (url, content) => {
  localCache[url] = content
}

/**
 * This is essentially the WHATWG fetch function.
 * @param url {String} the URL to fetch
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
