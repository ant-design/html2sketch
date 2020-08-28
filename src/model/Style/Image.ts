import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseStyle from '../Base/BaseStyle';

/**
 * 图片资产
 */
class Image extends BaseStyle {
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
