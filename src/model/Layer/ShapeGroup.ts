import Base, { BaseLayerParams } from './Base';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../utils';
import { ShapePathType } from './ShapePath';
import { AnyShape } from '../type';
import { FrameType } from '../Frame';

export interface ShapeGroupType {
  shapes: ShapePathType[];
  frame: FrameType;
}
class ShapeGroup extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.ShapeGroup;
  }

  /**
   * 旋转角度
   */
  rotation: number = 0;

  /**
   * ShapeGroup 的 layers 必须是 AnyShape 类型
   */
  layers: AnyShape[] = [];

  /**
   * 填充规则
   * @see https://www.yuque.com/arvinxx/fontend/7ad6671c-d309-40fc-a0a8-55888f508289
   */
  windingRule = SketchFormat.WindingRule.EvenOdd; // 默认采用奇偶环绕规则

  /**
   * 添加图层
   * @param layer
   */
  addLayer(layer: AnyShape) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置,得到算出相对位置
    layer.x -= this.x;
    layer.y -= this.y;
    super.addLayer(layer);
  }
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
      windingRule: this.windingRule,
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
