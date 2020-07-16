import { SketchFormat } from '../../index';
import { getGroupLayout } from '../../helpers/layout';
import Base, { BaseLayerParams } from './Base';
import Color from '../Style/Color';
import SymbolInstance from './SymbolInstance';
import uuid from '../../helpers/uuid';
import { defaultExportOptions, defaultRuleData } from '../utils';
import { AnyLayer } from '../type';

class SymbolMaster extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.SymbolMaster;

    this.symbolID = uuid();
    this.groupLayout = getGroupLayout();
  }
  width: any;
  height: any;
  _groupLayout:
    | SketchFormat.InferredGroupLayout
    | SketchFormat.FreeformGroupLayout;
  _symbolID: any;
  backgroundColor: Color;
  shouldBreakMaskChain: boolean;
  nameIsFixed: boolean;
  resizesContent: boolean;
  symbolID: string;
  overrideProperties: SketchFormat.OverrideProperty[];
  groupLayout: any;

  getSymbolInstance({ x, y, width = null, height = null }) {
    // if no size will be requested, use the size of the master symbol
    const { width: masterWidth, height: masterHeight } = this.getSize();

    width = width === null ? masterWidth : width;
    height = height === null ? masterHeight : height;

    return new SymbolInstance({
      x,
      y,
      width,
      height,
      symbolID: this.symbolID,
    });
  }

  addLayer(layer: AnyLayer) {
    //position child layers relatively to the symbol layer
    layer.x -= this.x;
    layer.y -= this.y;
    super.addLayer(layer);
  }

  getSize() {
    let width = this.width;
    let height = this.height;

    // if width and height were not explicitly set, fit symbol size to its contents
    if (this.width === null || this.height === null) {
      //@ts-ignore
      this._layers.forEach((layer) => {
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

  setGroupLayout(layoutType) {
    this._groupLayout = getGroupLayout(layoutType);
  }

  toSketchJSON = (): SketchFormat.SymbolMaster => {
    return {
      _class: 'symbolMaster',
      frame: this.frame.toSketchJSON(),
      allowsOverrides: true,

      backgroundColor: this.backgroundColor.toSketchJson(),
      booleanOperation: SketchFormat.BooleanOperation.NA,
      changeIdentifier: 0,
      do_objectID: this.id,
      symbolID: this.symbolID,
      exportOptions: defaultExportOptions,

      hasClickThrough: true,
      includeInCloudUpload: true,
      hasBackgroundColor: false,
      includeBackgroundColorInExport: true,
      resizesContent: false,
      includeBackgroundColorInInstance: false,
      nameIsFixed: this.nameIsFixed,
      shouldBreakMaskChain: this.shouldBreakMaskChain,
      horizontalRulerData: defaultRuleData(),
      verticalRulerData: defaultRuleData(),

      resizingConstraint: 1,
      resizingType: 1,

      groupLayout: this.groupLayout,
      isFixedToViewport: false,
      sharedStyleID: '',

      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this.isLocked,
      isFlowHome: false,
      name: this.name,
      rotation: 0,
      layerListExpandedType: SketchFormat.LayerListExpanded.Undecided,
      overrideProperties: [],
      layers: this.layers.map((l) => l.toSketchJSON()),
      isVisible: true,
    };
  };
}

export default SymbolMaster;
