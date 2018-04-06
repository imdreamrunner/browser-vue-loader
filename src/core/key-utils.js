const defaultExtension = "js"

const addDefaultExtension = url => {
  const pathSplits = url.split('/')
  const filename = pathSplits[pathSplits.length - 1]
  if (url.indexOf('http') >= 0 && filename.indexOf('.') < 0) {
    url = url + '.' + defaultExtension
  }
  return url
}

export const splitKey = key => {
  if (!key) return {processor: undefined, url: undefined}
  const splits = key.split('!')
  let processor, url
  if (splits.length > 1) {
    processor = splits[0]
    url = splits[1]
  } else {
    url = splits[0]
  }
  url = addDefaultExtension(url)
  return { processor, url }
}

export const constructKey = ({ processor, url }) => {
  let result = ''
  if (processor) {
    result = processor + '!'
  }
  return result + url
}
