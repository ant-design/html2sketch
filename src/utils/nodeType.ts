/**
 * 判断是否是某种节点类型
 * @param node
 * @param type
 */
export const isNodeType = (node: Element, type: string | string[]): boolean => {
  if (!node) return false;
  const nodeName = node.nodeName.toLowerCase();

  if (typeof type === 'string') {
    return type === nodeName;
  }

  return type.includes(nodeName);
};

/**
 * 判断是否是 Text 节点
 */
export const isTextNode = (node: Element): boolean => {
  return (
    node &&
    node.childNodes!.length > 0 &&
    node.childNodes[0].nodeName.includes('text')
  );
};
/**
 * 判断是否是 Group 节点
 */
export const isGroupNode = (node: Element): boolean => {
  return isNodeType(node, ['div', 'span', 'th']);
};

/**
 * 判断是否是图片节点
 */
export const isImageNode = (node: Element): boolean => {
  return isNodeType(node, 'img');
};

/**
 * 判断是否是图片节点
 */
export const isCanvasNode = (node: Element): boolean => {
  return isNodeType(node, 'canvas');
};

/**
 * 是否是 SVG 的子级
 */
export const isSVGDescendantNode = (node: Element) =>
  node instanceof SVGElement && node.matches('svg *');
