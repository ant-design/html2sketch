import { SymbolMaster } from '../models';
import { defaultSymbolParamsList } from '../utils/sketchSymbolParams';
import nodeToGroup from './nodeToGroup';
import adjustSymbolParams from './adjustSymbolParams';
import { AnyLayer, NodeToSketchSymbolOptions } from '../types';

/**
 * 解析为 Symbol
 */
export default async (node: Element, options?: NodeToSketchSymbolOptions) => {
  if (!node) throw Error('解析对象不存在 请检查传入对象');

  const group = await nodeToGroup(node);

  const symbol = new SymbolMaster({
    x: group.x,
    y: group.y,
    width: group.width,
    height: group.height,
  });

  symbol.style = group.style;
  symbol.nodeType = group.nodeType;
  symbol.className = group.className;
  symbol.name = group.name;

  if (group.class !== 'group') {
    symbol.addLayer(group);
  } else {
    symbol.addLayers(group.layers);
  }

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
      adjustSymbolParams(symbol, { layerParams });
    }
  }

  /**
   * 递归添加 Override
   * @param layer
   */
  const addOverride = (layer: AnyLayer) => {
    if (layer.layers.length > 0) {
      layer.layers.forEach(addOverride);
    }

    switch (layer.class) {
      case 'text':
        // 对所有的文本都添加
        symbol.addOverride(layer.id, 'text');
        break;
      case 'bitmap':
        // 对所有的图片都添加 override
        symbol.addOverride(layer.id, 'image');
        break;
      default:
    }
  };

  // 处理 override
  symbol.layers.forEach(addOverride);

  /**
   * 设置一些内置的的 symbol 配置项
   */
  defaultSymbolParamsList.forEach((paramsList) => {
    adjustSymbolParams(symbol, paramsList);
  });

  return symbol;
};
