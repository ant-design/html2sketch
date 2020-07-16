import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';

class Group extends Base<FileFormat.Group> {
  constructor({ x, y, width, height, id }: LayerInitParams) {
    super({ id });
    this._class = FileFormat.ClassValue.Group;
    this._x = x || 0;
    this._y = y || 0;
    this._width = width;
    this._height = height;
  }

  protected readonly _width: number;
  protected readonly _height: number;

  setPosition({ x, y }: CGPoint) {
    this._x = x;
    this._y = y;
  }

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this._x,
      y: this._y,
    };

    obj.hasClickThrough = false;
    obj.clippingMaskMode = 0;
    obj.hasClippingMask = false;

    return obj;
  }
}

export default Group;
