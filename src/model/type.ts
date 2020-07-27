// import { Group, Text, ShapeGroup, Bitmap, Rectangle, ShapePath } from './index';
import Group from '../model/Layer/Group';
import Svg from '../model/Layer/Svg';
import ShapePath from '../model/Layer/ShapePath';
import Text from '../model/Layer/Text';
import Bitmap from '../model/Layer/Bitmap';
import Rectangle from '../model/Layer/Rectangle';
import ShapeGroup from '../model/Layer/ShapeGroup';

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
 **/
export type AnyShape = Rectangle | ShapePath;
