/**
 * The content of this file is modified from the following repository
 * https://github.com/css-modules/postcss-modules
 * The modification is to turn off the support for node.js and @import.
 */

import postcss from 'postcss'
import Parser from 'css-modules-loader-core/lib/parser'
import genericNames from 'generic-names'
import generateScopedName from './generateScopedName'
import {
  getDefaultPlugins,
  isValidBehaviour,
  behaviours
} from './behaviours'

const PLUGIN_NAME = 'postcss-modules'

function getDefaultScopeBehaviour (opts) {
  if (opts.scopeBehaviour && isValidBehaviour(opts.scopeBehaviour)) {
    return opts.scopeBehaviour
  }

  return behaviours.LOCAL
}

function getScopedNameGenerator (opts) {
  const scopedNameGenerator = opts.generateScopedName || generateScopedName

  if (typeof scopedNameGenerator === 'function') return scopedNameGenerator
  return genericNames(scopedNameGenerator, {context: process.cwd()})
}

function isGlobalModule (globalModules, inputFile) {
  return globalModules.some(regex => inputFile.match(regex))
}

function getDefaultPluginsList (opts, inputFile) {
  const globalModulesList = opts.globalModulePaths || null
  const defaultBehaviour = getDefaultScopeBehaviour(opts)
  const generateName = getScopedNameGenerator(opts)

  if (globalModulesList && isGlobalModule(globalModulesList, inputFile)) {
    return getDefaultPlugins(behaviours.GLOBAL, generateName)
  }

  return getDefaultPlugins(defaultBehaviour, generateName)
}

function isResultPlugin (plugin) {
  return plugin.postcssPlugin !== PLUGIN_NAME
}

module.exports = postcss.plugin(PLUGIN_NAME, (opts = {}) => {
  const getJSON = opts.getJSON

  return async (css, result) => {
    const inputFile = css.source.input.file
    const resultPlugins = result.processor.plugins.filter(isResultPlugin)
    const pluginList = getDefaultPluginsList(opts, inputFile)
    const plugins = [...pluginList, ...resultPlugins]
    const dummyPathFetcher = () => {
      throw new Error('Path fetcher is called. @import should have been flattened.')
      // The path fetcher should not be called here because the browser vue loader
      // should have already flatten the @import statement by css-at-import plugin.
    }

    const parser = new Parser(dummyPathFetcher)

    await postcss([...plugins, parser.plugin]).process(css, {from: inputFile})

    // getJSON may return a promise
    return getJSON(css.source.input.file, parser.exportTokens, result.opts.to)
  }
})
