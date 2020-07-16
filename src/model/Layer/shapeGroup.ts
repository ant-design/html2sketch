import Base, { BaseLayerParams } from './Base';
import { SketchFormat } from '../../index';

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
    };
  }
}

export default ShapeGroup;
