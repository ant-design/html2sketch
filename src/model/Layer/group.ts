import { SketchFormat } from '../../index';
import Base, { BaseLayerParams } from './Base';
import { defaultExportOptions } from '../utils';

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
      booleanOperation: SketchFormat.BooleanOperation.NA,
      frame: this.frame.toSketchJSON(),
      exportOptions: defaultExportOptions,
      style: this.style.toSketchJSON(),
      hasClickThrough: false,
      isFixedToViewport: false,
      sharedStyleID: '',
      do_objectID: this.id,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this.isLocked,
      isVisible: true,
      layerListExpandedType: 0,
      name: this.name || this.class,
      nameIsFixed: false,
      resizingConstraint: this.resizingConstraint,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      layers: this.layers.map((layer) => layer.toSketchJSON()),
      clippingMaskMode: 0,
      hasClippingMask: this.hasClippingMask,
      userInfo: this.userInfo,
    };
  };
}

export default Group;
