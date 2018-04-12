import { transform } from 'babel-standalone'
import babelPluginTransformES2015ModulesSystemJS from 'babel-plugin-transform-es2015-modules-systemjs'
import babelPluginSyntaxDynamicImport from 'babel-plugin-syntax-dynamic-import'
import babelPluginTransformAmdSystemWrapper from 'babel-plugin-transform-amd-system-wrapper'
import babelPluginTransformCjsSystemWrapper from 'babel-plugin-transform-cjs-system-wrapper'

export function transpile (key, source, options) {
  const module = (options || {}).module || 'es'

  let plugins = [babelPluginSyntaxDynamicImport, babelPluginTransformES2015ModulesSystemJS]

  if (module === 'amd') {
    plugins = [babelPluginTransformAmdSystemWrapper]
  } else if (module === 'commonjs') {
    plugins = [babelPluginTransformCjsSystemWrapper]
  }

  const output = transform(source, {
    compact: false,
    filename: key + '!transpiled',
    sourceFileName: key,
    moduleIds: false,
    sourceMaps: 'inline',
    babelrc: false,
    parserOpts: { strictMode: false },
    plugins: plugins
  })

  return output.code + '\n//# sourceURL=' + key + '!transpiled'
}
