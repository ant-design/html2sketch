import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseStyle from '../Base/BaseStyle';

/**
 * 图片资产
 * 用于添加到 Fill 和 Border 的内容
 */
class Image extends BaseStyle {
  constructor(url: string) {
    super();
    this.url = url;
  }

  /**
   * 外部传入的 URL
   */
  url?: string;

  /**
   * 转换成的 base64 数据
   */
  base64?: string;

  toSketchJSON(): SketchFormat.DataRef {
    return {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: this.id,
      data: {
        _data: this.id,
      },
      sha1: {
        _data: '',
      },
    };
  }
}

export default Image;
