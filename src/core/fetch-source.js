const fetcher = async (url) => {
  console.log('fetch url', url)
  const response = await fetch(url)
  return response.text()
}

export default fetcher
