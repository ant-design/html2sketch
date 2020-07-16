import FileFormat from '@sketch-hq/sketch-file-format-ts';

import { getGroupLayout } from '../../helpers/layout';
import Base, { LayerInitParams } from './Base';
import SymbolInstance from './symbolInstance';
import uuid from '../../helpers/uuid';
import { defaultStyle } from '../utils';

interface SymbolMasterInitParams
  extends Omit<LayerInitParams, 'width' | 'height'> {
  width?: number;
  height?: number;
}

class SymbolMaster extends Base<FileFormat.SymbolMaster> {
  constructor({ x, y, width, height, id }: SymbolMasterInitParams) {
    super({ id });
    this.class = 'symbolMaster';
    this.x = x || 0;
    this.y = y || 0;
    this.width = width;
    this.height = height;
    this._symbolID = uuid();
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

  toJSON() {
    const obj = super.toJSON();
    const { width, height } = this.getSize();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      width,
      height,
      x: this.x,
      y: this.y,
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
