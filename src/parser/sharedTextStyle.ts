import { nodeToSketchLayers } from '../function/nodeToSketchLayers';

/**
 * 解析文本共享样式
 */
const parserTextStyle = (node: HTMLElement) => {
  const styleName = node.innerText;
  console.log(node.innerText);
  const layer = nodeToSketchLayers(node);

  return layer
    .filter((layer) => layer.class === 'text')
    .map((layer) => {
      return {
        name: styleName,
        style: layer.style,
      };
    });
};
export default parserTextStyle;
