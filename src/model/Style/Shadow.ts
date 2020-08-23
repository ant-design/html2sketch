import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultContextSettings } from '../utils';
import Color, { ColorParam } from './Color';
import StyleBase from './Base';

export interface ShadowProps {
  color?: ColorParam;
  blurRadius?: number;
  offsetX?: number;
  offsetY?: number;
  spread?: number;
  contextSettings?: SketchFormat.GraphicsContextSettings;
  name?: string;
}

class Shadow extends StyleBase {
  constructor(props: ShadowProps) {
    super();
    const {
      blurRadius,
      color,
      offsetX,
      offsetY,
      contextSettings,
      spread,
    } = props;
    this.color = new Color(color);
    this.blurRadius = blurRadius || 4;
    this.offsetX = offsetX || 0;
    this.offsetY = offsetY || 2;
    this.spread = spread || 0;
    this.contextSettings = contextSettings || {
      _class: 'graphicsContextSettings',
      blendMode: SketchFormat.BlendMode.Normal,
      opacity: 1,
    };
    this.name = `${this.color.hex} ${this.offsetX}px ${this.offsetY}px ${this.blurRadius}px`;
  }

  /**
   * 颜色
   */
  color: Color;

  /**
   * 模糊半径
   */
  blurRadius: number;

  /**
   * X 轴偏移
   */
  offsetX: number;

  /**
   * Y 轴偏移
   */
  offsetY: number;

  /**
   * 扩散效果
   */
  spread: number;

  /**
   * 渲染上下文
   */
  contextSettings: SketchFormat.GraphicsContextSettings;

  /**
   * 是否启用
   */
  isEnabled: boolean = true;

  /**
   * 分割阴影字符串
   * @param boxShadow
   */
  static splitShadowString = (boxShadow: string) => {
    return boxShadow
      .split(/x, |t, /)
      .map((str, i, array) => {
        if (i + 1 < array.length) {
          if (str.match(/inse$/)) {
            return `${str}t`;
          }
          if (str.match(/p$/)) {
            return `${str}x`;
          }
        }
        return str;
      })
      .filter((shadow) => shadow.length > 0);
  };

  /**
   * 将阴影字符串转为对象
   * @param shadowString
   */
  static shadowStringToObject = (shadowString: string) => {
    const matches = shadowString.match(
      /^([a-z0-9#., ()]+) ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ([-]?[0-9.]+)px ?(inset)?$/i,
    );

    if (matches && matches.length === 7) {
      return {
        color: matches[1],
        offsetX: parseFloat(matches[2]),
        offsetY: parseFloat(matches[3]),
        blur: parseFloat(matches[4]),
        spread: parseFloat(matches[5]),
        inset: matches[6] !== undefined,
      };
    }
  };

  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Shadow => {
    const { offsetY, offsetX, blurRadius, color, spread } = this;
    return {
      _class: SketchFormat.ClassValue.Shadow,
      isEnabled: true,
      blurRadius,
      color: color.toSketchJSON(),
      contextSettings: defaultContextSettings,
      offsetX,
      offsetY,
      spread,
    };
  };
}

export default Shadow;
