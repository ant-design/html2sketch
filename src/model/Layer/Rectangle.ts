import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { BaseLayerParams } from '../type';

import BaseLayer from '../Base/BaseLayer';
import { defaultExportOptions } from '../utils';

type CornerRadius = {
  bottomLeft: number;
  bottomRight: number;
  topLeft: number;
  topRight: number;
};
interface RectangleInitParams extends Omit<BaseLayerParams, 'x' | 'y'> {
  x?: number;
  y?: number;
  cornerRadius?: CornerRadius | number | number[];
}
/**
 * 矩形类型
 * */
class Rectangle extends BaseLayer {
  constructor({
    x,
    y,
    width,
    height,
    cornerRadius = { topLeft: 0, bottomLeft: 0, topRight: 0, bottomRight: 0 },
  }: RectangleInitParams) {
    super(SketchFormat.ClassValue.Rectangle, { height, x, y, width });

    this.cornerRadius = cornerRadius;
  }

  /**
   * 圆角值
   */
  cornerRadius: CornerRadius | number | number[] = 0;

  toKonvaRadius = () => {
    if (
      typeof this.cornerRadius === 'number' ||
      this.cornerRadius instanceof Array
    ) {
      return this.cornerRadius;
    }
    return Object.values(this.cornerRadius);
  };

  /**
   * 转换为 Sketch JSON
   */
  toSketchJSON(): SketchFormat.Rectangle {
    return {
      _class: 'rectangle',
      name: this.name,
      resizingConstraint: this.resizingConstraint,
      frame: this.frame.toSketchJSON(),
      do_objectID: this.id,
      hasConvertedToNewRoundCorners: true,
      needsConvertionToNewRoundCorners: false,
      fixedRadius: 0,
      style: this.style.toSketchJSON(),
      edited: false,
      pointRadiusBehaviour: 1,
      points: this.getSketchPoints(),
      isClosed: true,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      exportOptions: defaultExportOptions,
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

  /**
   * 转换为 Konva JSON
   */
  toKonvaJSON() {
    const { cornerRadius } = this;
    return {
      attrs: {
        ...this.frame.toJSON(),
        id: this.id,
        cornerRadius:
          typeof cornerRadius === 'number' || cornerRadius instanceof Array
            ? cornerRadius
            : [
                cornerRadius.topLeft,
                cornerRadius.topRight,
                cornerRadius.bottomRight,
                cornerRadius.bottomLeft,
              ],
      },
      className: this.name,
    };
  }

  /**
   * 获取 SketchPoints
   */
  getSketchPoints = (): SketchFormat.CurvePoint[] => {
    const { cornerRadius } = this;
    let topRight;
    let topLeft;
    let bottomLeft;
    let bottomRight;
    if (typeof cornerRadius === 'number') {
      topLeft = cornerRadius;
      topRight = cornerRadius;
      bottomRight = cornerRadius;
      bottomLeft = cornerRadius;
    } else if (cornerRadius instanceof Array) {
      [topLeft, topRight, bottomRight, bottomLeft] = cornerRadius;
    } else {
      topLeft = cornerRadius.topLeft;
      topRight = cornerRadius.topRight;
      bottomRight = cornerRadius.bottomRight;
      bottomLeft = cornerRadius.bottomLeft;
    }
    return [
      {
        _class: 'curvePoint',
        cornerRadius: topLeft,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: topRight,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: bottomRight,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: bottomLeft,
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
