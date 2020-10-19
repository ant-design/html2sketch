import { Group, SymbolMaster, Text } from '../models';
import {
  SymbolAdjustParams,
  TextParam,
  GroupLayoutType,
  AnyLayer,
  DefaultSymbolParams,
  LayerSelector,
  ResizingConstraint,
} from '../types';

/**
 * 调整文本部分
 * @param layer 文本图册
 * @param param 文本参数
 */
const adjustText = (layer: Text, param: TextParam) => {
  const { horizontalAlign, textBehaviour, verticalAlign } = param;
  if (textBehaviour) {
    (layer as Text).sketchTextBehaviour = textBehaviour;
  }
  if (horizontalAlign) {
    (layer as Text).textStyle.textAlign = horizontalAlign;
  }
  if (verticalAlign) {
    (layer as Text).textStyle.verticalAlign = verticalAlign;
  }
};

/**
 * 调整配置项
 * 1.图层类型的布局模式
 * 2.图层类型的布局模式
 * @param layer
 * @param layout 布局类型
 * @param resizing 调整尺寸的约束条件
 */
const adjust = (
  layer: AnyLayer,
  {
    layout,
    resizing,
  }: { resizing?: ResizingConstraint[]; layout?: GroupLayoutType },
) => {
  if (layout) {
    if (layer.class !== 'group') return;

    if (layout) {
      (layer as Group).setGroupLayout(layout);
    }
  }
  if (resizing) {
    layer.setResizingConstraint(...resizing);
  }
};

/**
 * 选择图层的方法
 * @param layer
 * @param selector
 */
const selectorLayer = <T extends AnyLayer | SymbolMaster>(
  layer: T,
  selector?: LayerSelector,
): T | undefined => {
  switch (selector?.type) {
    case 'class':
      if (layer.class === selector?.value) return layer;
      return;
    case 'classname':
      if (layer.className?.includes(selector?.value)) return layer;

      return;
    case 'name':
      if (layer.name === selector?.value) return layer;

      return;
    case 'text':
      if (
        layer.class === 'text' &&
        (layer as Text).text.includes(selector?.value)
      )
        return layer;
      break;
    case 'tag':
      if (layer.nodeType === selector?.value) return layer;

      break;
    default:
  }
};

/**
 * 调整单个图层的 配置项
 * @param layer
 * @param params
 */
const adjustGroupLayer = (layer: AnyLayer, params?: SymbolAdjustParams[]) => {
  if (layer.layers) {
    layer.layers.forEach((l) => adjustGroupLayer(l, params));
  }
  if (!params) return false;

  // 对每个传进来的参数进行调教
  params.forEach((param) => {
    const { layout, resizing, selector, text } = param;

    const selectedLayer = selectorLayer<AnyLayer>(layer, selector);
    if (selectedLayer) {
      adjust(selectedLayer, { resizing, layout });
      if (layer.class === 'text' && text) {
        adjustText(selectedLayer as Text, text);
      }
    }
  });
};

/**
 * 调整 Symbol 的 Layout
 * @param symbol
 * @param symbolParams
 */
const adjustSymbolParams = (
  symbol: SymbolMaster,
  symbolParams?: DefaultSymbolParams,
) => {
  if (symbol.class !== 'symbolMaster') {
    throw Error('传入对象不是 Symbol 对象,请检查!');
  }

  if (!symbolParams) return;

  const { symbolLayout, layerParams, symbolName, selector } = symbolParams;
  if (selector) {
    const selectedSymbol = selectorLayer<SymbolMaster>(symbol, selector);
    if (!selectedSymbol) return;
  }
  if (symbolName) {
    symbol.name = symbolName;
  }
  if (symbolLayout) {
    symbol.setGroupLayout(symbolLayout);
  }
  symbol.layers.forEach((l) => {
    adjustGroupLayer(l, layerParams);
  });
};

export default adjustSymbolParams;
