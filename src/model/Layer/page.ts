import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { BaseLayerParams } from './Base';
import { defaultRuleData } from '../utils';

interface PageInitParams extends Pick<BaseLayerParams, 'height' | 'width'> {}

class Page extends Base<FileFormat.Page> {
  constructor({ width, height }: PageInitParams) {
    super({ x: 0, y: 0, height, width });
    this.class = FileFormat.ClassValue.Page;
  }

  toSketchJSON() {
    const obj = super.toSketchJSON();

    obj.horizontalRulerData = defaultRuleData();
    obj.verticalRulerData = defaultRuleData();

    obj.hasClickThrough = true;
    obj.includeInCloudUpload = true;

    return obj;
  }
}

export default Page;
