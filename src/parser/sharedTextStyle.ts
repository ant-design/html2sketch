import nodeToSketchLayers from '../function/nodeToSketchLayers';

/**
 * 解析文本共享样式
 */
const parserTextStyle = (node: HTMLElement) => {
  const styleName = node.innerText;
  const layer = nodeToSketchLayers(node);

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
