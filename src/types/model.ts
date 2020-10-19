/* eslint-disable no-shadow */
import { SVGPathData } from 'svg-pathdata';
import Group from '../models/Layer/Group';
import Svg from '../models/Layer/Svg';
import ShapePath from '../models/Layer/ShapePath';
import Text from '../models/Layer/Text';
import Ellipse from '../models/Layer/Ellipse';
import Bitmap from '../models/Layer/Bitmap';
import Rectangle from '../models/Layer/Rectangle';
import ShapeGroup from '../models/Layer/ShapeGroup';
import SymbolMaster from '../models/Layer/SymbolMaster';

/**
 * 定界框 Frame 初始化参数
 */
export interface FrameInitParams extends Partial<FrameType> {}

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
  styles: { [key: string]: string };
}
