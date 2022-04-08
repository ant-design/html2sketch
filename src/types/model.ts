/* eslint-disable no-shadow */
import type { SVGPathData } from 'svg-pathdata';
import type Group from '../models/Layer/Group';
import type Svg from '../models/Layer/Svg';
import type ShapePath from '../models/Layer/ShapePath';
import type Text from '../models/Layer/Text';
import type Ellipse from '../models/Layer/Ellipse';
import type Bitmap from '../models/Layer/Bitmap';
import type Rectangle from '../models/Layer/Rectangle';
import type ShapeGroup from '../models/Layer/ShapeGroup';
import type SymbolMaster from '../models/Layer/SymbolMaster';

/**
 * 定界框 Frame 初始化参数
 */
export type FrameInitParams = Partial<FrameType>;

/**
 * 节点的背景颜色类型
 */
export type BackgroundImageType = {
  type: 'Image' | 'LinearGradient' | 'radialGradient';
  value: any;
};

/**
 * 定界框类型
 */
export interface FrameType {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 基础图层初始化参数
 */
export interface BaseLayerParams {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
}

/**
 * 任意可以成为图层的对象
 */
export type AnyLayer =
  | Group
  | Text
  | Bitmap
  | ShapeGroup
  | Rectangle
  | ShapePath
  | Svg
  | Ellipse;

/**
 * 任意可以成为编组的对象
 */
export type AnyGroup = Group | ShapeGroup | Svg | SymbolMaster;

/**
 * 任意可成为 Shape 的对象 其可以作为 ShapeGroup 的子成员
 * */
export type AnyShape = Rectangle | ShapePath;

/**
 * Shape Group 包含的信息
 */
export interface ShapeGroupType {
  /**
   * 包含的 ShapePath
   */
  shapes: ShapePathType[];
  /**
   * ShapeGroup的 Frame
   */
  frame: FrameType;
}

/**
 * Shape Path 组成类型
 */
export interface ShapePathType {
  points: BezierPoint[];
  frame: { width: number; height: number; x?: number; y?: number };
  isClose: boolean;
}

export type StartPoint = {
  type: typeof SVGPathData.MOVE_TO;
  x: number;
  y: number;
};

export type CurvePoint = {
  type: typeof SVGPathData.CURVE_TO;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x: number;
  y: number;
};

export type LinePoint = {
  type: typeof SVGPathData.LINE_TO;
  x: number;
  y: number;
};

/**
 * 贝塞尔点
 */
export type BezierPoint = StartPoint | CurvePoint | LinePoint;

/* **********    SVG     ************** */
export interface SvgDefsStyle {
  class: 'classStyle';
  rules: CssStyleRule[];
}

export type SvgLayerType =
  | Group
  | ShapeGroup
  | Ellipse
  | Rectangle
  | Text
  | undefined
  | SvgLayerType[];

export interface CssStyleRule {
  className: string;
  styles: Record<string, string>;
}
