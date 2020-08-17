import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { BaseLayerParams } from './Base';
import { defaultExportOptions } from '../utils';
import { getGroupLayout, SMART_LAYOUT } from '../../helpers/layout';
import { AnyLayer } from '../type';

class Group extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.Group;
  }

  /**
   * 添加图层
   * @param layer
   */
  addLayer(layer: AnyLayer) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置,得到算出相对位置
    layer.x -= this.x;
    layer.y -= this.y;
    super.addLayer(layer);
  }
  /**
   * Symbol 布局
   */
  groupLayout:
    | SketchFormat.InferredGroupLayout // 水平或垂直布局
    | SketchFormat.FreeformGroupLayout = {
    _class: 'MSImmutableFreeformGroupLayout',
  }; // 自由布局

  /**
   * 设置布局参数
   * @param layoutType
   */
  setGroupLayout(layoutType: keyof typeof SMART_LAYOUT) {
    this.groupLayout = getGroupLayout(layoutType);
  }

  /**
   * 转换为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Group => {
    return {
      _class: 'group',
      do_objectID: this.id,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isVisible: true,
      isLocked: this.isLocked,
      layerListExpandedType: 0,
      name: this.name || this.class,
      nameIsFixed: false,
      resizingConstraint: this.resizingConstraint,
      resizingType: SketchFormat.ResizeType.Stretch,
      rotation: 0,
      shouldBreakMaskChain: false,
      exportOptions: defaultExportOptions,
      frame: this.frame.toSketchJSON(),
      clippingMaskMode: 0,
      hasClippingMask: this.hasClippingMask,
      style: this.style.toSketchJSON(),
      hasClickThrough: false,
      groupLayout: this.groupLayout,
      layers: this.layers.map((layer) => layer.toSketchJSON()),
      userInfo: this.userInfo,
    };
  };
}

export default Group;
