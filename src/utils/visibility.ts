export const isTextVisible = ({
  textIndent,
  overflowX,
  overflowY,
}: CSSStyleDeclaration) => {
  // NOTE overflow:hidden is not needed if text-indent is huge
  // , but how to define 'huge'?
  if (
    parseFloat(textIndent) < 0 &&
    overflowX === 'hidden' &&
    overflowY === 'hidden'
  ) {
    return false;
  }

  return true;
};

export const isNodeVisible = (
  node: Element,
  { width, height } = node.getBoundingClientRect(),
  {
    position,
    overflowX,
    overflowY,
    opacity,
    visibility,
    display,
    clip,
  } = getComputedStyle(node),
) => {
  // skip node when display is set to none for itself or an ancestor
  // helps us catch things such as <noscript>
  // HTMLSlotElement has a null offsetParent, but should still be visible
  if (
    node.tagName !== 'BODY' &&
    // @ts-ignore
    node.offsetParent === null &&
    position !== 'fixed' &&
    node.tagName.toLowerCase() !== 'slot'
  ) {
    return false;
  }

  if (
    (width === 0 || height === 0) &&
    overflowX === 'hidden' &&
    overflowY === 'hidden'
  ) {
    return false;
  }

  if (
    display === 'none' ||
    visibility === 'hidden' ||
    visibility === 'collapse' ||
    parseFloat(opacity) < 0.1
  ) {
    return false;
  }

  if (clip === 'rect(0px, 0px, 0px, 0px)' && position === 'absolute') {
    return false;
  }

  // node is detached from the DOM
  if (!node.isConnected) {
    return false;
  }

  const parent = node.parentElement;

  if (parent && parent.nodeName !== 'HTML' && !isNodeVisible(parent)) {
    return false;
  }

  return true;
};
