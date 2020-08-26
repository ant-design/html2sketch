import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultContextSettings } from '../utils';
import Color, { ColorParam } from './Color';
import StyleBase from './Base';

export interface InnerShadowProps {
  color?: ColorParam;
  blurRadius?: number;
  offsetX?: number;
  offsetY?: number;
  spread?: number;
  contextSettings?: SketchFormat.GraphicsContextSettings;
  name?: string;
}

class InnerShadow extends StyleBase {
  constructor(props: InnerShadowProps) {
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

    this.blurRadius = blurRadius || 0;
    this.offsetX = offsetX || 0;
    this.offsetY = offsetY || 0;
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
  isEnabled: boolean = false;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.InnerShadow}
   */
  toSketchJSON = (): SketchFormat.InnerShadow => {
    const { offsetY, offsetX, blurRadius, color, spread } = this;
    return {
      _class: SketchFormat.ClassValue.InnerShadow,
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

export default InnerShadow;
