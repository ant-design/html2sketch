import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../utils';
import Base, { BaseLayerParams } from './Base';

interface SymbolInstanceInitParams extends BaseLayerParams {
  symbolID: string;
}
class SymbolInstance extends Base {
  symbolID: string;
  nameIsFixed: boolean;
  shouldBreakMaskChain: boolean;
  constructor({ x, y, width, height, symbolID }: SymbolInstanceInitParams) {
    super({ width, y, x, height });
    this.class = SketchFormat.ClassValue.SymbolInstance;
    this.symbolID = symbolID;
  }

  toSketchJSON(): SketchFormat.SymbolInstance {
    return {
      _class: 'symbolInstance',
      frame: this.frame.toSketchJSON(),

      booleanOperation: SketchFormat.BooleanOperation.NA,
      do_objectID: this.id,
      symbolID: this.symbolID,
      exportOptions: defaultExportOptions,

      nameIsFixed: this.nameIsFixed,
      shouldBreakMaskChain: this.shouldBreakMaskChain,

      resizingConstraint: 1,
      resizingType: 1,

      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this.isLocked,
      name: this.name,
      rotation: 0,
      layerListExpandedType: SketchFormat.LayerListExpanded.Undecided,
      isVisible: true,
      overrideValues: [],
      scale: 1,
      horizontalSpacing: 0,
      verticalSpacing: 0,
    };
  }
}

export default SymbolInstance;
