import type { BaseLayerParams } from '../../types';
import { SketchFormat } from '../../types';
import BaseLayer from '../Base/BaseLayer';
import { defaultExportOptions, defaultRuleData } from '../utils';

type PageInitParams = Pick<BaseLayerParams, 'height' | 'width'>;

class Page extends BaseLayer {
  constructor(params?: PageInitParams) {
    super(SketchFormat.ClassValue.Page, { x: 0, y: 0, ...params });
  }

  toSketchJSON(): SketchFormat.Page {
    return {
      horizontalRulerData: defaultRuleData,
      verticalRulerData: defaultRuleData,
      hasClickThrough: true,
      _class: 'page',
      booleanOperation: SketchFormat.BooleanOperation.None,
      isTemplate: false,
      frame: this.frame.toSketchJSON(),
      exportOptions: defaultExportOptions,
      style: this.style.toSketchJSON(),
      isFixedToViewport: false,
      do_objectID: this.id,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this.locked,
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
