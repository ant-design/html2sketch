import Base, { BaseLayerParams } from './Base';
import { RESIZING_CONSTRAINTS } from '../../helpers/layout';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../utils';
import TextStyle, { TextStyleParams } from '../Style/TextStyle';

interface TextInitParams extends BaseLayerParams {
  text: string;
  style?: TextStyleParams;
  multiline: boolean;
}
/**
 * 文本对象
 **/
class Text extends Base {
  constructor({ x, y, width, height, text, style, multiline }: TextInitParams) {
    super({ x, y, width, height });
    this.name = text;
    this.class = SketchFormat.ClassValue.Text;
    this.text = text;
    this.textStyle = new TextStyle(style);
    this.multiline = multiline;
    this.setResizingConstraint(RESIZING_CONSTRAINTS.NONE);

    // 1 - width is set to Fixed
    // 0 - width is set to Auto - this helps us avoid issues with browser setting too small width causing line to break
    this.sketchTextBehaviour = multiline
      ? SketchFormat.TextBehaviour.Fixed
      : SketchFormat.TextBehaviour.Flexible;
  }
  textStyle: TextStyle;
  /**
   * 文本内容
   **/
  text: string;
  /**
   * 多行
   */
  multiline: boolean;

  sketchTextBehaviour: SketchFormat.TextBehaviour;

  /**
   * 转换为 Sketch JSON 对象
   **/
  toSketchJSON = (): SketchFormat.Text => {
    return {
      _class: 'text',
      do_objectID: this.id,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this.isLocked,
      isVisible: true,
      name: this.name || this.class,
      nameIsFixed: this.nameIsFixed,
      layerListExpandedType: 0,
      resizingConstraint: this.resizingConstraint,
      resizingType: SketchFormat.ResizeType.Stretch,
      rotation: 0,
      shouldBreakMaskChain: false,
      userInfo: this.userInfo ? this.userInfo : undefined,
      exportOptions: defaultExportOptions,
      frame: this.frame.toSketchJSON(),
      clippingMaskMode: 0,
      hasClippingMask: this.hasClippingMask,
      style: this.style.toSketchJSON(),

      attributedString: this.makeAttributedString(),
      automaticallyDrawOnUnderlyingPath: false,
      dontSynchroniseWithSymbol: false,
      lineSpacingBehaviour: 2,
      textBehaviour: this.sketchTextBehaviour,
      glyphBounds: '',
    };
  };

  /**
   * 生成文本核心样式
   **/
  makeAttributedString = (): SketchFormat.AttributedString => {
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
    } else if (fontWeight === 'normal') {
      return 400;
    }
    return parseInt(fontWeight, 10);
  };
  /**
   * 修复字体空格
   **/
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

  getTextBehaviour = () => {
    return SketchFormat.TextBehaviour;
  };
}

export default Text;
