/* eslint-disable no-shadow */
import Group from './Layer/Group';
import Svg, { BezierPoint } from './Layer/Svg';
import ShapePath from './Layer/ShapePath';
import Text from './Layer/Text';
import Bitmap from './Layer/Bitmap';
import Rectangle from './Layer/Rectangle';
import ShapeGroup from './Layer/ShapeGroup';
import { FrameType } from './Base/Frame';
import SymbolMaster from './Layer/SymbolMaster';

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
  | Svg;

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

export interface ShapePathType {
  points: BezierPoint[];
  frame: { width: number; height: number; x?: number; y?: number };
  isClose: boolean;
}

export declare enum LayerClassValue {
  Artboard = 'artboard',
  Bitmap = 'bitmap',
  Border = 'border',
  BorderOptions = 'borderOptions',
  Color = 'color',
  Fill = 'fill',
  Gradient = 'gradient',
  Group = 'group',
  InnerShadow = 'innerShadow',
  Oval = 'oval',
  Page = 'page',
  Polygon = 'polygon',
  Rect = 'rect',
  Rectangle = 'rectangle',
  Shadow = 'shadow',
  ShapeGroup = 'shapeGroup',
  ShapePath = 'shapePath',
  Slice = 'slice',
  Star = 'star',
  SymbolInstance = 'symbolInstance',
  SymbolMaster = 'symbolMaster',
  Text = 'text',
  Triangle = 'triangle',
  Svg = 'svg',
}
export type LayerClassType =
  | 'artboard'
  | 'bitmap'
  | 'border'
  | 'borderOptions'
  | 'color'
  | 'fill'
  | 'gradient'
  | 'group'
  | 'innerShadow'
  | 'oval'
  | 'page'
  | 'polygon'
  | 'rect'
  | 'rectangle'
  | 'shadow'
  | 'shapeGroup'
  | 'shapePath'
  | 'slice'
  | 'star'
  | 'symbolInstance'
  | 'symbolMaster'
  | 'text'
  | 'triangle'
  | 'svg';
