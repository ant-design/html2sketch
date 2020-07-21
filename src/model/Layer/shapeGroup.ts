import Base, { BaseLayerParams } from './Base';
import { SketchFormat } from '../../index';
import { defaultExportOptions } from '../utils';

class ShapeGroup extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.ShapeGroup;
  }
  rotation: number;

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
