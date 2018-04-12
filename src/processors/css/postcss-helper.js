import postcss from 'postcss'
import atImport from './postcss-plugins/at-import'
import scopeId from './postcss-plugins/scope-id'

/**
 * This plugin is to handle @import statement inside the CSS file.
 * @returns {object} the plugin
 */
const atImportPlugin = (require = null) => {
  const resolver = async (key, base) => {
    let resolvedKey = key
    if (resolvedKey.indexOf('://') >= 0) {
      resolvedKey = key
    } else {
      resolvedKey = `${base}/${key}`
    }
    if (resolvedKey.indexOf('css!') < 0) {
      resolvedKey = `css!${resolvedKey}`
    }
    return resolvedKey
  }
  const instantiator = async (key) => {
    if (require) {
      const content = await require(key)
      return await content.getCompiledCss() || ''
    } else {
      return `/* content of ${key} */`
    }
  }
  return atImport({
    resolver,
    instantiator
  })
}

export const getImports = async (url, source) => {
  const postcssOptions = {from: url, to: url}
  const imports = []
  const firstCompiled = await postcss([atImportPlugin()]).process(source, postcssOptions)
  if (firstCompiled.messages) {
    firstCompiled.messages.forEach(message => {
      const {type, file} = message
      if (type === 'dependency') {
        imports.push(file)
      }
    })
  }
  return imports
}

export const postcssProcess = async (url, source, options, require) => {
  const plugins = [
    atImportPlugin(require)
  ]

  if (options.scoped) {
    plugins.push(scopeId({id: options.scopeId}))
  }

  const postcssOptions = {from: url, to: url}

  let compiled
  try {
    compiled = await postcss(plugins).process(source, postcssOptions)
  } catch (ex) {
    console.warn(`Error when processing CSS ${url}`, ex)
    console.log(ex.stack)
    return
  }

  return compiled.css
}
