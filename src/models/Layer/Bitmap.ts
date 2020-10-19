import BaseLayer from '../Base/BaseLayer';
import { defaultExportOptions } from '../utils';
import { uuid } from '../../utils/utils';

import {
  blobToBase64,
  initImageURL,
  getBase64ImageString,
} from '../../utils/image';
import { BaseLayerParams, SketchFormat } from '../../types';

interface BitmapInitParams extends BaseLayerParams {
  url: string;
}

/**
 * 图片处理
 * */
class Bitmap extends BaseLayer {
  constructor({ url, x, y, width, height }: BitmapInitParams) {
    super(SketchFormat.ClassValue.Bitmap, { y, x, height, width });
    if (!url) {
      throw Error('没有传入 URL 请检查参数');
    }
    const { url: safeURL, base64 } = initImageURL(url);

    this.url = safeURL;
    this.base64 = base64;
  }

  /**
   * 线上 url
   */
  url: string;

  /**
   * 转换成的 base64 数据
   */
  base64: string;

  /**
   * 针对 http的 url 进行资源的初始化
   */
  async init() {
    if (!this.url.startsWith('http')) return;

    try {
      const data = await fetch(this.url);
      const blob = await data.blob();
      const dataURL = await blobToBase64(blob);
      const base64 = getBase64ImageString(dataURL);
      if (base64) {
        this.base64 = base64;
      }
    } catch (e) {
      console.warn('网络或图片资源可能存在问题...');
    }
  }

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
    return {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: `images/${uuid()}`,
      data: {
        _data: this.base64,
      },
      sha1: {
        _data: '',
      },
    };
  };
}

export default Bitmap;
