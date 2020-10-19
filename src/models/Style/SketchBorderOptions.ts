import { SketchFormat } from '../../types';

const { LineJoinStyle, LineCapStyle } = SketchFormat;
/**
 * 描边参数项
 * */
class SketchBorderOptions {
  constructor(dashArr?: number[]) {
    this.dashPattern = dashArr || [];
  }

  class = 'borderOptions';

  isEnabled = true;

  dashPattern: number[];

  lineCap: SketchFormat.LineCapStyle = LineCapStyle.Butt;

  lineJoin: SketchFormat.LineJoinStyle = LineJoinStyle.Miter;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.BorderOptions}
   */
  toSketchJSON = (): SketchFormat.BorderOptions => {
    return {
      _class: 'borderOptions',
      isEnabled: this.isEnabled,
      dashPattern: this.dashPattern,
      lineCapStyle: this.lineCap,
      lineJoinStyle: this.lineJoin,
    };
  };
}

export default SketchBorderOptions;
