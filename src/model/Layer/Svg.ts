import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import { SVGPathData } from 'svg-pathdata';

import { BaseLayerParams } from './Base';

import ShapeGroup, { ShapeGroupType } from './ShapeGroup';
import ShapePath from './ShapePath';

export type SVG = {
  _class: 'svg';
  rawSVGString: string;
  frame: SketchFormat.Rect;
  resizingConstraint: number;
  hasClippingMask: boolean;
};

export type StartPoint = {
  type: typeof SVGPathData.MOVE_TO;
  x: number;
  y: number;
};
export type CurvePoint = {
  type: typeof SVGPathData.CURVE_TO;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x: number;
  y: number;
};

export type LinePoint = {
  type: typeof SVGPathData.LINE_TO;
  x: number;
  y: number;
};

export type BezierPoint = StartPoint | CurvePoint | LinePoint;

interface SvgInitParams extends BaseLayerParams {
  path: string;
}

/**
 * SVG 对象
 */
class Svg extends ShapeGroup {
  constructor({ x, y, width, height, path }: SvgInitParams) {
    super({ height, width, y, x });
    this.class = 'svg';

    this.name = 'svg';
    this.rawSVGString = path;

    const { shapes, frame: innerFrame } = Svg.svgPathToShapeGroup(path);

    const boundingAspectRatio = width / height;
    const boxAspectRatio = innerFrame.width / height;

    let scale = 1;
    // 确定缩放比例
    // 如果外框长宽比大于 shape
    if (boundingAspectRatio > boxAspectRatio) {
      scale = height / innerFrame.height;
    }
    if (boundingAspectRatio < boxAspectRatio) {
      scale = width / innerFrame.width;
    }

    this.layers = shapes.map((shape) => {
      const { points, isClose, frame } = shape;
      const shapeAspectRadio = frame.width / frame.height;

      // 确定缩放后的长宽
      let realWidth = width;
      let reaHeight = height;
      if (boundingAspectRatio > boxAspectRatio) {
        scale = height / innerFrame.height;
        reaHeight = frame.height * scale;
        realWidth = shapeAspectRadio * reaHeight;
      }
      if (boundingAspectRatio < boxAspectRatio) {
        scale = width / innerFrame.width;
        realWidth = frame.width * scale;
        reaHeight = realWidth / shapeAspectRadio;
      }

      return new ShapePath({
        points,
        isClose,
        width: realWidth,
        height: reaHeight,
        // 需要计算与 innerFrame 的相对坐标
        // https://www.yuque.com/design-engineering/sketch-dev/hsbz8m#OPWbw
        x: (frame.x - innerFrame.x) * scale,
        y: (frame.y - innerFrame.y) * scale,
      });
    });
  }

  /**
   * 原生 Svg 字符串
   */
  rawSVGString: string;
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

  /**
   * 将 Path 转为贝赛尔曲线
   * @param svgPath 路径
   */
  static svgPathToShapeGroup = (svgPath: string): ShapeGroupType => {
    // 将 多个 svg 通过 M 符号进行分割
    // TODO 要看下是否还有其他方式来区分对象
    let pathStr = svgPath.split(/([Mm])/).filter((s) => s);
    if (pathStr.length % 2 !== 0) {
      throw Error(
        `Error Path!\nData:${svgPath}\nPlease check whether the path is correct.`
      );
    }
    const paths = [];
    for (let i = 0; i < pathStr.length; i += 2) {
      const p = pathStr[i] + pathStr[i + 1];
      paths.push(p.trim());
    }
    // 获取 shapeGroup 的 frame
    const shapeGroup = new SVGPathData(svgPath);
    const bounds = shapeGroup.getBounds();
    const groupFrame = {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
      x: bounds.minX,
      y: bounds.minY,
    };
    // 解析每个路径中的shape
    const shapes = paths.map(ShapePath.svgPathToShapePath).filter((shape) => {
      // 需要对 shape 进行清理,如果只有两个点,起点和终点,直接过滤
      for (let i = 0; i < shape.points.length; i++) {
        const point = shape.points[i];
        if (isNaN(point.x) || isNaN(point.y)) {
          return false;
        }
      }

      return true;
    });

    return {
      shapes,
      frame: groupFrame,
    };
  };
}

export default Svg;
