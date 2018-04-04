// window.babel = require('babel-core');
// window.babelPluginTransformES2015ModulesSystemJS = require('babel-plugin-transform-es2015-modules-systemjs');
// window.babelPluginSyntaxDynamicImport = require('babel-plugin-syntax-dynamic-import');

import * as babel from 'babel-core'
import babelPluginTransformES2015ModulesSystemJS from 'babel-plugin-transform-es2015-modules-systemjs'
import babelPluginSyntaxDynamicImport from 'babel-plugin-syntax-dynamic-import'

const babelProcessor = (url, source, registerFunction) => {

  // transform source with Babel
  const output = babel.transform(source, {
    compact: false,
    filename: url + '!transpiled',
    sourceFileName: url,
    moduleIds: false,
    sourceMaps: 'inline',
    babelrc: false,
    plugins: [babelPluginSyntaxDynamicImport, babelPluginTransformES2015ModulesSystemJS]
  })

  const transformedCode = output.code + '\n//# sourceURL=' + url + '!transpiled'

  console.log('output', transformedCode)

  function evalFunction() {
    const System = {
      register: registerFunction
    }
    console.log('this', this)
    console.log('System.register', System.register)
    eval(transformedCode)
  }

  evalFunction.call({System: {register: registerFunction}})

}

export default babelProcessor
