import Base, { BaseLayerParams } from './Base';
import { SketchFormat } from '../../index';

export type SVG = {
  _class: 'svg';
  rawSVGString: string;
  frame: SketchFormat.Rect;
  resizingConstraint: number;
  hasClippingMask: boolean;
};

interface SvgInitParams extends BaseLayerParams {
  rawSVGString: string;
}
/**
 * SVG 对象
 */
class Svg extends Base {
  rawSVGString: string;
  constructor({ x, y, width, height, rawSVGString }: SvgInitParams) {
    super({ height, width, y, x });
    this.class = 'svg';
    this.rawSVGString = rawSVGString;
  }

  toSketchJSON = (): SVG => {
    return {
      _class: 'svg',
      rawSVGString: this.rawSVGString,
      frame: this.frame.toSketchJSON(),
      resizingConstraint: this.resizingConstraint,
      hasClippingMask: this.hasClippingMask,
    };
  };
}

export default Svg;
