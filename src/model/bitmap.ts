import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';
import uuid from '../helpers/uuid';

interface BitmapInitParams extends LayerInitParams {
  url: string;
}
class Bitmap extends Base<FileFormat.Bitmap> {
  constructor({ url, x, y, width, height, id }: BitmapInitParams) {
    super({ id });
    this.class = 'bitmap';
    this.url = url;
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
  }

  public url: string;
  protected readonly _width: number;
  protected readonly _height: number;

  toJSON() {
    const img = super.toJSON();

    img.frame = {
      _class: 'rect',
      constrainProportions: false,
      x: this.x,
      y: this.y,
      height: this._height,
      width: this._width,
    };

    img.image = {
      _class: 'MSJSONOriginalDataReference',
      _ref_class: 'MSImageData',
      _ref: `images/${uuid()}`,
      // @ts-ignore
      url: this._url,
    };

    return img;
  }
}

export default Bitmap;
