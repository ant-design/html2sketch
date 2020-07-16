import Base, { BaseLayerParams } from './Base';
import { RESIZING_CONSTRAINTS } from '../../helpers/layout';
import { SketchFormat } from '../../index';
import { defaultExportOptions } from '../utils';
import TextStyle, { TextStyleParams } from '../Style/TextStyle';

interface TextInitParams extends BaseLayerParams {
  text: string;
  style: TextStyleParams;
  multiline: boolean;
}
class Text extends Base {
  constructor({ x, y, width, height, text, style, multiline }: TextInitParams) {
    super({ x, y, width, height });
    this.name = text;
    this.class = 'text';
    this.text = text;
    this.textStyle = new TextStyle(style);
    this.multiline = multiline;
    this.setResizingConstraint(RESIZING_CONSTRAINTS.HEIGHT);

    // 1 - width is set to Fixed
    // 0 - width is set to Auto - this helps us avoid issues with browser setting too small width causing line to break
    this.sketchTextBehaviour = multiline
      ? SketchFormat.TextBehaviour.Fixed
      : SketchFormat.TextBehaviour.Flexible;
  }
  textStyle: TextStyle;

  text: string;
  /**
   * 多行
   */
  multiline: boolean;

  sketchTextBehaviour: SketchFormat.TextBehaviour;

  toSketchJSON = (): SketchFormat.Text => {
    return {
      _class: 'text',
      do_objectID: this.id,
      isLocked: this.isLocked,
      name: this.name || this.class,
      resizingConstraint: this.resizingConstraint,
      hasClippingMask: this.hasClippingMask,
      userInfo: this.userInfo,
      frame: this.frame.toSketchJSON(),
      style: this.style.toSketchJSON(),
      automaticallyDrawOnUnderlyingPath: false,
      attributedString: {
        _class: 'attributedString',
        string: this.text,
        attributes: [
          {
            _class: 'stringAttribute',
            length: this.text.length,
            location: 0,
            attributes: this.textStyle.toSketchJSON().encodedAttributes,
          },
        ],
      },
      glyphBounds: '',
      dontSynchroniseWithSymbol: false,
      lineSpacingBehaviour: 2,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      exportOptions: defaultExportOptions,
      sharedStyleID: '',
      isVisible: true,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      layerListExpandedType: 0,
      nameIsFixed: false,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      textBehaviour: this.sketchTextBehaviour,
      clippingMaskMode: 0,
    };
  };

  getTextBehaviour = () => {
    return SketchFormat.TextBehaviour;
  };
}

export default Text;
