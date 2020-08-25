import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { ResizingConstraint, GroupLayoutType } from '../helpers/layout';
import { AnyLayer } from '../model/type';
import { Group, SymbolMaster, Text } from '../model';
import {
  TextHorizontalAlign,
  TextVerticalAlign,
} from '../model/Style/TextStyle';

export interface TextParam {
  textBehaviour?: SketchFormat.TextBehaviour;
  verticalAlign?: TextVerticalAlign;
  horizontalAlign?: TextHorizontalAlign;
}

export interface SymbolAdjustParams {
  selector: {
    type: 'classname' | 'class' | 'name' | 'text' | 'tag';
    value: string;
  };
  resizing?: ResizingConstraint[];
  layout?: GroupLayoutType;
  text?: TextParam;
}

/**
 * 调整图层类型的布局模式
 * @param layer 图层对象
 * @param layout 布局类型
 */
const adjustGroupLayout = (layer: AnyLayer, layout: GroupLayoutType) => {
  if (layer.class !== 'group') return;

  if (layout) {
    (layer as Group).setGroupLayout(layout);
  }
};

/**
 * 调整图层类型的布局模式
 * @param layer 图层对象
 * @param resizing 调整尺寸类型
 */
const adjustResizing = (layer: AnyLayer, resizing: ResizingConstraint[]) => {
  layer.setResizingConstraint(...resizing);
};

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
 * @param layer
 * @param layout
 * @param resizing
 */
const adjust = (
  layer: AnyLayer,
  {
    layout,
    resizing,
  }: { resizing?: ResizingConstraint[]; layout?: GroupLayoutType },
) => {
  if (layout) {
    adjustGroupLayout(layer, layout);
  }
  if (resizing) {
    adjustResizing(layer, resizing);
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
  if (!params) return;

  // 对每个传进来的参数进行调教
  params.forEach((param) => {
    const { layout, resizing, selector, text } = param;

    switch (selector?.type) {
      case 'class':
        if (layer.class === selector.value) {
          adjust(layer, { resizing, layout });
        }
        break;
      case 'classname':
        if (layer.className?.includes(selector.value)) {
          adjust(layer, { resizing, layout });
        }
        break;
      case 'name':
        if (layer.name === selector.value) {
          adjust(layer, { resizing, layout });
        }
        break;
      case 'text':
        if (layer.class === 'text') {
          if ((layer as Text).text.includes(selector.value)) {
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
};

/**
 * 调整 Symbol 的 Layout
 * @param symbol
 * @param groupLayouts
 */
const adjustSymbolLayout = (
  symbol: SymbolMaster,
  groupLayouts?: SymbolAdjustParams[],
) => {
  if (symbol.class !== 'symbolMaster') {
    throw Error('传入对象不是 Symbol 对象,请检查!');
  }
  symbol.layers.forEach((l) => adjustGroupLayer(l, groupLayouts));
};

export default adjustSymbolLayout;
