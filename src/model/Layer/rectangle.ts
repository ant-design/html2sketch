import FileFormat from '@sketch-hq/sketch-file-format-ts';
import Base, { BaseLayerParams } from './Base';
import { SketchFormat } from '../..';
import { defaultExportOptions } from '../utils';

type CornerRadius =
  | {
      bottomLeft: number;
      bottomRight: number;
      topLeft: number;
      topRight: number;
    }
  | number;
interface RectangleInitParams extends Omit<BaseLayerParams, 'x' | 'y'> {
  x?: number;
  y?: number;
  cornerRadius?: CornerRadius;
}
/**
 * 矩形类型
 **/
class Rectangle extends Base {
  constructor({
    x,
    y,
    width,
    height,
    cornerRadius = { topLeft: 0, bottomLeft: 0, topRight: 0, bottomRight: 0 },
  }: RectangleInitParams) {
    super({ height, x, y, width });
    this.class = FileFormat.ClassValue.Rectangle;

    this.cornerRadius = cornerRadius;
  }

  cornerRadius: any | undefined;

  toSketchJSON(): SketchFormat.Rectangle {
    return {
      _class: 'rectangle',
      name: this.name,
      resizingConstraint: SketchFormat.ResizeType.Float,
      frame: this.frame.toSketchJSON(),
      do_objectID: this.id,
      hasConvertedToNewRoundCorners: true,
      needsConvertionToNewRoundCorners: false,
      fixedRadius: 0,
      edited: false,
      pointRadiusBehaviour: 1,
      points: this.getSketchPoints(),
      isClosed: true,
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
      clippingMaskMode: 0,
      isLocked: false,
    };
  }

  getSketchPoints = (): SketchFormat.CurvePoint[] => {
    return [
      {
        _class: 'curvePoint',
        cornerRadius: this.cornerRadius.topLeft,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this.cornerRadius.topRight,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this.cornerRadius.bottomRight,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: this.cornerRadius.bottomLeft,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ];
  };
}

export default Rectangle;
