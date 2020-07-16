import { nodeToSketchLayers, SVG, SymbolMaster, Text } from '../index';

/**
 * 解析为 Symbol
 */
const parserToSymbol = (node: Element) => {
  const symbolNode = node;
  const name = node.className.replace(' symbol', '').replace('ant-', '');

  const { left: x, top: y, width, height } = symbolNode.getBoundingClientRect();
  const symbol = new SymbolMaster({ x, y, width, height });

  symbol.setId(name);
  symbol.setName(name);

  const parentAndChildren = [
    symbolNode,
    ...Array.from(symbolNode.querySelectorAll('*')),
  ];

  Array.from(parentAndChildren)
    .map((node) => {
      const layers = nodeToSketchLayers(node);

      return layers.map((layer) => {
        console.log(layer);
        if (layer) {
          let name = '';
          switch (layer.type) {
            case 'Text':
              name = '文本';
              break;
            case 'Rectangle':
              name = 'BG';
              break;
          }

          layer.setName(name);
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
