import Base, { BaseLayerParams } from './Base';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../utils';
import { ShapePathType } from './ShapePath';
import { AnyShape } from '../type';

export interface ShapeGroupType {
  shapes: ShapePathType[];
  frame: { width: number; height: number };
}
class ShapeGroup extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.ShapeGroup;
  }
  rotation: number = 0;

  /**
   * ShapeGroup 的 layers 必须是 AnyShape 类型
   */
  layers: AnyShape[] = [];

  /**
   * 转换为 Sketch 对象
   */
  toSketchJSON(): SketchFormat.ShapeGroup {
    return {
      _class: 'shapeGroup',
      booleanOperation: SketchFormat.BooleanOperation.NA,
      do_objectID: this.id,
      layers: this.layers.map((l) => l.toSketchJSON()),
      rotation: this.rotation,
      windingRule: SketchFormat.WindingRule.EvenOdd,
      isVisible: true,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      layerListExpandedType: 0,
      nameIsFixed: false,
      resizingType: 0,
      shouldBreakMaskChain: false,
      clippingMaskMode: 0,
      isLocked: false,
      exportOptions: defaultExportOptions,
      frame: this.frame.toSketchJSON(),
      name: this.name,
      style: this.style.toSketchJSON(),
      resizingConstraint: this.resizingConstraint,
      hasClickThrough: false,
    };
  }
}

export default ShapeGroup;
