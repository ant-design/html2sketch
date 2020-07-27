import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import * as svgson from 'svgson';
import { SVGPathData } from 'svg-pathdata';

import Base, { BaseLayerParams } from './Base';
import ShapePath from './ShapePath';
import ShapeGroup, { ShapeGroupType } from './ShapeGroup';
import { FrameType } from '../Frame';

import { getUseReplacement, inlineStyles } from '../../helpers/svg';
import { defaultExportOptions } from '../utils';
import { getGroupLayout } from '../../helpers/layout';
import { Style } from '../Style/Style';

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

interface SvgInitParams extends Partial<BaseLayerParams> {
  svgString: string;
}

/**
 * SVG 对象
 */
class Svg extends Base {
  constructor({ x, y, width, height, svgString }: SvgInitParams) {
    super({
      height,
      width,
      y,
      x,
    });
    this.class = 'svg';
    this.name = 'svg';
    this.rawSVGString = svgString;

    // --------- 处理 Svg String 变成 Svg Shape ---------- //
    const { children } = svgson.parseSync(svgString);
    // ------ 处理 Svg 的 Frame ------- //

    // ------ 将 Svg 的子节点转换成内部格式 ------ //
    let shapes: SvgShape[] = children
      .map((node) => {
        const { attributes, name } = node;
        switch (name) {
          case 'path':
            return {
              path: attributes.d,
              style: attributes.style,
            };
        }
      })
      .filter((n) => n);
    const fullPathString = shapes.reduce((prev, current) => {
      return { path: prev.path + current.path };
    }).path;

    // 计算定界框的缩放尺寸
    const shapeGroupFrame = Svg.getSvgPathGroupFrame(fullPathString);
    const scaleShapeGroupToFrame = Svg.calcFrameScale(
      shapeGroupFrame,
      this.frame.toJSON()
    );
    // ------ 进行统一的坐标和尺寸变换 -------- //
    shapes = shapes.map((s) => ({
      ...s,
      path: new SVGPathData(s.path)
        // 将 shapeGroup 的坐标设为 0,0
        .translate(-shapeGroupFrame.x, -shapeGroupFrame.y)
        // 将 shapeGroup 与给定定界框 match 变成符合外部画板的尺寸
        .scale(scaleShapeGroupToFrame, scaleShapeGroupToFrame)
        .encode(),
    }));

    this.shapes = shapes;

    // ----- 对处理后的 shape 进行图形解析 ------ //

    shapes.forEach((shape) => {
      const { path, style: styleString } = shape;

      const shapeGroupType = Svg.pathToShapeGroup(path);

      const shapePaths = this.shapeGroupDataToLayers(shapeGroupType);

      const shapeGroup = new ShapeGroup(shapeGroupType.frame);

      const styleObj = Style.parserStyleString(styleString);

      const { fill } = styleObj;
      const style = new Style();
      if (fill) {
        style.addColorFill(styleObj.fill);
      }
      shapeGroup.style = style;
      shapeGroup.addLayers(shapePaths);

      this.addLayer(shapeGroup);
    });
  }

  /**
   * 添加图层
   * @param layer
   */
  addLayer(layer: ShapeGroup) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置,得到算出相对位置
    layer.x -= this.x;
    layer.y -= this.y;
    super.addLayer(layer);
  }

  /**
   * Svg 包含的图层对象
   * 每一个对象都是 ShapeGroup 类型
   */
  layers: ShapeGroup[] = [];

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
    // ------ 第一步: 获取有效的 Path 数组 ---------- //
    // 将 多个 svg 通过 M 符号进行分割
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

    // ------ 第二步: 获取这组Path的 frame ---------- //

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
    const { shapes } = shapeGroup;

    return shapes.map((shape) => {
      const { points, isClose, frame } = shape;

      return new ShapePath({
        points,
        isClose,

        width: frame.width,
        height: frame.height,
        // 需要计算与 innerFrame 的相对坐标
        // https://www.yuque.com/design-engineering/sketch-dev/hsbz8m#OPWbw
        x: frame.x,
        y: frame.y,
      });
    });
  };

  /**
   * 获取 svgPath 的内部定界框
   * @param svgPath svg 的path路径
   */
  static getSvgPathGroupFrame = (svgPath: string) => {
    const shapeGroup = new SVGPathData(svgPath);
    const bounds = shapeGroup.getBounds();
    return {
      width: bounds.maxX - bounds.minX,
      height: bounds.maxY - bounds.minY,
      x: bounds.minX,
      y: bounds.minY,
    };
  };

  /**
   * 计算 Frame 的缩放比例
   */
  static calcFrameScale = (originFrame: FrameType, targetFrame: FrameType) => {
    const targetAspectRatio = targetFrame.width / targetFrame.height;
    const originAspectRatio = originFrame.width / originFrame.height;
    // 确定缩放比例

    // 如果目标长宽比大于自身的
    // scale 是高度比
    let scale = targetFrame.height / originFrame.height;

    // 否则是 scale 是长度比
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
   * 转换为 Sketch 对象
   * 会自动识别ShapeGroup 中是否只包含一个对象
   * 从而清理无用的 ShapeGroup
   */
  toSketchJSON(): SketchFormat.Group | SketchFormat.ShapeGroup {
    if (this.layers.length === 1) {
      const layer = this.layers[0];
      layer.x = this.x;
      layer.y = this.y;
      return layer.toSketchJSON() as SketchFormat.ShapeGroup;
    } else
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
        layers: this.layers.map((layer) => {
          layer.x += this.x;
          layer.y += this.y;
          return layer.toSketchJSON();
        }),
      };
  }
}

export default Svg;
