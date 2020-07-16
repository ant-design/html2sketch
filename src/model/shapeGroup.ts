import FileFormat from '@sketch-hq/sketch-file-format-ts';

import Base, { LayerInitParams } from './base';

class ShapeGroup extends Base<FileFormat.ShapeGroup> {
  constructor({ x, y, width, height, id }: LayerInitParams) {
    super({ id });
    this._class = 'shapeGroup';
    this._width = width;
    this._height = height;
    this.setPosition({ x, y });
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
    obj.windingRule = 1;

    return obj;
  }
}

export default ShapeGroup;
