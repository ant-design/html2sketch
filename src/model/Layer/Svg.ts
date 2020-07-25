import SketchFormat from '@sketch-hq/sketch-file-format-ts';

import { SVGPathData } from 'svg-pathdata';

import { BaseLayerParams } from './Base';

import ShapeGroup, { ShapeGroupType } from './ShapeGroup';
import ShapePath from './ShapePath';
import { getUseReplacement, inlineStyles } from '../../helpers/svg';
import { defaultExportOptions } from '../utils';
import { getGroupLayout } from '../../helpers/layout';
import { FrameType } from '../Frame';
import { Style } from '../index';

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

export interface SvgShape {
  path: string;
  style?: any;
  /**
   * 缠绕规则 奇偶缠绕和非零缠绕
   * 详情见
   * @see https://www.yuque.com/arvinxx/fontend/7ad6671c-d309-40fc-a0a8-55888f508289
   */
  windingRule?: SketchFormat.WindingRule;
}

interface SvgInitParams extends BaseLayerParams {
  shapes: SvgShape[];
  svgString?: string;
}

/**
 * SVG 对象
 */
class Svg extends ShapeGroup {
  constructor({ x, y, width, height, shapes, svgString }: SvgInitParams) {
    super({ height, width, y, x });
    this.class = 'svg';

    this.shapes = shapes;
    this.name = 'svg';
    this.rawSVGString = svgString;

    // 只有一条路径的话
    if (shapes.length === 0) return;
    if (shapes.length === 1) {
      const { path } = shapes[0];
      const shapeGroup = Svg.pathToShapeGroup(path);

      this.layers = this.shapeGroupDataToLayers(shapeGroup);
    }
    // 多条路径的话
    else {
      shapes.forEach((shape) => {
        const { path } = shape;
        const shapeGroupType = Svg.pathToShapeGroup(path);

        const shapePaths = this.shapeGroupDataToLayers(shapeGroupType);

        const shapeGroup = new ShapeGroup(shapeGroupType.frame);
        shapeGroup.addLayers(shapePaths);

        this.addLayer(shapeGroup);
      });
    }
  }
  /**
   * 添加图层
   * @param layer
   */
  // @ts-ignore
  addLayer(layer: ShapeGroup) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置,得到算出相对位置
    layer.x -= this.x;
    layer.y -= this.y;
    this.layers.push(layer);
  }
  // @ts-ignore
  layers: (ShapeGroup | ShapePath)[] = [];

  shapes: SvgShape[];

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
  static pathToShapeGroup = (svgPath: string): ShapeGroupType => {
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

  /**
   * ShapeGroup 转子图层方法
   * @param shapeGroup
   */
  shapeGroupDataToLayers = (shapeGroup: ShapeGroupType) => {
    const { frame: innerFrame, shapes } = shapeGroup;

    const scale = Svg.calcFrameScale(innerFrame, this.frame.toJSON());

    return shapes.map((shape) => {
      const { points, isClose, frame } = shape;

      // 确定缩放后的长宽

      return new ShapePath({
        points,
        isClose,

        width: frame.width * scale,
        height: frame.height * scale,
        // 需要计算与 innerFrame 的相对坐标
        // https://www.yuque.com/design-engineering/sketch-dev/hsbz8m#OPWbw
        x: (frame.x - innerFrame.x) * scale,
        y: (frame.y - innerFrame.y) * scale,
      });
    });
  };

  /**
   * 计算 Frame 的缩放比例
   */
  static calcFrameScale = (originFrame: FrameType, targetFrame: FrameType) => {
    const targetAspectRatio = targetFrame.width / targetFrame.height;
    const originAspectRatio = originFrame.width / originFrame.height;

    let scale = 1;
    // 确定缩放比例
    // 如果目标长宽比大于自身的
    // scale 是高度比
    if (targetAspectRatio > originAspectRatio) {
      scale = targetFrame.height / originFrame.height;
    }
    if (targetAspectRatio < originAspectRatio) {
      scale = targetFrame.width / originFrame.width;
    }

    return scale;
  };

  /**
   * 将 Svg Node 转为 SvgString
   * @param svgNode
   */
  static getSVGString = (svgNode: Element): string => {
    // NOTE: this code modifies the original node by inlining all styles
    // this is not ideal and probably fixable
    const queue = Array.from(svgNode.children);

    while (queue.length) {
      const node = queue.pop();

      if (
        !(node instanceof SVGElement) ||
        node instanceof SVGDefsElement ||
        node instanceof SVGTitleElement
      ) {
        continue;
      }

      if (node instanceof SVGUseElement) {
        const replacement = getUseReplacement(node);

        if (replacement) {
          node.parentNode!.replaceChild(replacement, node);
          queue.push(replacement);
        }
        continue;
      }

      inlineStyles(node);

      Array.from(node.children).forEach((child) => queue.push(child));
    }

    return svgNode.outerHTML;
  };

  /**
   * 转换为 Sketch
   */
  // @ts-ignore
  toSketchJSON(): SketchFormat.Group | SketchFormat.ShapeGroup {
    if (this.shapes.length <= 1)
      return super.toSketchJSON() as SketchFormat.ShapeGroup;
    else {
      return {
        _class: 'group',
        do_objectID: this.id,
        booleanOperation: SketchFormat.BooleanOperation.NA,
        isFixedToViewport: false,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isVisible: true,
        isLocked: this.isLocked,
        layerListExpandedType: 0,
        name: this.name || this.class,
        nameIsFixed: false,
        resizingConstraint: this.resizingConstraint,
        resizingType: SketchFormat.ResizeType.Stretch,
        rotation: 0,
        shouldBreakMaskChain: false,
        exportOptions: defaultExportOptions,
        frame: this.frame.toSketchJSON(),
        clippingMaskMode: 0,
        hasClippingMask: this.hasClippingMask,
        style: this.style.toSketchJSON(),
        hasClickThrough: false,
        groupLayout: getGroupLayout(),
        layers: this.layers.map((layer) => layer.toSketchJSON()),
      };
    }
  }
}

export default Svg;
