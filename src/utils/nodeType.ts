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
  const nodeName = node.nodeName.toLowerCase();
  return nodeName === 'div' || nodeName === 'span' || nodeName === 'th';
};

/**
 * 判断是否是图片节点
 */
export const isImageNode = (node: Element): boolean => {
  if (!node) return false;
  const nodeName = node.nodeName.toLowerCase();
  return nodeName === 'image';
};
