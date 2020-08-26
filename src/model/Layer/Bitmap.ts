import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { BaseLayerParams } from './Base';
import { sketchImage, defaultExportOptions } from '../utils';

interface BitmapInitParams extends BaseLayerParams {
  url: string;
}

/**
 * 图片处理
 * */
class Bitmap extends Base {
  constructor({ url, x, y, width, height }: BitmapInitParams) {
    super(SketchFormat.ClassValue.Bitmap, { y, x, height, width });
    this.url =
      url.indexOf('data:') === 0 ? Bitmap.ensureBase64DataURL(url) : url;
  }

  url: string;

  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Bitmap => ({
    _class: 'bitmap',
    do_objectID: this.id,
    frame: this.frame.toSketchJSON(),
    style: this.style.toSketchJSON(),
    image: sketchImage(this.url),
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
  toSketchRefJSON = (): SketchFormat.FileRef => {
    return {
      _class: 'MSJSONFileReference',
      _ref_class: 'MSImageData',
      _ref: `images/${this.url}`,
    };
  };

  /**
   * 获取成内嵌的 DataURL
   * @param url 网址
   */
  static ensureBase64DataURL = (url: string) => {
    const imageData = url.match(/data:(.+?)(;(.+))?,(.+)/i);

    if (imageData && imageData[3] !== 'base64') {
      // Solve for an NSURL bug that can't handle plaintext data: URLs
      const type = imageData[1];
      const data = decodeURIComponent(imageData[4]);
      const encodingMatch = imageData[3] && imageData[3].match(/^charset=(.*)/);
      let buffer: any;

      if (encodingMatch) {
        // @ts-ignore
        buffer = Buffer.from(data, encodingMatch[1]);
      } else {
        // @ts-ignore
        buffer = Buffer.from(data);
      }

      return `data:${type};base64,${buffer.toString('base64')}`;
    }

    return url;
  };
}

export default Bitmap;
