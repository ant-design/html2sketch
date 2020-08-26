import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { SymbolMaster } from './model';
import { ResizingConstraint } from './utils/layout';
import {
  TextHorizontalAlign,
  TextVerticalAlign,
} from './model/Style/TextStyle';

// *** 统一的类型定义收口文件 *** //
export * from './model/type';

/**
 * 获得 CG 点的配置
 */
export interface CGPoint {
  x: number;
  y: number;
}

/**
 * group 或 symbol 的 layout 参数类型
 */
export type GroupLayoutType =
  | 'BOTTOM_TO_TOP'
  | 'HORIZONTALLY_CENTER'
  | 'VERTICALLY_CENTER'
  | 'RIGHT_TO_LEFT'
  | 'LEFT_TO_RIGHT'
  | 'TOP_TO_BOTTOM'
  | 'NONE';

/**
 * 对 symbol 进行自定义处理的方法
 */
export type HandleSymbolFn = (symbol: SymbolMaster) => void;

export interface DefaultSymbolParams {
  symbolName?: string;
  /**
   * symbol 本身的 layout
   */
  symbolLayout?: GroupLayoutType;
  /**
   * symbol 内部的图层配置项
   */
  layerParams: SymbolAdjustParams[];
}

export enum LayerSelectorMatchMethod {
  Equal,
  Included,
}

/**
 * 对 symbol 的相关配置项调整的参数
 */
export interface SymbolAdjustParams {
  /**
   * 选择器
   */
  selector: {
    type: 'classname' | 'class' | 'name' | 'text' | 'tag';
    value: string;
    match?: LayerSelectorMatchMethod;
  };
  /**
   * sketch 的调整参数
   */
  resizing?: ResizingConstraint[];
  /**
   * symbol 内 group 的布局类型
   */
  layout?: GroupLayoutType;
  /**
   * symbol 内文本的配置参数
   */
  text?: TextParam;
}

/**
 * 文本对象的配置项
 */
export interface TextParam {
  textBehaviour?: SketchFormat.TextBehaviour;
  verticalAlign?: TextVerticalAlign;
  horizontalAlign?: TextHorizontalAlign;
}

/**
 * nodeToSketchSymbol 配置项
 */
export interface NodeToSketchSymbolOptions {
  /**
   * symbol 自己的 layout 类型
   */
  symbolLayout?: GroupLayoutType;
  /**
   * 如果需要对 symbol 进行调整处理
   * 传入这个方法
   */
  handleSymbol?: HandleSymbolFn;
  /**
   * symbol 内部图层的配置项
   */
  layerParams?: SymbolAdjustParams[];
}
