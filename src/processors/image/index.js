import BaseProcessor from '../base-processor'
import { extractExtension, splitKey } from '../../core/key-utils'

function arrayBufferToBase64 (buffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer)
  let len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

function getImageType (extension) {
  if (extension === 'svg') {
    return `image/svg+xml`
  } else {
    return `image/${extension}`
  }
}

export default class ImageProcessor extends BaseProcessor {
  async process (key, source) {
    const {url} = splitKey(key)
    const extension = extractExtension(url)
    const base64string = arrayBufferToBase64(source)
    const dataUrl = `data:${getImageType(extension)};base64,${base64string}`
    this.registerDynamic(key, [], true, (require, exports, module) => {
      module.exports = dataUrl
    })
  }
}
