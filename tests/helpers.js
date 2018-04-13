let loaded = false

export const loadLib = (timeout = null) => {
  if (loaded) return
  loaded = true
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = '/base/dist/browser-vue-loader.js'
    script.onload = resolve
    document.head.appendChild(script)
  })
}

export const createDiv = (id = 'app') => {
  document.body.innerHTML += `<div id="${id}"></div>`
}

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
