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
  let textNode = false;
  node.childNodes.forEach((childNode) => {
    if (childNode.nodeName.includes('text')) {
      textNode = true;
    }
  });
  return node && node.childNodes!.length > 0 && textNode;
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
export const isImageNode = (node: Element): node is HTMLImageElement => {
  return isNodeType(node, 'img');
};

/**
 * 判断是否是带文本的输入框节点
 */
export const isTextInputNode = (node: Element): node is HTMLInputElement => {
  return (
    isNodeType(node, 'input') &&
    (node as HTMLInputElement).type !== 'checkbox' &&
    (node as HTMLInputElement).type !== 'radio'
  );
};

/**
 * 判断是否是图片节点
 */
export const isCanvasNode = (node: Element): node is HTMLCanvasElement => {
  return isNodeType(node, 'canvas');
};

/**
 * 是否是 SVG 的子级
 */
export const isSVGChildNode = (node: Element) =>
  node instanceof SVGElement && node.matches('svg *');

/**
 * 判断是否是Svg节点
 */
export const isSvgNode = (node: Element): node is SVGElement => {
  return isNodeType(node, 'svg');
};
