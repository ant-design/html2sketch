import FileFormat from '@sketch-hq/sketch-file-format-ts';
import {
  defaultBorderOptions,
  defaultColorControls,
  defaultContextSettings,
} from '../utils';
import { ColorParam } from './Color';
import StyleBase from './Base';
import Fill from './Fill';
import Shadow from './Shadow';
import InnerShadow from './InnerShadow';
import Border from './Border';
import { FillType } from '@sketch-hq/sketch-file-format-ts/dist/cjs/v3-types';

interface ShadowInput {
  color: ColorParam;
  blur?: number;
  offsetX?: number;
  offsetY?: number;
  spread?: number;
}

const defaultShadowInput: ShadowInput = {
  color: '#000',
  blur: 0,
  offsetX: 0,
  offsetY: 0,
  spread: 0,
};
/**
 * 样式
 */
class Style extends StyleBase {
  constructor() {
    super();
  }

  /**
   * 填充
   **/
  fills: Fill[] = [];

  /**
   * 外阴影
   **/
  shadows: Shadow[] = [];

  /**
   * 内阴影
   **/
  innerShadows: InnerShadow[] = [];

  /**
   * 描边
   **/
  borders: Border[] = [];
  /**
   * Sketch 专属的描边属性
   **/
  sketchBorderOptions: FileFormat.BorderOptions = defaultBorderOptions;

  /**
   * 透明度
   **/
  private _opacity: number = 1;
  get opacity() {
    return this._opacity;
  }
  set opacity(opacity: string | number) {
    this._opacity = Number(opacity);
  }

  /**
   * 添加颜色填充
   **/
  addColorFill(color: ColorParam) {
    const fill = new Fill({
      type: FileFormat.FillType.Color,
      color: color,
    });
    this.fills.push(fill);
  }

  /**
   * 添加渐变填充
   **/
  addGradientFill(angle: string, stops?: ColorParam[]) {
    const { from, to } = this.convertAngleToFromAndTo(angle);

    const fill = new Fill({
      type: FileFormat.FillType.Gradient,
      gradient: {
        from,
        to,
        stops,
        gradientType: FileFormat.GradientType.Linear,
      },
    });

    this.fills.push(fill);
  }

  /**
   * 将角度转为 sketch 中的 from 和 to
   * @param {string} angle 角度
   */
  convertAngleToFromAndTo = (angle: string) => {
    // default 180deg
    const from = { x: 0.5, y: 0 };
    const to = { x: 0.5, y: 1 };

    // Learn math or find someone smarter to figure this out correctly
    switch (angle) {
      case 'to top':
      case '360deg':
      case '0deg':
        from.y = 1;
        to.y = 0;
        break;
      case 'to right':
      case '90deg':
        from.x = 0;
        from.y = 0.5;
        to.x = 1;
        to.y = 0.5;
        break;
      case 'to left':
      case '270deg':
        from.x = 1;
        from.y = 0.5;
        to.x = 0;
        to.y = 0.5;
        break;
      case 'to bottom':
      case '180deg':
      default:
        break;
    }

    return {
      from,
      to,
    };
  };

  /**
   * 添加图片填充
   **/
  addImageFill(image: string) {
    const fill = new Fill({
      type: FileFormat.FillType.Pattern,
      image,
    });

    this.fills.push(fill);
  }

  /**
   * 添加描边
   **/
  addBorder({ color, thickness }: { thickness: number; color: ColorParam }) {
    const border = new Border({
      type: FillType.Color,
      color,
      thickness,
    });

    this.borders.push(border);
  }

  /**
   * 添加阴影
   **/
  addShadow(params = defaultShadowInput) {
    const { color, blur, offsetX, offsetY, spread } = params;

    const shadow = new Shadow({
      blurRadius: blur,
      color,
      offsetX,
      offsetY,
      spread,
    });

    this.shadows.push(shadow);
  }

  /**
   * 添加内阴影
   **/
  addInnerShadow(params = defaultShadowInput) {
    const { color, blur, offsetX, offsetY, spread } = params;

    const shadow = new InnerShadow({
      blurRadius: blur,
      color,
      offsetX,
      offsetY,
      spread,
    });

    this.innerShadows.push(shadow);
  }

  /**
   * 设置描边属性
   **/
  setBorderDashed({
    lineCapStyle,
    lineJoinStyle,
    dash,
    spacing,
  }: {
    lineCapStyle?: FileFormat.LineCapStyle;
    lineJoinStyle?: FileFormat.LineJoinStyle;
    dash?: number;
    spacing?: number;
  } = {}) {
    this.sketchBorderOptions = {
      _class: 'borderOptions',
      lineCapStyle: lineCapStyle || FileFormat.LineCapStyle.Butt,
      lineJoinStyle: lineJoinStyle || FileFormat.LineJoinStyle.Miter,
      dashPattern: [dash || 4, spacing || 4],
      isEnabled: true,
    };
  }

  /**
   * 生成 Sketch JSON 对象
   */
  toSketchJSON = (): FileFormat.Style => {
    return {
      _class: 'style',
      do_objectID: '',
      endMarkerType: FileFormat.MarkerType.OpenArrow,
      miterLimit: 10,
      startMarkerType: FileFormat.MarkerType.OpenArrow,
      windingRule: FileFormat.WindingRule.EvenOdd,
      borderOptions: this.sketchBorderOptions,
      colorControls: defaultColorControls,
      fills: this.fills.map((fill) => fill.toSketchJSON()),
      borders: this.borders.map((b) => b.toSketchJSON()),
      shadows: this.shadows.map((shadow) => shadow.toSketchJSON()),
      innerShadows: this.innerShadows.map((i) => i.toSketchJSON()),
      contextSettings: defaultContextSettings,
    };
  };
}

export default Style;
