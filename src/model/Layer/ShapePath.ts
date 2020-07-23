import Base, { BaseLayerParams } from './Base';
import { SketchFormat } from '../../index';
import { defaultExportOptions } from '../utils';
import { BezierPoint, StartPoint } from './Svg';
import { SVGPathData } from 'svg-pathdata';
import { SVGCommand } from 'svg-pathdata/lib/types';

export interface ShapePathType {
  points: BezierPoint[];
  frame: { width: number; height: number; x?: number; y?: number };
  isClose: boolean;
}
export interface ShapePathInitParams extends BaseLayerParams {
  isClose: boolean;
  points: BezierPoint[];
}

/**
 * ShapePath 是一组点构成的形状对象
 */
class ShapePath extends Base {
  constructor(params: ShapePathInitParams) {
    super(params);
    this.class = SketchFormat.ClassValue.ShapePath;
    this.isClosed = params.isClose;
    this.name = '路径';
    if (params.isClose) {
    }
    this.points = params.points;
  }

  /**
   * 旋转
   */
  rotation: number = 0;

  /**
   * 内部使用的 贝塞尔曲线 points
   */
  points: BezierPoint[];

  /**
   * 形状是否闭合
   */
  isClosed: boolean;

  /**
   * 转为 Sketch JSON 文件
   */
  toSketchJSON(): SketchFormat.ShapePath {
    return {
      _class: 'shapePath',
      booleanOperation: SketchFormat.BooleanOperation.NA,
      do_objectID: this.id,
      rotation: this.rotation,
      isVisible: true,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      layerListExpandedType: 0,
      nameIsFixed: false,
      resizingType: 0,
      shouldBreakMaskChain: false,
      clippingMaskMode: 0,
      isLocked: false,
      exportOptions: defaultExportOptions,
      frame: this.frame.toSketchJSON(),
      name: this.name,
      style: this.style.toSketchJSON(),
      resizingConstraint: this.resizingConstraint,
      edited: true,
      isClosed: this.isClosed,
      points: this.points.map(this.bezierPointToSketchPoint).filter((p) => p),
      pointRadiusBehaviour: SketchFormat.PointsRadiusBehaviour.Disabled,
    };
  }

  /**
   * 将内部点转为 Sketch Point
   */
  bezierPointToSketchPoint = (
    point: BezierPoint,
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
   * 将 Path 转为 ShapePathType 类型的对象
   * @param path 路径
   */
  static svgPathToShapePath(path: string): ShapePathType {
    const svgPathData = new SVGPathData(path);
    const bounds = svgPathData.getBounds();
    const frame = {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
    };
    const { minX, minY } = bounds;

    // 判断是否闭合
    const isClose = svgPathData.commands.findIndex((i) => i.type === 1) > -1;

    const shapePath = svgPathData
      .translate(-minX, -minY)
      .aToC() // 将所有圆弧转为 curve
      .normalizeHVZ() // 将 HVZ 转为直线
      .normalizeST() // 将 smooth curve 转为curve
      .toAbs()
      .transform(this.normalizationXY(frame.width, frame.height));

    return {
      points: shapePath.commands
        .filter((i, index) => {
          // 清理 Z 结尾类
          if (i.type === SVGPathData.CLOSE_PATH) {
            return false;
          }

          // 如果最后一个点和起点重合
          // 过滤
          if (index === shapePath.commands.length - 1) {
            const startP = shapePath.commands[0] as StartPoint;

            if (
              (i as BezierPoint).x === startP.x &&
              (i as BezierPoint).y === startP.y
            ) {
              return false;
            }
          }
          return true;
        })
        .map((i) => {
          // @ts-ignore
          const { relative, ...res } = i;

          return res as BezierPoint;
        }),
      frame,
      isClose,
    };
  }

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

export default ShapePath;
