import FileFormat from '@sketch-hq/sketch-file-format-ts';
import convertAngleToFromAndTo from '../../helpers/convertAngleToFromAndTo';
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
  private _borderOptions: FileFormat.BorderOptions = defaultBorderOptions;
  _fontFamily: string;
  constructor() {
    super();
    this._fontFamily = '';
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

  get opacity() {
    return this._opacity;
  }
  set opacity(opacity: string | number) {
    this._opacity = Number(opacity);
  }

  private _opacity: number = 1;

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
    const { from, to } = convertAngleToFromAndTo(angle);

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
    this._borderOptions = {
      _class: 'borderOptions',
      lineCapStyle: lineCapStyle || FileFormat.LineCapStyle.Butt,
      lineJoinStyle: lineJoinStyle || FileFormat.LineJoinStyle.Miter,
      dashPattern: [dash || 4, spacing || 4],
      isEnabled: true,
    };
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
      borderOptions: this._borderOptions,
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
