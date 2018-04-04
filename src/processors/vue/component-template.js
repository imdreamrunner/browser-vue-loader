import componentNormalizer from 'component-normalizer'

import script from '__vue_script__'
import render from '__vue_render__'
import staticRenderFns from '__vue_static_render_fns__'
import templateFunctional from '__vue_template_functional__'
import styles from '__vue_styles__'
import scopeId from '__vue_scopeId__'
import moduleIdentifier from '__vue_module_identifier__'

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
