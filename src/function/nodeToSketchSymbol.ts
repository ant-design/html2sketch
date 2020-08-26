import { SymbolMaster } from '../model';
import nodeToGroup from './nodeToGroup';
import adjustSymbolLayout from './adjustSymbolLayout';
import { NodeToSketchSymbolOptions } from '../type';

/**
 * 解析为 Symbol
 */
export default (node: Element, options?: NodeToSketchSymbolOptions) => {
  if (!node) throw Error('解析对象不存在 请检查传入对象');

  const group = nodeToGroup(node);

  const symbol = new SymbolMaster({
    x: group.x,
    y: group.y,
    width: group.width,
    height: group.height,
  });

  symbol.style = group.style;

  group.layers.forEach((layer) => {
    switch (layer.class) {
      case 'text':
        // 对所有的文本都添加
        symbol.addOverride(layer.id, 'text');
        break;
      default:
        break;
    }
    symbol.layers.push(layer);
  });

  if (options) {
    const { symbolLayout, handleSymbol, layerParams } = options;

    if (symbolLayout) {
      symbol.setGroupLayout(symbolLayout);
    }

    if (handleSymbol) {
      handleSymbol(symbol);
    }
    if (layerParams) {
      // 调整 symbol 的 layout 类型
      adjustSymbolLayout(symbol, layerParams);
    }
  }

  adjustSymbolLayout(symbol);
  return symbol;
};
