import * as babel from 'babel-standalone'
import babelPluginTransformES2015ModulesSystemJS from 'babel-plugin-transform-es2015-modules-systemjs'
import babelPluginSyntaxDynamicImport from 'babel-plugin-syntax-dynamic-import'
import babelPluginTransformAmdSystemWrapper from 'babel-plugin-transform-amd-system-wrapper'

export function transpile(key, source, options) {
  const module = (options || {}).module || 'es'

  let plugins = [babelPluginSyntaxDynamicImport, babelPluginTransformES2015ModulesSystemJS]

  if (module === 'amd') {
    plugins = [babelPluginTransformAmdSystemWrapper]
  }

  // transform source with Babel
  const output = babel.transform(source, {
    compact: false,
    filename: key + '!transpiled',
    sourceFileName: key,
    moduleIds: false,
    sourceMaps: 'inline',
    babelrc: false,
    // presets: ['es2015'],
    parserOpts: { strictMode: false },
    plugins: plugins,
  })

  // delete the "use strict";
  const outputCode = output.code.replace('"use strict";', '').replace("'use strict';", '')

  const transformedCode = outputCode + '\n//# sourceURL=' + key + '!transpiled'

  return transformedCode
}
