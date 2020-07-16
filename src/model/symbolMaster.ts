import FileFormat from '@sketch-hq/sketch-file-format-ts';

import { getGroupLayout } from '../helpers/layout';
import Base, { LayerInitParams } from './base';
import SymbolInstance from './symbolInstance';
import { generateID } from '@/common/utils';
import { defaultStyle } from './utils';

interface SymbolMasterInitParams
  extends Omit<LayerInitParams, 'width' | 'height'> {
  width?: number;
  height?: number;
}

class SymbolMaster extends Base<FileFormat.SymbolMaster> {
  constructor({ x, y, width, height, id }: SymbolMasterInitParams) {
    super({ id });
    this._class = 'symbolMaster';
    this._x = x || 0;
    this._y = y || 0;
    this._width = width;
    this._height = height;
    this._symbolID = generateID();
    this._groupLayout = getGroupLayout();
  }
  private _symbolID: string;
  overrideProperties: FileFormat.OverrideProperty[];
  private _groupLayout: any;

  setId(id: string) {
    this._symbolID = id;
  }

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
      symbolID: this._symbolID,
    });
  }

  addLayer(layer: any) {
    //position child layers relatively to the symbol layer
    layer._x -= this._x;
    layer._y -= this._y;

    super.addLayer(layer);
  }

  getSize() {
    let width = this._width;
    let height = this._height;

    // if width and height were not explicitly set, fit symbol size to its contents
    if (this._width === null || this._height === null) {
      this._layers.forEach((layer) => {
        const layerWidth = layer._x + layer._width;
        const layerHeight = layer._y + layer._height;

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

  toJSON() {
    const obj = super.toJSON();
    const { width, height } = this.getSize();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      width,
      height,
      x: this._x,
      y: this._y,
    };

    obj.style = defaultStyle();

    obj.horizontalRulerData = {
      _class: 'rulerData',
      base: 0,
      guides: [],
    };

    obj.verticalRulerData = {
      _class: 'rulerData',
      base: 0,
      guides: [],
    };

    obj.backgroundColor = {
      _class: 'color',
      alpha: 1,
      blue: 1,
      green: 1,
      red: 1,
    };

    obj.hasClickThrough = true;
    obj.includeInCloudUpload = true;
    obj.hasBackgroundColor = false;
    obj.includeBackgroundColorInExport = true;
    obj.resizesContent = false;
    obj.includeBackgroundColorInInstance = false;
    obj.symbolID = this._symbolID;
    obj.changeIdentifier = 0;
    obj.groupLayout = this._groupLayout;

    return obj;
  }
}

export default SymbolMaster;
