import { SVGPathData } from 'svg-pathdata';
import {
  CommandA,
  CommandC,
  CommandL,
  CommandM,
  CommandS,
} from 'svg-pathdata/lib/types';
import Base, { BaseLayerParams } from './Base';
import { SketchFormat } from '../../index';
import { defaultExportOptions } from '../utils';
import { convertToCubicBezier } from '../../helpers/svg';

export type SVG = {
  _class: 'svg';
  rawSVGString: string;
  frame: SketchFormat.Rect;
  resizingConstraint: number;
  hasClippingMask: boolean;
};

type SvgPoint = CommandM | CommandL | CommandC | CommandS | CommandA;

interface SvgInitParams extends BaseLayerParams {
  rawSVGString: string;
}

/**
 * SVG 对象
 */
class Svg extends Base {
  rawSVGString: string;
  constructor({ x, y, width, height, rawSVGString }: SvgInitParams) {
    super({ height, width, y, x });
    this.class = 'svg';
    this.name = '路径';
    this.rawSVGString = rawSVGString;
    const { isClose, points } = convertToCubicBezier(rawSVGString);
    this.isClosed = isClose;
    this.points = points;
  }
  /**
   * 是否是闭合路径
   **/
  isClosed?: boolean;
  toSketchString = (): SVG => {
    return {
      _class: 'svg',
      rawSVGString: this.rawSVGString,
      frame: this.frame.toSketchJSON(),
      resizingConstraint: this.resizingConstraint,
      hasClippingMask: this.hasClippingMask,
    };
  };
  points: SvgPoint[];

  coverterPointsToSketchPoint = (
    point: SvgPoint,
    index: number
  ): SketchFormat.CurvePoint => {
    let curveMode = SketchFormat.CurveMode.Straight;

    let hasCurveFrom = false;
    let hasCurveTo = false;

    const prevIndex = index - 1 > -1 ? index - 1 : this.points.length - 1;
    const nextIndex = index + 1 < this.points.length ? index + 1 : 0;
    const prevPoint = this.points[prevIndex];
    const nextPoint = this.points[nextIndex];

    let thisPoint = point;
    let curveFromPoint: { x: number; y: number } = thisPoint;
    let curveToPoint: { x: number; y: number } = thisPoint;

    if (point.type === SVGPathData.MOVE_TO && index === 0) {
      thisPoint = this.points[this.points.length - 1];
    }

    // 解析曲线模式
    if (
      prevPoint.type !== thisPoint.type ||
      nextPoint.type !== thisPoint.type
    ) {
      curveMode = SketchFormat.CurveMode.Disconnected;
    }

    // 如果自身点是 Curve 点
    if (thisPoint.type === SVGPathData.CURVE_TO) {
      curveToPoint = { x: thisPoint.x2, y: thisPoint.y2 };
      hasCurveTo = true;
    }

    // 如果下一个点是 Curve 点
    if (
      point.type === SVGPathData.LINE_TO &&
      nextPoint.type === SVGPathData.CURVE_TO
    ) {
      hasCurveFrom = true;
      curveFromPoint = { x: nextPoint.x1, y: nextPoint.y1 };
    }

    if (index === this.points.length - 1)
      // 返回最后一个对象
      return;
    return {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: `{${curveFromPoint.x}, ${curveFromPoint.y}}`,
      curveMode,
      curveTo: `{${curveToPoint.x}, ${curveToPoint.y}}`,
      hasCurveFrom,
      hasCurveTo,
      point: `{${point.x}, ${point.y}}`,
    };
  };
  /**
   * 转换为 Sketch ShapePath 对象
   **/
  toSketchJSON = (): SketchFormat.ShapePath => {
    return {
      _class: 'shapePath',
      do_objectID: this.id,
      booleanOperation: -1,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: this.name,
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      exportOptions: defaultExportOptions,
      frame: this.frame.toSketchJSON(),
      clippingMaskMode: 0,
      hasClippingMask: false,
      style: this.style.toSketchJSON(),
      edited: true,
      isClosed: this.isClosed,
      pointRadiusBehaviour: 1,
      points: this.points
        .map(this.coverterPointsToSketchPoint)
        .filter((l) => l),
    };
  };
}

export default Svg;
