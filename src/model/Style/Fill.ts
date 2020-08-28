import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import Color, { ColorParam } from './Color';
import BaseStyle from '../Base/BaseStyle';
import { CGPoint } from '../../type';
import { defaultContextSettings } from '../utils';
import Gradient from './Gradient';
import Image from './Image';

export interface FillProps {
  type?: SketchFormat.FillType;
  color?: ColorParam;
  image?: string;
  gradient?: {
    to: CGPoint;
    from: CGPoint;
    gradientType: SketchFormat.GradientType;
    stops: ColorParam[];
  };
  name?: string;
}

/**
 * 渐变对象
 * */
class Fill extends BaseStyle {
  constructor(props: FillProps) {
    super();
    const { type, color, name, image, gradient } = props;

    this.name = name || 'Fill';
    if (type) {
      this.type = type;
    }

    switch (type) {
      case SketchFormat.FillType.Color:
      default:
        this.color = new Color(color);
        break;
      case SketchFormat.FillType.Gradient:
        this.gradient = new Gradient(gradient);
        break;
      case SketchFormat.FillType.Pattern:
        if (image) {
          this.image = new Image(image);
        }
    }
  }

  /**
   * 填色类型
   * */
  type: SketchFormat.FillType = SketchFormat.FillType.Color;

  /**
   * 颜色
   */
  color: Color = new Color();

  /**
   * 色彩节点
   */
  stops: Color[] = [];

  get opacity() {
    return this.color.alpha;
  }

  /**
   * 终点
   */
  to: CGPoint = { x: 1, y: 0 };

  /**
   * 渐变类型
   * */
  gradient: Gradient = new Gradient();

  /**
   * 使用图片进行填充
   * */
  image?: Image;

  /**
   * 填充类型
   * */
  patternFillType: SketchFormat.PatternFillType =
    SketchFormat.PatternFillType.Fill;

  patternTileScale: number = 1;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Fill}
   */
  toSketchJSON = (): SketchFormat.Fill => {
    const fill: SketchFormat.Fill = {
      _class: SketchFormat.ClassValue.Fill,
      isEnabled: true,
      fillType: this.type,
      color: this.color.toSketchJSON(),
      contextSettings: defaultContextSettings,
      gradient: this.gradient.toSketchJSON(),
      noiseIndex: 0, // 旧版本似乎可以填充噪点
      noiseIntensity: 0,
      patternFillType: this.patternFillType,
      patternTileScale: this.patternTileScale,
    };
    if (this.image) {
      fill.image = this.image.toSketchJSON();
    }

    return fill;
  };

  /**
   * 转为 JSON
   */
  toJSON() {
    return {
      type: this.type,
      color: this.color.toJSON(),
    };
  }
}

export default Fill;
