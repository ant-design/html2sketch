import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import Color from './Color';

const SYSTEM_FONTS = [
  // Apple
  '-apple-system',
  'system-ui',
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
  fontWeight: number | string;
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
    this.fontWeight = fontWeight.toString();
    this.textTransform = textTransform;
    this.textDecoration = textDecoration;
    this.textAlign = textAlign;
  }
  color: Color;

  /**
   * 字体家族
   **/
  fontFamily: string;
  /**
   * 字体大小
   **/
  fontSize: number;
  /**
   * 行高
   **/
  lineHeight?: number;
  /**
   * 字宽
   **/
  letterSpacing?: number;
  /**
   * 字重
   */
  fontWeight: string;
  /**
   * 字体变换
   *
   * 例如全部大写等
   **/
  textTransform?: string;
  /**
   * 文本对齐
   **/
  textAlign: string;
  /**
   * 文本装饰
   *
   * 例如 下划线、删除线等
   **/
  textDecoration?: string;

  /**
   * 字体权重
   **/
  FONT_WEIGHTS = {
    normal: 'Regular',
    bold: 'Bold',
    '100': 'UltraLight',
    '200': 'Thin',
    '300': 'Light',
    '400': 'Regular',
    '500': 'Medium',
    '600': 'Semibold',
    '700': 'Bold',
    '800': 'Heavy',
    '900': 'Black',
  };

  /**
   * 字体类型
   **/
  FONT_STYLES = {
    normal: false,
    italic: true,
    oblique: true,
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
    switch (this.textTransform.toLowerCase()) {
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

  /**
   * 修正字体家族信息
   **/
  fixFontFamilyInfo = (
    _family: string,
    weight?: string,
    _fontStyle?: string
  ): string => {
    // const defaultFontFamily = 'PingFangSC';

    const defaultFontWeight = this.FONT_WEIGHTS.normal;

    let fontWeight = weight ? this.FONT_WEIGHTS[weight] : defaultFontWeight;
    // Default to PingFangSC if fonts are missing

    // let isItalic = false;

    // let isCondensed = false;

    // let familyName: string = defaultFontFamily;
    // if (family && family !== '-apple-system') {
    // familyName = family;
    // }

    // if (fontStyle) {
    //   isItalic = this.FONT_STYLES[fontStyle] || false;
    // }

    // console.log('是否斜体:', isItalic);
    // return `${familyName}-${fontWeight}`;
    return `PingFangSC-${fontWeight}`;
  };

  /**
   * 转为 Sketch JSON对象
   */
  toSketchJSON = (): SketchFormat.TextStyle => {
    return {
      _class: 'textStyle',
      verticalAlignment: SketchFormat.TextVerticalAlignment.Top,
      encodedAttributes: {
        underlineStyle: this.getUnderlineStyle(),
        MSAttributedStringTextTransformAttribute: this.getTextTransform(),
        paragraphStyle: {
          _class: 'paragraphStyle',
          alignment: this.getSketchAlign(),
          maximumLineHeight: this.lineHeight,
          minimumLineHeight: this.lineHeight,
        },
        /**
         * 字宽
         **/
        kerning: this.letterSpacing || 0,
        strikethroughStyle: this.getStrikeThroughStyle(),
        MSAttributedStringFontAttribute: {
          _class: 'fontDescriptor',
          attributes: {
            name: this.fixFontFamilyInfo(this.fontFamily, this.fontWeight),
            size: this.fontSize,
          },
        },
        MSAttributedStringColorAttribute: this.color.toSketchJSON(),
      },
    };
  };
}

export default TextStyle;
