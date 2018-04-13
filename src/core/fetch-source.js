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
export const fetchFromUrl = async (url) => {
  if (url in fetchCache) {
    console.log('cached result', url)
    return fetchCache[url]
  } else {
    console.log('fetch', url)
    const result = await window.fetch(url)
    fetchCache[url] = result
    return result
  }
}

/**
 * Fetch the content from the URL.
 * @param url {String} the URL to fetch
 * @returns {Promise<String>}
 */
export const fetchContent = async (url) => {
  if (url in localCache) {
    return localCache[url]
  } else {
    const response = await fetchFromUrl(url)
    return response.text()
  }
}
