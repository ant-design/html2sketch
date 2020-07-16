import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';

export type SVG = FileFormat.AnyLayer & {
  _class: 'svg';
  rawSVGString: string;
  width: number;
  height: number;
  x: number;
  y: number;
  resizingConstraint: number;
  hasClippingMask: boolean;
};

interface SvgInitParams extends LayerInitParams {
  rawSVGString: string;
}
class Svg extends Base<SVG> {
  private readonly _rawSVGString: string;
  constructor({ x, y, width, height, rawSVGString, id }: SvgInitParams) {
    super({ id });
    this._rawSVGString = rawSVGString;
    this.width = width;
    this.height = height;
    this.x = x || 0;
    this.y = y || 0;
  }

  // @ts-ignore
  toJSON() {
    // NOTE: this is a non-standard extension of the .sketch format

    return {
      _class: 'svg',
      rawSVGString: this._rawSVGString,
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
      resizingConstraint: this._resizingConstraint,
      hasClippingMask: this._hasClippingMask,
    };
  }
}

export default Svg;
