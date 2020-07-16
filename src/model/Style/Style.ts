import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { makeImageFill } from '../../helpers/image';
import { makeColorFill, makeColorFromCSS } from '../../helpers/color';
import convertAngleToFromAndTo from '../../helpers/convertAngleToFromAndTo';
import {
  defaultBorderOptions,
  defaultColorControls,
  defaultContextSettings,
  defaultGradient,
} from '../utils';
import StyleBase from './Base';

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
    this._fills = [];
    this._borders = [];
    this._shadows = [];
    this._innerShadows = [];
    this._opacity = 1;
    this._fontFamily = '';
  }
  private readonly _innerShadows: FileFormat.InnerShadow[];
  private readonly _fills: FileFormat.Fill[];
  private _opacity: number;
  private readonly _shadows: FileFormat.Shadow[];
  private readonly _borders: FileFormat.Border[];

  addColorFill(color: string, opacity?: number) {
    this._fills.push(makeColorFill(color, opacity));
  }

  addGradientFill({ angle, stops }: any) {
    const { from, to } = convertAngleToFromAndTo(angle);

    const fill: FileFormat.Fill = {
      _class: 'fill',
      isEnabled: true,
      // Not sure why there is a color here
      color: {
        _class: 'color',
        alpha: 1,
        blue: 0.847,
        green: 0.847,
        red: 0.847,
      },
      fillType: 1,
      gradient: {
        _class: 'gradient',
        elipseLength: 0,
        from: `{${from.x}, ${from.y}}`,
        gradientType: 0,
        stops: stops.map((stopColor: any, index: number) => ({
          _class: 'gradientStop',
          color: makeColorFromCSS(stopColor),
          position: index,
        })),
        to: `{${to.x}, ${to.y}}`,
      },
      contextSettings: defaultContextSettings,
      noiseIndex: 0,
      noiseIntensity: 0,
      patternFillType: 1,
      patternTileScale: 1,
    };

    this._fills.push(fill);
  }

  addImageFill(image: string) {
    const fill = makeImageFill(image);

    this._fills.push(fill);
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

  addOpacity(opacity: string | number) {
    this._opacity = Number(opacity);
  }

  /**
   * 生成 Sketch JSON 对象
   */
  toSketchJSON = (): FileFormat.Style => {
    return {
      borderOptions: this._borderOptions,
      colorControls: defaultColorControls,
      do_objectID: '',
      endMarkerType: FileFormat.MarkerType.OpenArrow,
      startMarkerType: FileFormat.MarkerType.OpenArrow,
      windingRule: FileFormat.WindingRule.EvenOdd,
      _class: 'style',
      fills: this._fills,
      borders: this._borders,
      shadows: this._shadows,
      innerShadows: this._innerShadows,
      miterLimit: 10,
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: this._opacity,
      },
    };
  };
}

export default Style;
