import * as babel from 'babel-standalone'
import babelPluginTransformES2015ModulesSystemJS from 'babel-plugin-transform-es2015-modules-systemjs'
import babelPluginSyntaxDynamicImport from 'babel-plugin-syntax-dynamic-import'

export function transpile(key, source) {
  // transform source with Babel
  const output = babel.transform(source, {
    compact: false,
    filename: key + '!transpiled',
    sourceFileName: key,
    moduleIds: false,
    sourceMaps: 'inline',
    babelrc: false,
    plugins: [babelPluginSyntaxDynamicImport, babelPluginTransformES2015ModulesSystemJS]
  })

  const transformedCode = output.code + '\n//# sourceURL=' + key + '!transpiled'

  return transformedCode
}
