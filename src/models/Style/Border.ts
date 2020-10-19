import Color, { ColorParam } from './Color';
import BaseStyle from '../Base/BaseStyle';
import { CGPoint, SketchFormat } from '../../types';
import { defaultContextSettings } from '../utils';
import Gradient from './Gradient';
import Image from './Image';

export interface BorderProps {
  type: SketchFormat.FillType;
  color?: ColorParam;
  image?: string;
  gradient?: {
    to: CGPoint;
    from: CGPoint;
    gradientType: SketchFormat.GradientType;
    stops: ColorParam[];
  };
  position?: SketchFormat.BorderPosition;
  name?: string;
  thickness?: number;
}

/**
 * 描边对象
 * */
class Border extends BaseStyle {
  constructor(props: BorderProps) {
    super();
    const { type, color, name, image, gradient, position, thickness } = props;

    this.name = name || 'Border';
    this.type = type;

    this.thickness = thickness || 0;
    this.color = new Color(color);
    this.gradient = new Gradient(gradient);

    if (position?.toString()) {
      this.position = position;
    }

    if (image) {
      this.image = new Image(image);
    }
  }

  get opacity() {
    return this.color.alpha;
  }

  /**
   * 颜色填充类型
   * */
  type: SketchFormat.FillType;

  /**
   * 颜色
   */
  color: Color;

  /**
   * 渐变类型
   * */
  gradient: Gradient;

  /**
   * 使用图片进行填充
   * */
  image?: Image;

  /**
   * 描边位置, 默认为内部描边
   * */
  position: SketchFormat.BorderPosition = SketchFormat.BorderPosition.Inside;

  /**
   * 描边宽度 默认为 0
   * */
  thickness: number;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Border}
   */
  toSketchJSON = (): SketchFormat.Border => {
    return {
      _class: SketchFormat.ClassValue.Border,
      isEnabled: true,
      fillType: this.type,
      color: this.color.toSketchJSON(),
      contextSettings: defaultContextSettings,
      gradient: this.gradient.toSketchJSON(),
      position: this.position,
      thickness: this.thickness,
    };
  };
}

export default Border;
