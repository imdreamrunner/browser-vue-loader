class ResourceFetcher {
  async fetch (url) {
    const response = await fetch(url)
    return response.text()
  }
}

export default new ResourceFetcher()
