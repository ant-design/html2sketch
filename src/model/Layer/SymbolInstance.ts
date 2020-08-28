import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../utils';
import BaseLayer, { BaseLayerParams } from '../Base/BaseLayer';

interface SymbolInstanceInitParams extends BaseLayerParams {
  symbolID: string;
}
class SymbolInstance extends BaseLayer {
  constructor({ x, y, width, height, symbolID }: SymbolInstanceInitParams) {
    super(SketchFormat.ClassValue.SymbolInstance, { width, y, x, height });

    this.symbolID = symbolID;
  }

  symbolID: string;

  shouldBreakMaskChain: boolean = false;

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
      isLocked: this.locked,
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
