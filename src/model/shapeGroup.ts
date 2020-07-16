import FileFormat from '@sketch-hq/sketch-file-format-ts';

import Base, { LayerInitParams } from './base';
import { CGPoint } from '..';

class ShapeGroup extends Base<FileFormat.ShapeGroup> {
  constructor({ x, y, width, height, id }: LayerInitParams) {
    super({ id });
    this.class = 'shapeGroup';
    this.width = width;
    this.height = height;
    this.setPosition({ x, y });
  }

  setPosition({ x, y }: CGPoint) {
    this.x = x;
    this.y = y;
  }

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this.height,
      width: this.width,
      x: this.x,
      y: this.y,
    };

    obj.hasClickThrough = false;
    obj.windingRule = 1;

    return obj;
  }
}

export default ShapeGroup;
