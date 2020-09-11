import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseLayer from '../Base/BaseLayer';
import { defaultExportOptions } from '../utils';
import { getGroupLayout } from '../../utils/layout';
import { AnyLayer } from '../type';
import { GroupLayoutType, BaseLayerParams } from '../../type';

class Group extends BaseLayer {
  constructor(params?: BaseLayerParams) {
    super(SketchFormat.ClassValue.Group, params);
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
  setGroupLayout(layoutType: GroupLayoutType) {
    this.groupLayout = getGroupLayout(layoutType);
  }

  /**
   * 获取 group 子级的尺寸
   */
  getSize() {
    let { width, height } = this;

    if (width === 0 || height === 0) {
      this.layers.forEach((layer) => {
        const layerWidth = layer.x + layer.width;
        const layerHeight = layer.y + layer.height;

        if (width < layerWidth) {
          width = layerWidth;
        }
        if (height < layerHeight) {
          height = layerHeight;
        }
      });
    }

    return { width, height };
  }

  /**
   * 转换为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Group => {
    const groupJSON: SketchFormat.Group = {
      _class: 'group',
      do_objectID: this.id,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isVisible: true,
      isLocked: this.locked,
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
    };

    if (this.userInfo) {
      groupJSON.userInfo = this.userInfo;
    }
    return groupJSON;
  };
}

export default Group;
