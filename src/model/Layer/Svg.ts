import { SVGPathData } from 'svg-pathdata';
import {
  CommandA,
  CommandC,
  CommandL,
  CommandM,
  CommandS,
  SVGCommand,
} from 'svg-pathdata/lib/types';
import { BaseLayerParams } from './Base';
import { SketchFormat } from '../../index';
import ShapeGroup from './ShapeGroup';
import ShapePath from './ShapePath';
import Frame from '../Frame';

export type SVG = {
  _class: 'svg';
  rawSVGString: string;
  frame: SketchFormat.Rect;
  resizingConstraint: number;
  hasClippingMask: boolean;
};

export type BezierPoint = CommandM | CommandL | CommandC | CommandS | CommandA;

interface SvgShape {
  points: BezierPoint[];
  frame: Frame;
  isClose: boolean;
}

interface SvgInitParams extends BaseLayerParams {
  path: string;
}

/**
 * SVG 对象
 */
class Svg extends ShapeGroup {
  rawSVGString: string;
  constructor({ x, y, width, height, path }: SvgInitParams) {
    super({ height, width, y, x });
    this.class = 'svg';

    this.name = 'svg';

    this.rawSVGString = path;
    const { shapes, frame: groupFrame } = Svg.convertPathToShapeGroup(path);

    this.layers = shapes.map((shape) => {
      const { points, isClose, frame } = shape;
      return new ShapePath({ points, isClose, ...frame.toJSON() });
    });

    this.frame.width = groupFrame.width;
    this.frame.height = groupFrame.height;
  }

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
  static convertPathToShapeGroup = (
    svgPath: string
  ): { shapes: SvgShape[]; frame: { width: number; height: number } } => {
    // 获取 shapeGroup 的 frame
    let shapeGroup = new SVGPathData(svgPath);
    const bounds = shapeGroup.getBounds();
    const groupFrame = {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
    };

    // 将 shape group 根据点类型进行划分
    let shapes = [];

    let points = [];
    const { minX, minY } = bounds;

    shapeGroup = shapeGroup
      .translate(-minX, -minY)
      // .aToC() // 将所有圆弧转为 curve
      // .normalizeHVZ() // 将 HVZ 转为直线
      // .normalizeST() // 将 smooth curve 转为curve
      .transform(Svg.normalizationXY(groupFrame.width, groupFrame.height))
      .toAbs();

    // 拆分 shape
    for (const command of shapeGroup.commands) {
      // 碰到 Move_TO 且这个时候 shape 里面有东西
      // 清空 shape 并把 shape 添加到 shape里
      if (command.type === SVGPathData.MOVE_TO && points.length > 0) {
        shapes.push({ points });
        points = [];
      }
      // 正常情况下直接加入这个指令
      points.push(command);
    }
    // 将最后一组shape 加入 shapes 中
    if (points.length > 0) {
      shapes.push({ points });
    }

    // 对 shapes 进行重构
    shapes = shapes.map((shape) => {
      // 判断shape是否闭合
      const isClose = shape.points.findIndex((i) => i.type === 1) > -1;

      const points = shape.points
        .filter(
          (i) =>
            // 清理 Z
            i.type !== SVGPathData.CLOSE_PATH
        )
        .map((i) => {
          // @ts-ignore
          const { relative, ...res } = i;

          return res;
        });
      return { points, isClose };
    });

    return {
      shapes,
      frame: groupFrame,
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
