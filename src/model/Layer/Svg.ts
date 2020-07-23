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
    const { shapes, frame: groupFrame } = Svg.svgPathToShapeGroup(path);

    this.layers = shapes.map((shape) => {
      const { points, isClose, frame } = shape;
      return new ShapePath({ points, isClose, ...frame });
    });

    this.frame.width = groupFrame.width;
    this.frame.height = groupFrame.height;
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
    };
    // 解析每个路径中的shape
    const shapes = paths.map(ShapePath.svgPathToShapePath);

    return {
      shapes,
      frame: groupFrame,
    };
  };
}

export default Svg;
