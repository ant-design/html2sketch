import { SketchFormat } from '../../index';
import StyleBase from './Base';

/**
 * 图片资产
 */
class Image extends StyleBase {
  constructor(url: string) {
    super();
    this.url = url;
  }
  url: string;

  toSketchJSON(): SketchFormat.FileRef {
    return {
      _class: 'MSJSONFileReference',
      _ref_class: 'MSImageData',
      _ref: `images/${this.url}`,
    };
  }
}

export default Image;
