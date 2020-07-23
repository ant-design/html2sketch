import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import Color, { ColorParam } from './Color';
import StyleBase from './Base';
import { CGPoint } from '../../index';

export interface GradientProps {
  type?: SketchFormat.GradientType;
  to?: CGPoint;
  from?: CGPoint;
  stops?: ColorParam[];
  name?: string;
}

/**
 * 渐变对象
 **/
class Gradient extends StyleBase {
  constructor(props: GradientProps) {
    super();

    const { from, to, stops, type, name } = props;

    this.from = from;
    this.to = to;
    this.stops = stops.map((color) => new Color(color));
    this.type = type;
    this.name = name || 'gradient';
  }

  /**
   * 起点
   */
  from: CGPoint;
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
  type: SketchFormat.GradientType;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Gradient}
   */
  toSketchJSON = (): SketchFormat.Gradient => {
    const { from, to, stops } = this;

    return {
      _class: SketchFormat.ClassValue.Gradient,
      elipseLength: 0, // 这个字段应该是废弃字段
      from: `{${from.x}, ${from.y}}`,
      gradientType: this.type,
      to: `{${to.x}, ${to.y}}`,
      stops: stops.map(this.getSketchStop),
    };
  };

  /**
   * 将 stop 数组转换为 Sketch 使用的对象
   **/
  getSketchStop = (color: Color, index): SketchFormat.GradientStop => ({
    _class: 'gradientStop',
    color: color.toSketchJSON(),
    position: index,
  });
}

export default Gradient;
