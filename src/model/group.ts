import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';
import { CGPoint } from '..';

class Group extends Base<FileFormat.Group> {
  constructor({ x, y, width, height, id }: LayerInitParams) {
    super({ id });
    this.class = FileFormat.ClassValue.Group;
    this.x = x || 0;
    this.y = y || 0;
    this.width = width;
    this.height = height;
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
    obj.clippingMaskMode = 0;
    obj.hasClippingMask = false;

    return obj;
  }
}

export default Group;
