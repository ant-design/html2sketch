import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { BaseInitParams } from './base';
import { RESIZING_CONSTRAINTS } from '../helpers/layout';

interface TextInitParams extends BaseInitParams {
  width: number;
  height: number;
  text: string;
  style: any;
  multiline: boolean;
}
class Text extends Base<FileFormat.Text> {
  protected _x: number;
  protected _y: number;
  protected _width: number;
  protected _height: number;
  private _text: string;
  private _multiline: boolean;

  constructor({
    x,
    y,
    width,
    height,
    text,
    style,
    multiline,
    id,
  }: TextInitParams) {
    super({ id });
    this.class = 'text';
    this.type = 'Text';
    this._x = x || 0;
    this._y = y || 0;
    this._width = width;
    this._height = height;
    this._text = text;
    this._name = text;
    this._style = style;
    this._multiline = multiline;
    this.setResizingConstraint(RESIZING_CONSTRAINTS.HEIGHT);
  }

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this._x,
      y: this._y,
    };

    // @ts-ignore
    obj.text = this._text;
    obj.style = this._style.toJSON();

    // text nodes don't have child layers
    // @ts-ignore
    delete obj.layers;

    obj.automaticallyDrawOnUnderlyingPath = false;
    obj.dontSynchroniseWithSymbol = false;
    obj.lineSpacingBehaviour = 2;
    // 1 - width is set to Fixed
    // 0 - width is set to Auto - this helps us avoid issues with browser setting too small width causing line to break
    obj.textBehaviour = this._multiline ? 1 : 0;

    return obj;
  }
}

export default Text;
