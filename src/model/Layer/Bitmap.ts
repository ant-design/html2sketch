import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseLayer, { BaseLayerParams } from '../Base/BaseLayer';
import { defaultExportOptions } from '../utils';
import { getBase64ImageString } from '../../utils/url';
import { uuid } from '../../utils/utils';

interface BitmapInitParams extends BaseLayerParams {
  url: string;
}

/**
 * 图片处理
 * */
class Bitmap extends BaseLayer {
  constructor({ url, x, y, width, height }: BitmapInitParams) {
    super(SketchFormat.ClassValue.Bitmap, { y, x, height, width });
    this.url =
      url.indexOf('data:') === 0 ? Bitmap.ensureBase64DataURL(url) : url;
  }

  /**
   * base64 的
   */
  url: string;

  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Bitmap => ({
    _class: 'bitmap',
    do_objectID: this.id,
    frame: this.frame.toSketchJSON(),
    style: this.style.toSketchJSON(),
    image: this.toSketchImageJSON(),
    booleanOperation: SketchFormat.BooleanOperation.NA,
    exportOptions: defaultExportOptions,
    clippingMask: '',
    intendedDPI: 32,
    fillReplacesImage: false,
    isFixedToViewport: false,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: this.locked,
    isVisible: true,
    layerListExpandedType: 0,
    name: this.name || this.class,
    nameIsFixed: false,
    resizingConstraint: this.resizingConstraint,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    clippingMaskMode: 0,
    hasClippingMask: this.hasClippingMask,
  });

  /**
   * 转换为 Sketch 引用 JSON 对象
   * */
  toSketchImageJSON = (): SketchFormat.DataRef => {
    const base64 = getBase64ImageString(this.url);
    if (!base64) throw Error('不正确的图像网址');
    return {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: `images/${uuid()}`,
      data: {
        _data: base64,
      },
      sha1: {
        _data: '',
      },
    };
  };

  /**
   * 将传入的 data:类型的数值 转成 Base64 类型的字符串
   * @param url
   */
  static ensureBase64DataURL = (url: string) => {
    const imageData = url.match(/data:(.+?)(;(.+))?,(.+)/i);

    // 确保传入的 data:类型的参数都是 base64 的
    if (imageData && imageData[3] !== 'base64') {
      // Solve for an NSURL bug that can't handle plaintext data: URLs
      const type = imageData[1];
      const data = decodeURIComponent(imageData[4]);
      const encodingMatch = imageData[3] && imageData[3].match(/^charset=(.*)/);
      let buffer: Buffer;

      if (encodingMatch) {
        // @ts-ignore
        buffer = Buffer.from(data, encodingMatch[1]);
      } else {
        buffer = Buffer.from(data);
      }

      return `data:${type};base64,${buffer.toString('base64')}`;
    }

    return url;
  };
}

export default Bitmap;
