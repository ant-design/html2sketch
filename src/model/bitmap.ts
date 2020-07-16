import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';
import { generateID } from '@/common/utils';

interface BitmapInitParams extends LayerInitParams {
  url: string;
}
class Bitmap extends Base<FileFormat.Bitmap> {
  constructor({ url, x, y, width, height, id }: BitmapInitParams) {
    super({ id });
    this._class = 'bitmap';
    this._url = url;
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  private readonly _url: string;
  protected readonly _width: number;
  protected readonly _height: number;

  toJSON() {
    const img = super.toJSON();

    img.frame = {
      _class: 'rect',
      constrainProportions: false,
      x: this._x,
      y: this._y,
      height: this._height,
      width: this._width,
    };

    img.image = {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: `images/${generateID()}`,
      // @ts-ignore
      url: this._url,
    };

    return img;
  }
}

export default Bitmap;
