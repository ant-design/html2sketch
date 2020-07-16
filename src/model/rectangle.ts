import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { LayerInitParams } from './base';
import { CGPoint } from '..';

type CornerRadius =
  | {
      bottomLeft: number;
      bottomRight: number;
      topLeft: number;
      topRight: number;
    }
  | number;
interface RectangleInitParams extends Omit<LayerInitParams, 'x' | 'y'> {
  x?: number;
  y?: number;
  cornerRadius?: CornerRadius;
}
/**
 * 矩形类型
 **/
class Rectangle extends Base<FileFormat.Rectangle> {
  constructor({
    x,
    y,
    width,
    height,
    cornerRadius = { topLeft: 0, bottomLeft: 0, topRight: 0, bottomRight: 0 },
    id,
  }: RectangleInitParams) {
    super({ id });
    this.class = FileFormat.ClassValue.Rectangle;
    this.type = 'Rectangle';
    this._width = width;
    this._height = height;
    this._cornerRadius = cornerRadius;
    this.setPosition({ x, y });
  }

  protected readonly _width: number;
  protected readonly _height: number;
  private _cornerRadius: any | undefined;

  setCornerRadius(cornerRadius: CornerRadius) {
    this._cornerRadius = cornerRadius;
  }

  setPosition({ x, y }: CGPoint) {
    this.x = x;
    this.y = y;
  }
  toJSON() {
    const rect = super.toJSON();

    rect.frame = {
      _class: 'rect',
      constrainProportions: false,
      height: this._height,
      width: this._width,
      x: this.x,
      y: this.y,
    };

    rect.isClosed = true;
    rect.pointRadiusBehaviour = 1;
    rect.points = [
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.topLeft,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.topRight,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.bottomRight,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this._cornerRadius.bottomLeft,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ];
    rect.hasConvertedToNewRoundCorners = true;
    rect.fixedRadius = 0;
    rect.edited = false;
    rect.booleanOperation = -1;

    return rect;
  }
}

export default Rectangle;
