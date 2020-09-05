import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseStyle from '../Base/BaseStyle';
import { getBase64ImageString } from '../../utils/url';
import { errorBase64Url } from '../../utils/image';

/**
 * 图片资产
 * 用于添加到 Fill 和 Border 的内容
 */
class Image extends BaseStyle {
  constructor(url: string) {
    super();
    this.url = url;
    this.base64 = getBase64ImageString(errorBase64Url)!;
  }

  /**
   * 完成图片资源的初始化
   */
  async init() {
    if (this.url.startsWith('http')) {
      const data = await fetch(this.url);
      const blob = await data.blob();
      const dataURL = await this.blobToBase64(blob);
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

  private blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = (e) => {
        resolve(e?.target?.result as string);
      };
      fileReader.onerror = () => {
        reject(new Error('异常'));
      };
    });

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
