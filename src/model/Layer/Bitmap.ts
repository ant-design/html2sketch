import { SketchFormat } from '../../index';
import Base, { BaseLayerParams } from './Base';
import { sketchImage, defaultExportOptions } from '../utils';

interface BitmapInitParams extends BaseLayerParams {
  url: string;
}
class Bitmap extends Base {
  constructor({ url, x, y, width, height }: BitmapInitParams) {
    super({ y, x, height, width });
    this.class = SketchFormat.ClassValue.Bitmap;
    this.url = url;
  }

  url: string;

  /**
   * 转为 Sketch JSON对象
   */
  toSketchJSON = (): SketchFormat.Bitmap => ({
    _class: 'bitmap',
    do_objectID: this.id,
    frame: this.frame.toSketchJSON(),
    style: this.style.toSketchJSON(),
    image: sketchImage(this.url),
    booleanOperation: SketchFormat.BooleanOperation.NA,
    exportOptions: defaultExportOptions,
    clippingMask: [],
    intendedDPI: 32,
    fillReplacesImage: '',
    isFixedToViewport: false,
    sharedStyleID: '',
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: this.isLocked,
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
    userInfo: this.userInfo,
  });
}

export default Bitmap;
