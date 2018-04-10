export const loadLib = (timeout = null) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = '/base/dist/browser-vue-loader.js'
    script.onload = resolve
    document.head.appendChild(script)
  })
}
