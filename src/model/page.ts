import Base, { BaseInitParams, LayerInitParams } from './base';
import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultRuleData, defaultStyle } from './utils';

interface PageInitParams
  extends Pick<LayerInitParams, 'height' | 'id' | 'width'> {}

class Page extends Base<FileFormat.Page> {
  constructor({ width, height, id }: PageInitParams) {
    super({ id });
    this._class = FileFormat.ClassValue.Page;
    this._width = width;
    this._height = height;
  }

  protected readonly _width: number;
  protected readonly _height: number;

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: 0,
      y: 0,
    };

    obj.style = defaultStyle();

    obj.horizontalRulerData = defaultRuleData();
    obj.verticalRulerData = defaultRuleData();

    obj.hasClickThrough = true;
    obj.includeInCloudUpload = true;

    return obj;
  }
}

export default Page;
