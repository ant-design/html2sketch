import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultStyle } from '../utils';
import Base, { LayerInitParams } from './Base';

interface SymbolInstanceInitParams extends LayerInitParams {
  symbolID: string;
}
class SymbolInstance extends Base<FileFormat.SymbolInstance> {
  private _symbolID: string;
  constructor({ x, y, width, height, symbolID, id }: SymbolInstanceInitParams) {
    super({ id });
    this.class = 'symbolInstance';
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this._symbolID = symbolID;
  }

  setId(id: string) {
    this._symbolID = id;
  }

  toJSON() {
    const obj = super.toJSON();

    obj.frame = {
      _class: 'rect',
      constrainProportions: false,
      width: this.width,
      height: this.height,
      x: this.x,
      y: this.y,
    };

    obj.style = defaultStyle();

    obj.symbolID = this._symbolID;

    return obj;
  }
}

export default SymbolInstance;
