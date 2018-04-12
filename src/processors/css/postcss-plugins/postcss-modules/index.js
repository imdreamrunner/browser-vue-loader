import postcss            from 'postcss';
import Parser             from 'css-modules-loader-core/lib/parser';
// import FileSystemLoader   from 'css-modules-loader-core/lib/file-system-loader';
import genericNames       from 'generic-names';
import generateScopedName from './generateScopedName';
import {
  getDefaultPlugins,
  isValidBehaviour,
  behaviours,
} from './behaviours';

const PLUGIN_NAME = 'postcss-modules';


function getDefaultScopeBehaviour(opts) {
  if (opts.scopeBehaviour && isValidBehaviour(opts.scopeBehaviour)) {
    return opts.scopeBehaviour;
  }

  return behaviours.LOCAL;
}


function getScopedNameGenerator(opts) {
  const scopedNameGenerator = opts.generateScopedName || generateScopedName;

  if (typeof scopedNameGenerator === 'function') return scopedNameGenerator;
  return genericNames(scopedNameGenerator, { context: process.cwd() });
}


function getLoader(opts, plugins) {
  const root = typeof opts.root === 'undefined' ? '/' : opts.root;
  return typeof opts.Loader === 'function'
    ? new opts.Loader(root, plugins)
    : new FileSystemLoader(root, plugins);
}


function isGlobalModule(globalModules, inputFile) {
  return globalModules.some(regex => inputFile.match(regex));
}


function getDefaultPluginsList(opts, inputFile) {
  const globalModulesList = opts.globalModulePaths || null;
  const defaultBehaviour  = getDefaultScopeBehaviour(opts);
  const generateName      = getScopedNameGenerator(opts);

  if (globalModulesList && isGlobalModule(globalModulesList, inputFile)) {
    return getDefaultPlugins(behaviours.GLOBAL, generateName);
  }

  return getDefaultPlugins(defaultBehaviour, generateName);
}


function isResultPlugin(plugin) {
  return plugin.postcssPlugin !== PLUGIN_NAME;
}


module.exports = postcss.plugin(PLUGIN_NAME, (opts = {}) => {
  const getJSON = opts.getJSON;

  return async (css, result) => {
    const inputFile     = css.source.input.file;
    const resultPlugins = result.processor.plugins.filter(isResultPlugin);
    const pluginList    = getDefaultPluginsList(opts, inputFile);
    const plugins       = [...pluginList, ...resultPlugins];
    // const loader        = getLoader(opts, plugins);
    const pathFetcher = () => {
      console.log('fetcher....', arguments)
    }

    const parser        = new Parser(pathFetcher);

    // console.log('loader', loader)

    await postcss([...plugins, parser.plugin]).process(css, { from: inputFile });

    // const out = loader.finalSource;
    // if (out) css.prepend(out);

    // getJSON may return a promise
    return getJSON(css.source.input.file, parser.exportTokens, result.opts.to);
  };
});
