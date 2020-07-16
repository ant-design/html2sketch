import { nodeToSketchLayers, SymbolMaster } from '../index';

/**
 * 解析为 Symbol
 */
const parserToSymbol = (node: Element) => {
  const symbolNode = node;
  const name = node.className.replace(' symbol', '').replace('ant-', '');

  const { left: x, top: y, width, height } = symbolNode.getBoundingClientRect();
  const symbol = new SymbolMaster({ x, y, width, height });

  symbol.symbolID = name;
  symbol.name = name;

  const parentAndChildren = [
    symbolNode,
    ...Array.from(symbolNode.querySelectorAll('*')),
  ];

  Array.from(parentAndChildren)
    .map((node) => {
      const layers = nodeToSketchLayers(node);

      return layers.map((layer) => {
        if (layer) {
          let name = '';
          switch (layer.class) {
            case 'text':
              name = '文本';
              break;
            case 'rectangle':
              name = 'BG';
              break;
          }

          layer.name = name;
          return layer;
        }
      });
    })
    .reduce((prev, current) => prev.concat(current), [])
    .filter((layer) => layer !== null)
    .forEach((layer) => symbol.addLayer(layer));

  return symbol;
};

export default parserToSymbol;
