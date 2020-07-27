import Base, { BaseLayerParams } from './Base';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../utils';
import ShapePath, { ShapePathType } from './ShapePath';
import { FrameType } from '../Frame';
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
  layers: ShapePath[] = [];

  /**
   * 填充规则
   * @see https://www.yuque.com/arvinxx/fontend/7ad6671c-d309-40fc-a0a8-55888f508289
   */
  windingRule = SketchFormat.WindingRule.EvenOdd; // 默认采用奇偶环绕规则

  /**
   * 添加图层
   * @param layer
   */
  addLayer(layer: ShapePath) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置,得到算出相对位置
    layer.x -= this.x;
    layer.y -= this.y;
    super.addLayer(layer);
  }

  /**
   * 批量添加图层
   * @param layers
   */
  addLayers(layers: ShapePath[]) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置,得到算出相对位置
    for (const layer of layers) {
      this.addLayer(layer);
    }
  }
  /**
   * 转换为 Sketch 对象
   */
  toSketchJSON(): SketchFormat.ShapeGroup | SketchFormat.ShapePath {
    if (this.layers.length === 1) {
      const layer = this.layers[0];
      // 恢复 layer 的相对坐标关系
      layer.x += this.x;
      layer.y += this.y;
      // 下传 style 样式
      layer.style = this.style;
      return layer.toSketchJSON();
    } else
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
        name: this.name || this.class,
        style: this.style.toSketchJSON(),
        resizingConstraint: this.resizingConstraint,
        hasClickThrough: false,
      };
  }
}

export default ShapeGroup;
