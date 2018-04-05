import componentNormalizer from 'component-normalizer'

import script from '__vue_script__'
import { render, staticRenderFns } from '__vue_template__'
import templateFunctional from '__vue_template_functional__'
import styles from '__vue_styles__'
import scopeId from '__vue_scopeId__'
import moduleIdentifier from '__vue_module_identifier__'

console.log('! render', render)

const Component = componentNormalizer(
  script,
  render,
  staticRenderFns,
  templateFunctional,
  styles,
  scopeId,
  moduleIdentifier
)

export default Component.exports
