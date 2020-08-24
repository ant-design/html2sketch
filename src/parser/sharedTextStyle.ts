import nodeToLayers from '../function/nodeToLayers';

/**
 * 解析文本共享样式
 */
const parserTextStyle = (node: HTMLElement) => {
  const styleName = node.innerText;
  const layer = nodeToLayers(node);

  return layer
    .filter((l) => l.class === 'text')
    .map((l) => {
      return {
        name: styleName,
        style: l.style,
      };
    });
};
export default parserTextStyle;
