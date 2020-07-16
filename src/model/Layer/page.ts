import Base, { BaseLayerParams } from './Base';
import { defaultRuleData, defaultExportOptions } from '../utils';
import { SketchFormat } from '../../index';

interface PageInitParams extends Pick<BaseLayerParams, 'height' | 'width'> {}

class Page extends Base {
  constructor({ width, height }: PageInitParams) {
    super({ x: 0, y: 0, height, width });
    this.class = SketchFormat.ClassValue.Page;
  }

  toSketchJSON(): SketchFormat.Page {
    return {
      horizontalRulerData: defaultRuleData(),
      verticalRulerData: defaultRuleData(),
      hasClickThrough: true,
      includeInCloudUpload: true,
      _class: 'page',
      booleanOperation: SketchFormat.BooleanOperation.NA,
      frame: this.frame.toSketchJSON(),
      exportOptions: defaultExportOptions,
      style: this.style.toSketchJSON(),
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
  }
}

export default Page;
