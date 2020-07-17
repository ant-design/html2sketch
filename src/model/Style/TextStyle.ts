import { SketchFormat } from '../../index';
import Color from './Color';

const SYSTEM_FONTS = [
  // Apple
  '-apple-system',
  'BlinkMacSystemFont',

  // Microsoft
  'Segoe UI',

  // Android
  'Roboto',
];

// INPUT: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif
// OUTPUT: Helvetica Neue
function getFirstFont(fonts: string, skipSystemFonts?: boolean) {
  let regularFont: string | null = null;
  let systemFont: string | null = null;

  fonts.split(',').forEach((font) => {
    font = font.trim().replace(/^["']+|["']+$/g, '');
    if (font === '') {
      return;
    }

    // See above for a note on OS-specific fonts
    if (!regularFont && (!skipSystemFonts || SYSTEM_FONTS.indexOf(font) < 0)) {
      regularFont = font;
    }
    if (!systemFont) {
      systemFont = font;
    }
  });

  if (regularFont) {
    return regularFont;
  }

  if (systemFont) {
    return systemFont;
  }

  return '-apple-system';
}

export interface TextStyleParams {
  color: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  lineHeight?: number;
  letterSpacing?: number;
  textTransform: string;
  textDecoration: string;
  textAlign: string;
  /**
   * Some websites or component libraries use font-family
   * listsstarting with OS-specific fonts.
   *
   * If the option 'skipSystemFonts' is enabled,
   * we skip those fonts to choose a font Sketch is capable of.
   * */
  skipSystemFonts?: boolean;
}

/**
 * 文本样式
 */
class TextStyle {
  color: Color;
  fontFamily: string;
  fontSize: number;
  lineHeight?: number;
  letterSpacing?: number;
  /**
   * 字重
   */
  fontWeight: number;
  textTransform?: string;
  textAlign: string;
  textDecoration?: string;
  constructor({
    color,
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecoration,
    textAlign,
    skipSystemFonts,
  }: TextStyleParams) {
    this.color = new Color(color);
    this.fontSize = fontSize;
    this.fontFamily = getFirstFont(fontFamily, skipSystemFonts);
    this.lineHeight = lineHeight;
    this.letterSpacing = letterSpacing;
    this.fontWeight = fontWeight;
    this.textTransform = textTransform;
    this.textDecoration = textDecoration;
    this.textAlign = textAlign;
  }

  /**
   * 转为 Sketch JSON对象
   */
  toSketchJSON = (): SketchFormat.TextStyle => {
    return {
      _class: 'textStyle',
      verticalAlignment: SketchFormat.TextVerticalAlignment.Top,
      encodedAttributes: {
        paragraphStyle: {
          _class: 'paragraphStyle',
          alignment: this.getSketchAlign(),
          maximumLineHeight: this.lineHeight,
          minimumLineHeight: this.lineHeight,
        },
        MSAttributedStringFontAttribute: {
          _class: 'fontDescriptor',
          attributes: {
            name: this.fontFamily,
            size: this.fontSize,
          },
        },
        MSAttributedStringColorAttribute: this.color.toSketchJson(),
        MSAttributedStringTextTransformAttribute: this.getTextTransform(),
        kerning: this.letterSpacing,
        underlineStyle: this.getUnderlineStyle(),
        strikethroughStyle: this.getStrikeThroughStyle(),
      },
    };
  };

  /**
   * 取得 sketch 下的对齐参数
   */
  getSketchAlign = () => {
    switch (this.textAlign) {
      case 'left':
        return SketchFormat.TextHorizontalAlignment.Left;
      case 'right':
        return SketchFormat.TextHorizontalAlignment.Right;
      case 'center':
        return SketchFormat.TextHorizontalAlignment.Centered;
      case 'justify':
        return SketchFormat.TextHorizontalAlignment.Justified;
    }
  };
  /**
   * 取得 sketch 下的文本变化属性
   */
  getTextTransform = () => {
    switch (this.textTransform) {
      case 'uppercase':
        return SketchFormat.TextTransform.Uppercase;
      case 'lowercase':
        return SketchFormat.TextTransform.Lowercase;
      default:
        return SketchFormat.TextTransform.None;
    }
  };

  /**
   * 获取下划线参数
   */
  getUnderlineStyle = () => {
    if (this.textDecoration === 'underline')
      return SketchFormat.UnderlineStyle.Underlined;
    else return SketchFormat.UnderlineStyle.None;
  };
  /**
   * 获取下划线参数
   */
  getStrikeThroughStyle = () => {
    if (this.textDecoration === 'line-through') return 1;
    else return 0;
  };
}

export default TextStyle;
