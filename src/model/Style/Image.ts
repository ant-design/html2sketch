import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseStyle from '../Base/BaseStyle';
import {
  blobToBase64,
  initImageURL,
  getBase64ImageString,
} from '../../utils/image';

/**
 * 图片资产
 * 用于添加到 Fill 和 Border 的内容
 */
class Image extends BaseStyle {
  constructor(url: string) {
    super();
    const { url: safeURL, base64 } = initImageURL(url);
    this.url = safeURL;
    this.base64 = base64;
  }

  /**
   * 完成图片资源的初始化
   */
  async init() {
    if (this.url.startsWith('http')) {
      const data = await fetch(this.url);
      const blob = await data.blob();
      const dataURL = await blobToBase64(blob);
      const base64 = getBase64ImageString(dataURL);
      if (base64) {
        this.base64 = base64;
      }
    }
  }

  /**
   * 外部传入的 URL
   */
  url: string;

  /**
   * 转换成的 base64 数据
   */
  base64: string;

  toSketchJSON(): SketchFormat.DataRef {
    return {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: this.id,
      data: {
        _data: this.base64,
      },
      sha1: {
        _data: '',
      },
    };
  }
}

export default Image;
