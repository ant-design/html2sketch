import { SVGPathData, SVGPathDataParser } from 'svg-pathdata';
import {
  CommandA,
  CommandC,
  CommandL,
  CommandM,
  CommandS,
  SVGCommand,
} from 'svg-pathdata/lib/types';
import Base, { BaseLayerParams } from './Base';
import { SketchFormat } from '../../index';
import { defaultExportOptions } from '../utils';

export type SVG = {
  _class: 'svg';
  rawSVGString: string;
  frame: SketchFormat.Rect;
  resizingConstraint: number;
  hasClippingMask: boolean;
};

type SvgPoint = CommandM | CommandL | CommandC | CommandS | CommandA;

interface SvgInitParams extends BaseLayerParams {
  path: string;
}

/**
 * SVG 对象
 */
class Svg extends Base {
  rawSVGString: string;
  constructor({ x, y, width, height, path }: SvgInitParams) {
    super({ height, width, y, x });
    this.class = 'svg';
    this.name = '路径';
    this.rawSVGString = path;
    const { isClose, points } = Svg.convertToCubicBezier(path);
    this.isClosed = isClose;
    // @ts-ignore
    this.points = points;
  }
  /**
   * 是否是闭合路径
   **/
  isClosed?: boolean;

  /**
   * 转为 Sketch String
   * @deprecated
   */
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

  /**
   * 将内部点转为 Sketch Point
   */
  convertPointsToSketchPoint = (
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
      points: this.points.map(this.convertPointsToSketchPoint).filter((l) => l),
    };
  };

  /**
   * 将 Path 转为贝赛尔曲线
   * @param path 路径
   */
  static convertToCubicBezier = (path: string) => {
    const svgPathData = new SVGPathData(path);
    const bounds = svgPathData.getBounds();
    const frame = {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
    };
    const { minX, minY } = bounds;

    // 判断是否闭合
    const isClose = svgPathData.commands.findIndex((i) => i.type === 1) > -1;

    const newPath = svgPathData
      .translate(-minX, -minY)
      .aToC() // 将所有圆弧转为 curve
      .normalizeHVZ() // 将 HVZ 转为直线
      .normalizeST() // 将 smooth curve 转为curve
      .transform(Svg.normalizationXY(frame.width, frame.height))
      .toAbs()
      .encode();
    const points = new SVGPathDataParser().parse(newPath);

    return {
      points: points
        .filter(
          (i) =>
            // 清理 Z
            i.type !== SVGPathData.CLOSE_PATH
        )
        .map((i) => {
          // @ts-ignore
          const { relative, ...res } = i;

          return res;
        }),
      frame,
      isClose,
    };
  };

  /**
   * 将 svg path 点归一化处理
   * @param width {number} 最大宽度
   * @param height {number} 最大高度
   */
  static normalizationXY = (width: number, height: number) => {
    return (command: SVGCommand) => {
      switch (command.type) {
        case SVGPathData.CLOSE_PATH:
          break;
        case SVGPathData.LINE_TO:
        case SVGPathData.MOVE_TO:
          command.x = command.x / width;
          command.y = command.y / height;
          break;

        case SVGPathData.CURVE_TO:
          command.x = command.x / width;
          command.x1 = command.x1 / width;
          command.x2 = command.x2 / width;
          command.y = command.y / height;
          command.y1 = command.y1 / height;
          command.y2 = command.y2 / height;
          break;
      }
      return command;
    };
  };
}

export default Svg;
