import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import Color, { ColorParam } from './Color';
import StyleBase from './Base';
import { CGPoint } from '../../index';
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
 **/
class Fill extends StyleBase {
  constructor(props: FillProps) {
    super();
    const { type, color, name, image, gradient } = props;

    this.name = name || 'Fill';
    this.type = type;

    switch (type) {
      case SketchFormat.FillType.Color:
        this.color = new Color(color);
        break;
      case SketchFormat.FillType.Gradient:
        this.gradient = new Gradient(gradient);
        break;
      case SketchFormat.FillType.Pattern:
        this.image = new Image(image);
    }
  }

  /**
   * 填色类型
   **/
  type: SketchFormat.FillType;
  /**
   * 颜色
   */
  color?: Color;
  /**
   * 色彩节点
   */
  stops: Color[];

  /**
   * 终点
   */
  to: CGPoint;

  /**
   * 渐变类型
   **/
  gradient?: Gradient;

  /**
   * 使用图片进行填充
   **/
  image?: Image;

  /**
   * 填充类型
   **/
  patternFillType: SketchFormat.PatternFillType =
    SketchFormat.PatternFillType.Fill;

  patternTileScale: number = 1;
  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Fill}
   */
  toSketchJSON = (): SketchFormat.Fill => {
    return {
      _class: SketchFormat.ClassValue.Fill,
      isEnabled: true,
      fillType: this.type,
      // TODO 需确认是否可以填充 undefined
      color: this.color && this.color.toSketchJSON(),
      contextSettings: defaultContextSettings,
      // TODO 需确认是否可以填充 undefined
      gradient: this.gradient && this.gradient.toSketchJSON(),
      // TODO 需确认是否可以填充 undefined
      image: this.image && this.image.toSketchJSON(),
      noiseIndex: 0, // 旧版本似乎可以填充噪点
      noiseIntensity: 0,
      patternFillType: this.patternFillType,
      patternTileScale: this.patternTileScale,
    };
  };
}

export default Fill;
