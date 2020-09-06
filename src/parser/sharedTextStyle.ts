import nodeToLayers from '../function/nodeToLayers';

/**
 * 解析文本共享样式
 */
export const parseToSharedTextStyle = async (node: HTMLElement) => {
  const styleName = node.innerText;
  const layer = await nodeToLayers(node);

  return layer
    .filter((l) => l.class === 'text')
    .map((l) => {
      return {
        name: styleName,
        style: l.style,
      };
    });
};
