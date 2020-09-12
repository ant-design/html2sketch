import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseLayer from '../Base/BaseLayer';
import { ResizingConstraint } from '../../utils/layout';
import { defaultExportOptions } from '../utils';
import TextStyle, { TextStyleParams } from '../Style/TextStyle';
import { BaseLayerParams } from '../type';

interface TextInitParams extends BaseLayerParams {
  text: string;
  style?: TextStyleParams;
  multiline?: boolean;
}
/**
 * 文本对象
 * */
class Text extends BaseLayer {
  constructor({ x, y, width, height, text, style, multiline }: TextInitParams) {
    super(SketchFormat.ClassValue.Text, { x, y, width, height });
    this.name = text;

    this.text = text;
    this.textStyle = new TextStyle(style);
    this.multiline = multiline || false;
    this.setResizingConstraint(ResizingConstraint.None);

    // 1 - width is set to Fixed
    // 0 - width is set to Auto - this helps us avoid issues with browser setting too small width causing line to break
    this.sketchTextBehaviour = multiline
      ? SketchFormat.TextBehaviour.Fixed
      : SketchFormat.TextBehaviour.Flexible;

    if (style?.opacity) {
      this.style.opacity = style.opacity;
    }
  }

  textStyle: TextStyle;

  /**
   * 文本内容
   * */
  text: string;

  /**
   * 多行
   */
  multiline: boolean;

  sketchTextBehaviour: SketchFormat.TextBehaviour;

  /**
   * 转换为 Sketch JSON 对象
   * */
  toSketchJSON = (): SketchFormat.Text => {
    const textJSON: SketchFormat.Text = {
      _class: 'text',
      do_objectID: this.id,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this.locked,
      isVisible: true,
      name: this.name || this.class,
      nameIsFixed: this.nameIsFixed,
      layerListExpandedType: 0,
      resizingConstraint: this.resizingConstraint,
      resizingType: SketchFormat.ResizeType.Stretch,
      rotation: 0,
      shouldBreakMaskChain: false,
      exportOptions: defaultExportOptions,
      frame: this.frame.toSketchJSON(),
      clippingMaskMode: 0,
      hasClippingMask: this.hasClippingMask,
      style: this.style.toSketchJSON(),
      attributedString: this.getSketchAttributedString(),
      automaticallyDrawOnUnderlyingPath: false,
      dontSynchroniseWithSymbol: false,
      lineSpacingBehaviour: 2,
      textBehaviour: this.sketchTextBehaviour,
      glyphBounds: '',
    };

    if (this.userInfo) {
      textJSON.userInfo = this.userInfo;
    }
    return textJSON;
  };

  /**
   * 生成文本核心样式
   * */
  getSketchAttributedString = (): SketchFormat.AttributedString => {
    return {
      _class: 'attributedString',
      string: this.text,
      attributes: [
        {
          _class: 'stringAttribute',
          location: 0,
          length: this.text.length,
          attributes: this.textStyle.toSketchJSON().encodedAttributes,
        },
      ],
    };
  };

  /**
   * 解析字重
   * @param {string} fontWeight font weight as provided by the browser
   * @return {number} normalized font weight
   */
  static parseFontWeight = (fontWeight: string): number => {
    // Support 'bold' and 'normal' for Electron compatibility.
    if (fontWeight === 'bold') {
      return 700;
    }
    if (fontWeight === 'normal') {
      return 400;
    }
    return parseInt(fontWeight, 10);
  };

  /**
   * 修复字体空格
   * */
  static fixWhiteSpace = (text: string, whiteSpace: string) => {
    switch (whiteSpace) {
      case 'normal':
      case 'nowrap':
        return text
          .trim()
          .replace(/\n/g, ' ') // replace newline characters with space
          .replace(/\s+/g, ' '); // collapse whitespace
      case 'pre-line':
        return text
          .replace(/(^[^\S\n]+)|([^\S\n]+$)/g, '') // trim but leave \n
          .replace(/[^\S\n]+/g, ' ') // collapse whitespace (except \n)
          .replace(/[^\S\n]?\n[^\S\n]?/g, '\n'); // remove whitespace before & after \n
      default:
      // pre, pre-wrap
    }

    return text;
  };

  /**
   * 从节点中获取样式
   * @param node
   * @param pseudoElt
   */
  static getTextStyleFromNode = (
    node: Element,
    pseudoElt?: string,
  ): TextStyleParams => {
    const styles: CSSStyleDeclaration = getComputedStyle(node, pseudoElt);

    const {
      // 字体
      fontFamily,
      fontWeight,
      fontSize,
      lineHeight,
      letterSpacing,
      textTransform,
      textDecorationLine,
      color,
      opacity,
    } = styles;

    return {
      fontFamily,
      fontSize: parseInt(fontSize, 10),
      lineHeight: lineHeight !== 'normal' ? parseFloat(lineHeight) : undefined,
      letterSpacing:
        letterSpacing !== 'normal' ? parseFloat(letterSpacing) : undefined,
      fontWeight: Text.parseFontWeight(fontWeight),
      color,
      textTransform,
      textDecoration: textDecorationLine,
      textAlign: TextStyle.parseTextHorizontalAlign(styles),
      verticalAlign: TextStyle.parseTextVerticalAlign(styles),
      skipSystemFonts: true,
      opacity: parseFloat(opacity),
    };
  };
}

export default Text;
