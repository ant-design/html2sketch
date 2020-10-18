import Color from './Color';
import BaseStyle from '../Base/BaseStyle';
import { CGPoint, ColorStop, GradientProps, SketchFormat } from '../../types';

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
    const { from, to, stops, type, name, radius } = props;

    if (from) {
      this.from = from;
    }
    if (to) {
      this.to = to;
    }
    if (stops) {
      this.stops = stops.map((stopParam, index) => {
        // 判断是对象类型的 stop 参数
        if (typeof stopParam === 'object' && 'color' in stopParam) {
          return {
            color: new Color(stopParam.color),
            offset: stopParam.offset
              ? stopParam.offset
              : index / (this.stops.length - 1),
          };
        }

        // 不然就是颜色类型的 stop 参数
        return { color: new Color(stopParam) };
      });
    }
    if (type) {
      this.type = type;
    }
    if (type === SketchFormat.GradientType.Radial && radius) {
      this.ellipseLength = radius;
    }
    this.name = name || 'gradient';
  }

  class: 'gradient' = 'gradient';

  /**
   * 起点
   */
  from: CGPoint = { x: 0.5, y: 0 };

  /**
   * 色彩节点
   */
  stops: ColorStop[] = [];

  /**
   * 终点
   */
  to: CGPoint = { x: 0.5, y: 1 };

  /**
   * 渐变类型
   * */
  type: SketchFormat.GradientType = SketchFormat.GradientType.Linear;

  /**
   * 如果是 Radial 渐变,由这个参数控制椭圆长轴
   */
  ellipseLength: number = 1;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Gradient}
   */
  toSketchJSON = (): SketchFormat.Gradient => {
    const { from, to, stops } = this;

    return {
      _class: SketchFormat.ClassValue.Gradient,
      elipseLength: this.ellipseLength,
      from: `{${from.x}, ${from.y}}`,
      gradientType: this.type,
      to: `{${to.x}, ${to.y}}`,
      stops: stops.map(this.getSketchStop),
    };
  };

  /**
   * 将 stop 数组转换为 Sketch 使用的对象
   * */
  getSketchStop = (
    colorStop: ColorStop,
    index: number,
  ): SketchFormat.GradientStop => ({
    _class: 'gradientStop',
    color: colorStop.color.toSketchJSON(),

    position:
      // 如果有 offset 则使用 offset
      colorStop.offset
        ? colorStop.offset
        : // 否则均分
          index / (this.stops.length - 1),
  });
}

export default Gradient;
