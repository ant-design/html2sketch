import Base, { BaseLayerParams } from './Base';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../utils';
import { BezierPoint, StartPoint } from './Svg';
import { SVGPathData } from 'svg-pathdata';
import { CommandC, CommandL, SVGCommand } from 'svg-pathdata/lib/types';

export interface ShapePathType {
  points: BezierPoint[];
  frame: { width: number; height: number; x?: number; y?: number };
  isClose: boolean;
}

interface ContextPoints {
  thisPoint: BezierPoint;
  nextPoint: BezierPoint;
  prevPoint: BezierPoint;
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
   * 单个 ShapePath 的布尔类型
   */
  booleanOperation: SketchFormat.BooleanOperation =
    SketchFormat.BooleanOperation.NA;
  /**
   * 转为 Sketch JSON 文件
   */
  toSketchJSON(): SketchFormat.ShapePath {
    return {
      _class: 'shapePath',
      booleanOperation: this.booleanOperation,
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
      /**
       * 默认使用圆角
       */
      pointRadiusBehaviour: SketchFormat.PointsRadiusBehaviour.Rounded,
    };
  }

  /**
   * 将内部点转为 Sketch Point
   */
  bezierPointToSketchPoint = (
    point: BezierPoint,
    index: number
  ): SketchFormat.CurvePoint => {
    const { nextPoint, thisPoint } = this.getContextPoints(index);

    let hasCurveFrom = false;
    let hasCurveTo = false;

    let curveFromPoint: { x: number; y: number } = point;
    let curveToPoint: { x: number; y: number } = point;

    // 如果自身点是 Curve 点
    if (thisPoint.type === SVGPathData.CURVE_TO) {
      curveToPoint = { x: thisPoint.x2, y: thisPoint.y2 };
      hasCurveTo = true;
    }

    // 如果下一个点是 Curve 点
    if (nextPoint.type === SVGPathData.CURVE_TO) {
      hasCurveFrom = true;
      curveFromPoint = { x: nextPoint.x1, y: nextPoint.y1 };
    }

    // 确认曲线模式
    const curveMode =
      // 既有前 也有后 就不对称
      hasCurveFrom && hasCurveTo
        ? SketchFormat.CurveMode.Asymmetric
        : // 否则 有前或有后 就是弯的
        hasCurveFrom || hasCurveTo
        ? SketchFormat.CurveMode.Disconnected
        : // 不然就是直的
          SketchFormat.CurveMode.Straight;

    // 如果是闭合路径
    // 过滤最后一个点
    if (this.isClosed && index === this.points.length - 1) return;

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
   * 获取上下文的点
   * @param index
   */
  private getContextPoints = (index: number): ContextPoints => {
    let thisIndex = index;
    const lastIndex = this.points.length - 1;
    let prevIndex = index - 1;
    let nextIndex = index + 1;
    // 如果是第一个点
    if (index === 0) {
      thisIndex = lastIndex;
      prevIndex = lastIndex - 1;
      nextIndex = 1;
    }
    // 第二个点的情况下
    else if (index === 1) {
      // 前一个点是最后一个点
      prevIndex = lastIndex;
    }
    // 最后一个点的情况下
    else if (index === lastIndex) {
      // 下一个点是第二个点
      nextIndex = 1;
    }

    return {
      thisPoint: this.points[thisIndex],
      nextPoint: this.points[nextIndex],
      prevPoint: this.points[prevIndex],
    };
  };

  /**
   * 将 Path 转为 ShapePathType 类型的对象
   * @param path 路径
   */
  static svgPathToShapePath(path: string): ShapePathType {
    // 将 多个 svg 通过 M 符号进行分割 | TODO 要看下是否还有其他方式来区分对象
    let pathStr = path.split(/([Mm])/).filter((s) => s);
    // 只允许解析一条 path
    if (pathStr.length !== 2) {
      throw Error(
        `Error Path!\nData:${path}\nPlease check whether the path is correct.Only allow one path shape`
      );
    }
    const svgPathData = new SVGPathData(path);
    const bounds = svgPathData.getBounds();
    const frame = {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
      x: bounds.minX,
      y: bounds.minY,
    };
    const { minX, minY } = bounds;

    // 判断是否闭合
    const isClose =
      svgPathData.commands.findIndex((i) => i.type === SVGPathData.CLOSE_PATH) >
      -1;

    const shapePath = svgPathData
      .translate(-minX, -minY)
      .aToC() // 将所有圆弧转为 curve
      .normalizeHVZ() // 将 HVZ 转为直线
      .normalizeST() // 将 smooth curve 转为curve
      .toAbs()
      .transform(ShapePath.normalizationXY(frame.width, frame.height));

    const points = (shapePath.commands as (CommandC | CommandL)[])
      .filter((i, index) => {
        // 对最后一个点进行处理
        if (index === shapePath.commands.length - 1) {
          const startP = shapePath.commands[0] as StartPoint;
          if (i.x === startP.x && i.y === startP.y) {
            return false;
          }
        }
        return true;
      })
      .map((i) => {
        // @ts-ignore
        const { relative, ...res } = i;

        return res as BezierPoint;
      });

    return {
      points: points,
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
