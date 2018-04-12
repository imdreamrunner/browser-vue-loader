const injectStyle = (css) => {
  const styleElement = document.createElement('style')
  styleElement.appendChild(document.createTextNode(css))
  document.head.appendChild(styleElement)
}

export default injectStyle
