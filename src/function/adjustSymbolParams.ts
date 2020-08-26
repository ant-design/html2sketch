import { ResizingConstraint } from '../utils/layout';
import { Group, SymbolMaster, Text } from '../model';
import {
  SymbolAdjustParams,
  TextParam,
  GroupLayoutType,
  AnyLayer,
  DefaultSymbolParams,
} from '../type';

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

// const selectorLayer=()=>{
//
// }

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

  let isSelected = false;
  // 对每个传进来的参数进行调教
  params.forEach((param) => {
    const { layout, resizing, selector, text } = param;

    switch (selector?.type) {
      case 'class':
        if (layer.class === selector.value) {
          isSelected = true;
          adjust(layer, { resizing, layout });
        }
        break;
      case 'classname':
        if (layer.className?.includes(selector.value)) {
          isSelected = true;
          adjust(layer, { resizing, layout });
        }
        break;
      case 'name':
        if (layer.name === selector.value) {
          isSelected = true;
          adjust(layer, { resizing, layout });
        }
        break;
      case 'text':
        if (layer.class === 'text') {
          if ((layer as Text).text.includes(selector.value)) {
            isSelected = true;
            adjust(layer, { resizing, layout });
          }
          if (text) {
            adjustText(layer as Text, text);
          }
        }
        break;
      // case 'tag':
      //   if (layer?.tag === selector.value) {
      //     adjust(layer, { resizing, layout });
      //   }
      //   break;
      default:
    }
  });
  return isSelected;
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

  const { symbolLayout, layerParams, symbolName } = symbolParams;

  let isSelected = false;

  symbol.layers.forEach((l) => {
    const hasSelected = adjustGroupLayer(l, layerParams);
    // 如果命中过 就判断为选中过
    if (!isSelected && hasSelected) {
      isSelected = hasSelected;
    }
  });

  if (isSelected) {
    if (symbolName) {
      symbol.name = symbolName;
    }
    if (symbolLayout) {
      symbol.setGroupLayout(symbolLayout);
    }
  }
};

export default adjustSymbolParams;
