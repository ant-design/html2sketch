import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import { GradientType } from '@sketch-hq/sketch-file-format-ts/dist/cjs/v3-types';
import Color, { ColorParam } from './Color';
import BaseStyle from '../Base/BaseStyle';
import { CGPoint } from '../../type';

export interface GradientProps {
  type?: SketchFormat.GradientType;
  to?: CGPoint;
  from?: CGPoint;
  stops?: ColorParam[];
  name?: string;
}

/**
 * 渐变对象
 * */
class Gradient extends BaseStyle {
  constructor(props?: GradientProps) {
    super();
    if (!props) {
      this.name = 'gradient';
      return;
    }
    const { from, to, stops, type, name } = props;

    if (from) {
      this.from = from;
    }
    if (to) {
      this.to = to;
    }
    if (stops) {
      this.stops = stops.map((color) => new Color(color));
    }
    if (type) {
      this.type = type;
    }
    this.name = name || 'gradient';
  }

  /**
   * 起点
   */
  from: CGPoint = { x: 0, y: 0 };

  /**
   * 色彩节点
   */
  stops: Color[] = [];

  /**
   * 终点
   */
  to: CGPoint = { x: 1, y: 0 };

  /**
   * 渐变类型
   * */
  type: SketchFormat.GradientType = GradientType.Linear;

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
   * */
  getSketchStop = (color: Color, index: number): SketchFormat.GradientStop => ({
    _class: 'gradientStop',
    color: color.toSketchJSON(),
    position: index,
  });
}

export default Gradient;
