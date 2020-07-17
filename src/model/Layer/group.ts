import { SketchFormat } from '../../index';
import Base, { BaseLayerParams } from './Base';
import { defaultExportOptions } from '../utils';
import { getGroupLayout } from '../../helpers/layout';
class Group extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.Group;
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
      sharedStyleID: '',
      style: this.style.toSketchJSON(),
      hasClickThrough: false,
      groupLayout: getGroupLayout(),
      layers: this.layers.map((layer) => layer.toSketchJSON()),
      userInfo: this.userInfo,
    };
  };
}

export default Group;
