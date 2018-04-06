const fetcher = async (url) => {
  let realUrl = url
  if (url.indexOf('!') >= 0) {
    const urlParts = url.split('!')
    realUrl = urlParts[urlParts.length - 1]
  }
  const response = await fetch(realUrl)
  return response.text()
}

export default fetcher
