export const fetchFromUrl = async (url) => {
  console.log('fetch url', url)
  return await fetch(url)
}
export const fetchContent = async (url) => {
  const response = await fetchFromUrl(url)
  return response.text()
}
