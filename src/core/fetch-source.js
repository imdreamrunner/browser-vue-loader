import 'whatwg-fetch'

const localCache = {}

export const addToCache = (url, content) => {
  localCache[url] = content
}

/**
 * This is essentially the WHATWG fetch function.
 * @param url {String} the URL to fetch
 * @returns {Promise<object>}
 */
export const fetchFromUrl = async (url) => {
  console.log('fetch', url)
  return window.fetch(url)
}

/**
 * Fetch the content from the URL.
 * @param url {String} the URL to fetch
 * @returns {Promise<String>}
 */
export const fetchContent = async (url) => {
  if (localCache[url]) {
    return localCache[url]
  } else {
    const response = await fetchFromUrl(url)
    return response.text()
  }
}
