import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import ColorCls from 'color';
import BaseStyle from '../Base/BaseStyle';

export declare type ColorType = {
  r: number;
  g?: number;
  b?: number;
  a?: number;
  swatchID?: string;
};

export type ColorParam =
  // Color 对象
  | ColorType
  // HEX值
  | string
  // 序号
  | number
  // 数组-> [r,g,b,a]
  | number[];

/**
 * @class
 * 创建颜色类型
 * @constructor 入参 {ColorParam}
 */
class Color extends BaseStyle {
  red: number;

  green: number;

  blue: number;

  alpha: number;

  method: ColorCls;

  constructor(color?: ColorParam) {
    super();
    if (!color) {
      this.method = ColorCls('#fff');
    }
    if (color instanceof Array) {
      this.method = ColorCls.rgb(color);
    } else {
      this.method = ColorCls(color);
    }

    this.alpha = this.method.alpha();
    this.blue = this.method.blue();
    this.green = this.method.green();
    this.red = this.method.red();

    this.name = this.method.hex();
  }

  /**
   * HEX值
   */
  get hex(): string {
    return this.method.hex();
  }

  /**
   * 色值
   */
  get hue(): number {
    return this.method.hue();
  }

  /**
   * 默认的饱和度
   */
  get s(): number {
    return this.method.saturationv();
  }

  /**
   * 默认的饱和度
   */
  get saturation(): number {
    return this.method.saturationv();
  }

  /**
   * 明度值下的饱和度
   */
  get saturationv(): number {
    return this.method.saturationv();
  }

  /**
   * 亮度值下的饱和度
   */
  get saturationl(): number {
    return this.method.saturationl();
  }

  /**
   * 亮度值
   */
  get l(): number {
    return this.method.l();
  }

  /**
   * 亮度值
   */
  get lightness(): number {
    return this.method.lightness();
  }

  /**
   * 明度值
   */
  get b(): number {
    return this.method.b();
  }

  /**
   * 明度值
   */
  get value(): number {
    return this.method.value();
  }

  /**
   * 明度值
   */
  get brightness(): number {
    return this.method.value();
  }

  /**
   * 转为 Sketch JSON对象
   * @returns {SketchFormat.Color} color json
   */
  toSketchJSON = (): SketchFormat.Color => {
    return {
      _class: 'color',
      red: this.red / 255,
      green: this.green / 255,
      blue: this.blue / 255,
      alpha: this.alpha,
    };
  };

  toJSON(): ColorType {
    return {
      r: this.red,
      g: this.green,
      b: this.blue,
      a: this.alpha,
    };
  }
}

export default Color;
