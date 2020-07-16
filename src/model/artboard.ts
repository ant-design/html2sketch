import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';
import {
  defaultRuleData,
  defaultStyle,
} from '../model/utils';

class Artboard extends Base<FileFormat.Artboard> {
  constructor({ x, y, width, height, id }: LayerInitParams) {
    super({ id });
    this._class = FileFormat.ClassValue.Artboard;
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }
  protected readonly _width: number;
  protected readonly _height: number;

  toJSON() {
    const artboard = super.toJSON();

    artboard.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this._x,
      y: this._y,
    };

    artboard.style = defaultStyle();

    artboard.horizontalRulerData = defaultRuleData();
    artboard.verticalRulerData = defaultRuleData();

    artboard.hasClickThrough = true;
    artboard.includeInCloudUpload = true;

    return artboard;
  }
}

export default Artboard;
