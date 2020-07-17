import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { makeColorFromCSS } from '../../helpers/color';
import convertAngleToFromAndTo from '../../helpers/convertAngleToFromAndTo';
import {
  defaultBorderOptions,
  defaultColorControls,
  defaultContextSettings,
  defaultGradient,
} from '../utils';
import StyleBase from './Base';
import Fill from './Fill';
import { ColorParam } from './Color';

interface ShadowInput {
  color: string;
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
    this._borders = [];
    this._shadows = [];
    this._innerShadows = [];
    this._opacity = 1;
    this._fontFamily = '';
  }
  private readonly _innerShadows: FileFormat.InnerShadow[];
  fills: Fill[] = [];

  get opacity() {
    return this._opacity;
  }
  set opacity(opacity: string | number) {
    this._opacity = Number(opacity);
  }

  private _opacity: number;
  private readonly _shadows: FileFormat.Shadow[];
  private readonly _borders: FileFormat.Border[];

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

  addBorder({ color, thickness }: { thickness: number; color: string }) {
    const broder: FileFormat.Border = {
      _class: 'border',
      isEnabled: true,
      color: makeColorFromCSS(color),
      fillType: FileFormat.FillType.Color,
      position: 1,
      thickness,
      contextSettings: defaultContextSettings,
      gradient: defaultGradient,
    };
    this._borders.push(broder);
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

  addShadow(
    { color, blur, offsetX, offsetY, spread } = {
      color: '#000',
      blur: 1,
      offsetX: 0,
      offsetY: 0,
      spread: 0,
    }
  ) {
    const shadow: FileFormat.Shadow = {
      _class: 'shadow',
      isEnabled: true,
      blurRadius: blur,
      color: makeColorFromCSS(color),
      contextSettings: defaultContextSettings,
      offsetX,
      offsetY,
      spread,
    };

    this._shadows.push(shadow);
  }

  addInnerShadow({
    color,
    blur = 0,
    offsetX = 0,
    offsetY = 0,
    spread = 0,
  } = defaultShadowInput) {
    const shadow: FileFormat.InnerShadow = {
      _class: 'innerShadow',
      isEnabled: true,
      blurRadius: blur,
      color: makeColorFromCSS(color),
      contextSettings: defaultContextSettings,
      offsetX,
      offsetY,
      spread,
    };

    this._innerShadows.push(shadow);
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
      borders: this._borders,
      shadows: this._shadows,
      innerShadows: this._innerShadows,
      contextSettings: defaultContextSettings,
    };
  };
}

export default Style;
