import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';
import { defaultRuleData, defaultStyle } from '../model/utils';

class Artboard extends Base<FileFormat.Artboard> {
  constructor({ x, y, width, height, id }: LayerInitParams) {
    super({ id });
    this.class = FileFormat.ClassValue.Artboard;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toJSON() {
    const artboard = super.toJSON();

    artboard.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this.height,
      width: this.width,
      x: this.x,
      y: this.y,
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
