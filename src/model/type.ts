import Group from './Layer/Group';
import Svg from './Layer/Svg';
import ShapePath from './Layer/ShapePath';
import Text from './Layer/Text';
import Bitmap from './Layer/Bitmap';
import Rectangle from './Layer/Rectangle';
import ShapeGroup from './Layer/ShapeGroup';

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
 * 任意可成为 Shape 的对象 其可以作为 ShapeGroup 的子成员
 * */
export type AnyShape = Rectangle | ShapePath;
