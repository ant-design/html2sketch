import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseLayer from '../Base/BaseLayer';
import { BaseLayerParams } from '../type';
import { defaultExportOptions } from '../utils';

interface EllipseParams extends BaseLayerParams {
  /**
   * 中心 X
   */
  cx?: number;
  /**
   * 中心 Y
   */
  cy?: number;
  /**
   * X 轴半径
   */
  rx?: number;
  /**
   * Y 轴半径
   */
  ry?: number;
}

/**
 * 椭圆图形
 */
class Ellipse extends BaseLayer {
  constructor(params?: EllipseParams) {
    super('ellipse', params);

    this.name = 'ellipse';

    if (params) {
      const { cx, cy, rx, ry } = params;
      if (rx) {
        this.rx = rx;
      }
      if (ry) {
        this.ry = ry;
      }
      if (cx) {
        this.cx = cx;
      }
      if (cy) {
        this.cy = cy;
      }
    }
  }

  /**
   * 获取 x 中点值
   */
  get cx() {
    return (this.left + this.right) / 2;
  }

  set cx(cx) {
    this.left = cx - this.width / 2;
    this.right = cx + this.width / 2;
  }

  /**
   * 获取 y 中点值
   */
  get cy() {
    return (this.top + this.bottom) / 2;
  }

  set cy(cy) {
    this.top = cy - this.height / 2;
    this.bottom = cy + this.height / 2;
  }

  get rx() {
    return this.width / 2;
  }

  set rx(rx: number) {
    this.left = this.x + (this.width / 2 - rx);
    this.width = rx * 2;
  }

  get ry() {
    return this.height / 2;
  }

  set ry(ry: number) {
    this.top = this.x + (this.height / 2 - ry);
    this.height = ry * 2;
  }

  toSketchJSON(): SketchFormat.Oval {
    return {
      _class: 'oval',
      name: this.name,
      resizingConstraint: this.resizingConstraint,
      frame: this.frame.toSketchJSON(),
      do_objectID: this.id,
      style: this.style.toSketchJSON(),
      edited: false,
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
      booleanOperation: SketchFormat.BooleanOperation.None,
      exportOptions: defaultExportOptions,
      isClosed: true,
      points: [
        {
          _class: 'curvePoint',
          cornerRadius: 0,
          curveFrom: '{0.77614237490000004, 1}',
          curveMode: 2,
          curveTo: '{0.22385762510000001, 1}',
          hasCurveFrom: true,
          hasCurveTo: true,
          point: '{0.5, 1}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: 0,
          curveFrom: '{1, 0.22385762510000001}',
          curveMode: 2,
          curveTo: '{1, 0.77614237490000004}',
          hasCurveFrom: true,
          hasCurveTo: true,
          point: '{1, 0.5}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: 0,
          curveFrom: '{0.22385762510000001, 0}',
          curveMode: 2,
          curveTo: '{0.77614237490000004, 0}',
          hasCurveFrom: true,
          hasCurveTo: true,
          point: '{0.5, 0}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: 0,
          curveFrom: '{0, 0.77614237490000004}',
          curveMode: 2,
          curveTo: '{0, 0.22385762510000001}',
          hasCurveFrom: true,
          hasCurveTo: true,
          point: '{0, 0.5}',
        },
      ],
      pointRadiusBehaviour: 1,
    };
  }
}
export default Ellipse;
