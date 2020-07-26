// based on https://www.w3.org/TR/SVG2/styling.html and defaults taken from Chrome
const SVG_STYLE_PROPERTIES = [
  //name, default value
  ['cx', '0px'],
  ['cy', '0px'],

  ['height', 'auto'],
  ['width', 'auto'],
  ['x', '0px'],
  ['y', '0px'],

  ['r', '0px'],

  ['rx', 'auto'],
  ['ry', 'auto'],

  ['d', 'none'],

  ['fill', 'rgb(0, 0, 0)'],

  ['transform', 'none'],

  ['alignment-baseline', 'auto'],
  ['baseline-shift', '0px'],
  ['clip', 'auto'],
  ['clip-path', 'none'],
  ['clip-rule', 'nonzero'],
  ['color', 'rgb(0, 0, 0)'],
  ['color-interpolation', 'srgb'],
  ['color-interpolation-filters', 'linearrgb'],
  ['color-rendering', 'auto'],
  ['cursor', 'auto'],
  ['direction', 'ltr'],
  ['display', 'inline'],
  ['dominant-baseline', 'auto'],
  ['fill-opacity', '1'],
  ['fill-rule', 'nonzero'],
  ['filter', 'none'],
  ['flood-color', 'rgb(0, 0, 0)'],
  ['flood-opacity', '1'],
  ['font-family', 'Times'],
  ['font-size', '16px'],
  ['font-size-adjust', 'none'],
  ['font-stretch', '100%'],
  ['font-style', 'normal'],
  ['font-variant', 'normal'],
  ['font-weight', '400'],
  ['glyph-orientation-horizontal', undefined],
  ['glyph-orientation-vertical', undefined],
  ['image-rendering', 'auto'],
  ['letter-spacing', 'normal'],
  ['lighting-color', 'rgb(255, 255, 255)'],
  ['marker-end', 'none'],
  ['marker-mid', 'none'],
  ['marker-start', 'none'],
  ['mask', 'none'],
  ['opacity', '1'],
  ['overflow', 'visible'],
  ['pointer-events', 'auto'],
  ['shape-rendering', 'auto'],
  ['solid-color', undefined],
  ['solid-opacity', undefined],
  ['stop-color', 'rgb(0, 0, 0)'],
  ['stop-opacity', '1'],
  ['stroke', 'none'],
  ['stroke-dasharray', 'none'],
  ['stroke-dashoffset', '0px'],
  ['stroke-linecap', 'butt'],
  ['stroke-linejoin', 'miter'],
  ['stroke-miterlimit', '4'],
  ['stroke-opacity', '1'],
  ['stroke-width', '1px'],
  ['text-anchor', 'start'],
  ['text-decoration', 'none solid rgb(0, 0, 0)'],
  ['text-overflow', 'clip'],
  ['text-rendering', 'auto'],
  ['unicode-bidi', 'normal'],
  ['vector-effect', 'none'],
  ['visibility', 'visible'],
  ['white-space', 'normal'],
  ['word-spacing', '0px'],
  ['writing-mode', 'horizontal-tb'],
];

export function inlineStyles(node) {
  const styles = getComputedStyle(node);

  SVG_STYLE_PROPERTIES.forEach((prop) => {
    const propName = prop[0];
    const propDefaultValue = prop[1];
    const propCurrentValue = styles[propName];
    const propAttributeValue = node.getAttribute(propName);

    if (
      propCurrentValue !== propDefaultValue &&
      propCurrentValue !== propAttributeValue &&
      // 不用 d 属性
      propName !== 'd' &&
      propName !== 'font-family'
    ) {
      node.style[propName] = propCurrentValue;
    }
  });
}

export function getUseReplacement(node) {
  const href = node.href.baseVal;
  // TODO this will only work for internal references
  let refNode = null;
  let resultNode = null;

  try {
    refNode = document.querySelector(href);
  } catch (e) {
    // ignore
  }

  if (refNode) {
    if (refNode instanceof SVGSymbolElement) {
      resultNode = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      Array.from(refNode.attributes).forEach((attr) =>
        resultNode.setAttribute(attr.name, attr.value)
      );
      //@ts-ignore
      Array.from(refNode.cloneNode(true).children).forEach((child) =>
        resultNode.appendChild(child)
      );
    } else {
      resultNode = refNode.cloneNode(true);
    }
  }

  return resultNode;
}
