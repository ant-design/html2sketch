import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultStyle } from './utils';
import Base, { LayerInitParams } from './base';

interface SymbolInstanceInitParams extends LayerInitParams {
  symbolID: string;
}
class SymbolInstance extends Base<FileFormat.SymbolInstance> {
  private _symbolID: string;
  constructor({ x, y, width, height, symbolID, id }: SymbolInstanceInitParams) {
    super({ id });
    this._class = 'symbolInstance';
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._symbolID = symbolID;
  }

  setId(id: string) {
    this._symbolID = id;
  }

  protected readonly _width: number;
  protected readonly _height: number;

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      width: this._width,
      height: this._height,
      x: this._x,
      y: this._y,
    };

    obj.style = defaultStyle();

    obj.symbolID = this._symbolID;

    return obj;
  }
}

export default SymbolInstance;
