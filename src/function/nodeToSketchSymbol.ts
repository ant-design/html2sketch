import { SymbolMaster, Style } from '../model';
import nodeToSketchLayers from './nodeToSketchLayers';
import transferToGroup from '../parser/group';
import { SMART_LAYOUT } from '../helpers/layout';
import { orderNodeList } from '../helpers/hierarchy';

/**
 * 解析为 Symbol
 */
const parserToSymbol = (
  node: Element,
  options?: { smartLayout: keyof typeof SMART_LAYOUT }
) => {
  const symbolNode = node;
  const name = node.className.replace(' symbol', '').replace('ant-', '');

  const { left: x, top: y, width, height } = symbolNode.getBoundingClientRect();
  const symbol = new SymbolMaster({ x, y, width, height });
  symbol.name = name;

  const group = transferToGroup(node);

  const styles = getComputedStyle(node);
  const groupStyle = new Style();
  groupStyle.opacity = styles.opacity; // 赋值不透明度
  group.style = groupStyle;

  const parentAndChildren = [
    symbolNode,
    ...Array.from(symbolNode.querySelectorAll('*')),
  ];

  orderNodeList(parentAndChildren)
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
    .forEach((layer) => {
      switch (layer.class) {
        case 'text':
          symbol.addOverride(layer.id, 'stringValue');
          break;
        case 'svg':
          // 由于
          layer.layers.forEach((shapeGroup) => {
            shapeGroup.x += group.x;
            shapeGroup.y += group.y;
          });
      }
      group.addLayer(layer);
    });

  symbol.addLayer(group);

  symbol.height = symbol.getSize().height;
  symbol.width = symbol.getSize().width;

  group.x = 0;
  group.y = 0;

  if (options) {
    if (options.smartLayout) {
      symbol.setGroupLayout(options.smartLayout);
    }
  }

  return symbol;
};

export default parserToSymbol;
