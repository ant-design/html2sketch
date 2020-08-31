import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import * as svgson from 'svgson';
import { SVGPathData } from 'svg-pathdata';

import BaseLayer from '../Base/BaseLayer';
import ShapePath from './ShapePath';
import ShapeGroup from './ShapeGroup';
import { FrameType } from '../Base/Frame';

import { getUseReplacement, inlineStyles } from '../../utils/svg';
import { defaultExportOptions } from '../utils';
import { getGroupLayout } from '../../utils/layout';
import Style from '../Style/Style';
import { ShapeGroupType, SvgShape, BaseLayerParams, SvgEllipse } from '../type';

interface SvgInitParams extends Partial<BaseLayerParams> {
  svgString: string;
}

/**
 * SVG 对象
 */
class Svg extends BaseLayer {
  constructor({ x, y, width, height, svgString }: SvgInitParams) {
    super('svg', {
      height,
      width,
      y,
      x,
    });

    this.name = 'svg';
    this.rawSVGString = svgString;

    // --------- 处理 Svg String 变成 Svg Shape ---------- //
    const { children } = svgson.parseSync(svgString, { camelcase: true });
    // --------- 处理 Svg 的 Frame ------- //

    // ------ 将 Svg 的子节点转换成内部格式 ------ //

    // @ts-ignore
    let shapes: SvgShape[] = children

      // eslint-disable-next-line array-callback-return
      .map((node) => {
        const { attributes, name } = node;
        switch (name) {
          case 'path':
            return {
              path: attributes.d,
              style: attributes.style,
              layers: [],
            };
          default:
        }
      })
      .filter((n) => n);

    // 如果没有对象的话 就直接结束
    if (shapes.length === 0) return;

    const fullPathString = shapes.reduce((prev, current) => {
      return { path: prev.path + current.path, layers: [] };
    }).path;

    // 计算定界框的缩放尺寸
    const shapeGroupFrame = Svg.getSvgPathGroupFrame(fullPathString);
    const scaleShapeGroupToFrame = Svg.calcFrameScale(
      shapeGroupFrame,
      this.frame.toJSON(),
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

      // 添加样式
      if (styleString) {
        const styleObj = Style.parserStyleString(styleString);
        const style = new Style();
        if (styleObj) {
          style.addColorFill(styleObj.fill);
        }
        shapeGroup.style = style;
      }
      shapeGroup.addLayers(shapePaths);

      this.addLayer(shapeGroup);
    });
  }

  /**
   * Svg 包含的图层对象
   * 每一个对象都是 ShapeGroup 类型
   */
  layers: ShapeGroup[] = [];

  shapes: SvgShape[] = [];

  /**
   * 原生 Svg 字符串
   */
  rawSVGString: string;

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
      layer.resizingConstraint = this.resizingConstraint;
      return layer.toSketchJSON() as SketchFormat.ShapeGroup;
    }
    return {
      _class: 'group',
      do_objectID: this.id,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isVisible: true,
      isLocked: this.locked,
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
   * 将 Path 转为贝赛尔曲线
   * @param svgPath 路径
   */
  static pathToShapeGroup = (svgPath: string): ShapeGroupType => {
    // ------ 第一步: 获取有效的 Path 数组 ---------- //
    // 将 多个 svg 通过 M 符号进行分割
    const pathStr = svgPath.split(/([Mm])/).filter((s) => s);
    if (pathStr.length % 2 !== 0) {
      throw Error(
        `Error Path!\nData:${svgPath}\nPlease check whether the path is correct.`,
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
      for (let i = 0; i < shape.points.length; i += 1) {
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
   * 将 svgon 解析出来的 node 转变为 svgShape
   * @param node
   */
  static parseSvgsonToSvgShapes = (
    node?: svgson.INode,
  ): SvgShape | SvgShape[] | undefined => {
    if (!node) return;
    const { children } = node;
    if (children.length > 0) {
      const svgShapes = children.map(Svg.parseSvgsonToSvgShape);
      return svgShapes.filter((s) => s) as SvgShape[];
    }
    return Svg.parseSvgsonToSvgShape(node);
  };

  static parseSvgsonToSvgShape = (
    node: svgson.INode,
  ): SvgShape | SvgShape[] | undefined => {
    const { children, attributes, name, type, value } = node;

    let layers: SvgShape[] = [];

    switch (name) {
      // 入口
      case 'svg':
        if (children.length > 0) {
          const svgShapes = children.map(Svg.parseSvgsonToSvgShape);
          layers = svgShapes.filter((s) => s) as SvgShape[];
        }
        return layers;
      // 编组
      case 'g':
        if (children.length > 0) {
          const svgShapes = children.map(Svg.parseSvgsonToSvgShape);
          layers = svgShapes.filter((s) => s) as SvgShape[];
        }
        return {
          type: 'group',
          layers,
          path: '',
          style: attributes.style,
        };
      case 'defs':
        return {};

      // path
      case 'path':
        return {
          path: attributes.d,
          style: attributes.style,
          layers,
        };
      // 圆形
      case 'ellipse':
        return {
          style: attributes.style,
        };

      // 两者是无关紧要的信息
      case 'title':
      case 'desc':
      default:
    }
  };

  /**
   * 将 svg node 转换为 svg Group 对象
   */
  static parseGNodeToGroup = (node: svgson.INode): SvgShape | undefined => {
    if (node.name !== 'g') return;

    const { attributes } = node;
    const { fillRule } = attributes;

    const layers = node.children.map(Svg.parseSvgsonToSvgShapes) as SvgShape[];

    const style = Svg.parseNodeAttrToStyle(attributes); // 解析样式

    return {
      type: 'group',
      layers: layers || [],
      windingRule: Svg.normalizeWindingRule(fillRule),
      style,
      path: '',
    };
  };

  /**
   * 一致化缠绕规则参数
   * @param ruleStr
   */
  static normalizeWindingRule = (ruleStr?: string) => {
    const rule = ruleStr?.toLowerCase();
    if (rule && ['nonzero', 'nozero', 'non-zero', 'no-zero'].includes(rule)) {
      return SketchFormat.WindingRule.NonZero;
    }
    return SketchFormat.WindingRule.EvenOdd;
  };

  /**
   * 解析 Node 的 Attribute 变成 style
   * @param attributes node 的属性
   */
  static parseNodeAttrToStyle = (attributes: svgson.INode['attributes']) => {
    const { stroke, strokeWidth, fill, style } = attributes;

    const fills = [];
    const strokes = [];
    if (fill !== 'none') {
      fills.push(fill);
    }
    if (stroke !== 'none') {
      strokes.push({ stroke, width: strokeWidth });
    }
    return {
      fills,
      strokes,
      style,
    };
  };

  /**
   * 将 ellipse 的节点解析为椭圆
   * @param node
   */
  static parseNodeToEllipse = (node: svgson.INode): SvgEllipse | undefined => {
    if (!node || (node && node.name !== 'ellipse')) return;

    const { cx, cy, rx, ry } = node.attributes;
    return {
      type: 'ellipse',
      frame: { width: rx * 2, height: ry * 2 },
      style: Svg.parseNodeAttrToStyle(node.attributes),
      layers: [],
    };
  };
}

export default Svg;
