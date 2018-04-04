const defaultExtension = "js"

const resolver = key => {
  const pathSplits = key.split('/')
  const filename = pathSplits[pathSplits.length - 1]
  if (key.indexOf('http') >= 0 && filename.indexOf('.') < 0) {
    key = key + '.' + defaultExtension
  }
  return key
}

export default resolver
