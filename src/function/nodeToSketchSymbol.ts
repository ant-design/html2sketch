import { SymbolMaster } from '../model';
import nodeToGroup from './nodeToGroup';
import adjustSymbolLayout, { SymbolAdjustParams } from './adjustSymbolLayout';
import { HandleSymbolFn, GroupLayoutType } from '../type';

interface NodeToSketchSymbolOptions {
  symbolLayout?: GroupLayoutType;
  /**
   * 如果需要对 symbol 进行调整处理
   * 传入这个方法
   */
  handleSymbol?: HandleSymbolFn;
  layerLayouts: SymbolAdjustParams[];
}

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
    const { symbolLayout, handleSymbol, layerLayouts } = options;

    if (symbolLayout) {
      symbol.setGroupLayout(symbolLayout);
    }

    if (handleSymbol) {
      handleSymbol(symbol);
    }
    if (layerLayouts) {
      // 调整 symbol 的 layout 类型
      adjustSymbolLayout(symbol, layerLayouts);
    }
  }

  adjustSymbolLayout(symbol);
  return symbol;
};
