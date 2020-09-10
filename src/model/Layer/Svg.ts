import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import * as svgson from 'svgson';
import { SVGPathData } from 'svg-pathdata';

import BaseLayer from '../Base/BaseLayer';
import ShapePath from './ShapePath';
import ShapeGroup from './ShapeGroup';
import Ellipse from './Ellipse';
import Rectangle from './Rectangle';
import Group from './Group';

import Gradient from '../Style/Gradient';

import { defaultExportOptions } from '../utils';
import {
  getUseReplacement,
  inlineStyles,
  optimizeSvgString,
} from '../../utils/svg';
import { getGroupLayout } from '../../utils/layout';
import Style from '../Style/Style';
import {
  ShapeGroupType,
  BaseLayerParams,
  FrameType,
  // SvgEllipse,
  // BaseSvgShape,
  // AnySvgShape,
  // SvgPath,
} from '../type';

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

    // ------ 将 Svg 的子节点转换成内部格式 ------ //
    this.layers = children.map(this.parseSvgson).filter((c) => c) as [];

    // @ts-ignore
    // let shapes: { path: string; style?: string }[] = children
    //
    //   // eslint-disable-next-line array-callback-return
    //   .map((node) => {
    //     const { attributes, name } = node;
    //     switch (name) {
    //       case 'path':
    //         return {
    //           path: attributes.d,
    //           style: attributes.style,
    //           layers: [],
    //         };
    //       default:
    //     }
    //   })
    //   .filter((n) => n);
    //
    // // 如果没有对象的话 就直接结束
    // if (shapes.length === 0) return;
    //
    // const fullPathString = shapes.reduce((prev, current) => {
    //   return { path: prev.path + current.path, layers: [] };
    // }).path;
    //
    // // 计算定界框的缩放尺寸
    // const shapeGroupFrame = Svg.getSvgPathGroupFrame(fullPathString);
    // const scaleShapeGroupToFrame = Svg.calcFrameScale(
    //   shapeGroupFrame,
    //   this.frame.toJSON(),
    // );
    // // ------ 进行统一的坐标和尺寸变换 -------- //
    // shapes = shapes.map((s) => ({
    //   ...s,
    //   path: new SVGPathData(s.path)
    //     // 将 shapeGroup 的坐标设为 0,0
    //     .translate(-shapeGroupFrame.x, -shapeGroupFrame.y)
    //     // 将 shapeGroup 与给定定界框 match 变成符合外部画板的尺寸
    //     .scale(scaleShapeGroupToFrame, scaleShapeGroupToFrame)
    //     .encode(),
    // }));
    //
    // this.shapes = shapes;
    //
    // // ----- 对处理后的 shape 进行图形解析 ------ //
    //
    // shapes.forEach((shape) => {
    //   const { path, style: styleString } = shape;
    //
    //   const shapeGroupType = Svg.pathToShapeGroup(path);
    //
    //   const shapePaths = this.shapeGroupDataToLayers(shapeGroupType);
    //
    //   const shapeGroup = new ShapeGroup(shapeGroupType.frame);
    //
    //   // 添加样式
    //   if (styleString) {
    //     const styleObj = Style.parserStyleString(styleString);
    //     const style = new Style();
    //     if (styleObj) {
    //       style.addColorFill(styleObj.fill);
    //     }
    //     shapeGroup.style = style;
    //   }
    //   shapeGroup.addLayers(shapePaths);
    //
    //   this.addLayer(shapeGroup);
    // });
  }

  /**
   * Svg 包含的图层对象
   * 每一个对象都是 Group 或者 ShapeGroup 类型
   */
  layers: (ShapeGroup | Group)[] = [];

  /**
   * 全局描述
   * @private
   */
  defs: any[] = [];

  shapes: { path: string; style?: string }[] = [];

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
  static getSVGString = async (svgNode: Element): Promise<string> => {
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

    return optimizeSvgString(svgNode.outerHTML);
  };

  /**
   * 解析 Svgson 变成 layer
   * @param node
   */
  parseSvgson = (node: svgson.INode) => {
    console.log(node);
    switch (node.name) {
      // 全局定义
      case 'defs':
        this.defs = node.children.map(Svg.parseSvgDefs);
        break;
      // 编组
      case 'g':
        // eslint-disable-next-line no-case-declarations
        const group = new Group();

        // eslint-disable-next-line no-case-declarations
        const layers = node.children.map(this.parseSvgson).filter((c) => c);
        if (layers && layers.length > 0) {
          group.addLayers(layers as []);
        }
        return group;
      // 路径
      case 'path':
        return this.parseSvgsonToPath(node);
      // 椭圆
      case 'ellipse':
        return Svg.parseNodeToEllipse(node);
      // 圆形
      case 'circle':
        return Svg.parseNodeToCircle(node);
      // 矩形
      case 'rect':
        return Svg.parseNodeToRectangle(node);
      // 多边形
      case 'polygon':
        // return Svg.parseNodeToPolygon(node);
        break;
      // 直线
      case 'line':
        break;
      // 文本
      case 'text':
        break;
      default:
    }
  };

  /**
   * 将节点解析为 pathShape
   * @param node
   */
  parseSvgsonToPath(node: svgson.INode) {
    const { attributes, name } = node;
    // 如果没有对象的话 就直接结束
    if (name !== 'path') return;

    // 计算定界框的缩放尺寸
    const shapeGroupFrame = Svg.getSvgPathGroupFrame(attributes.d);
    const scaleShapeGroupToFrame = Svg.calcFrameScale(
      shapeGroupFrame,
      this.frame.toJSON(),
    );
    // ------ 进行统一的坐标和尺寸变换 -------- //
    const path = new SVGPathData(attributes.d)
      // 将 shapeGroup 的坐标设为 0,0
      .translate(-shapeGroupFrame.x, -shapeGroupFrame.y)
      // 将 shapeGroup 与给定定界框 match 变成符合外部画板的尺寸
      .scale(scaleShapeGroupToFrame, scaleShapeGroupToFrame)
      .encode();

    const shapeGroupType = Svg.pathToShapeGroup(path);

    const shapePaths = this.shapeGroupDataToLayers(shapeGroupType);

    const shapeGroup = new ShapeGroup(shapeGroupType.frame);

    shapeGroup.addLayers(shapePaths);

    return shapeGroup;
  }

  /**
   * 将 svg 的 Defs 解析成相应的对象
   * @param defsNode
   */
  static parseSvgDefs(defsNode: svgson.INode) {
    const { attributes, name } = defsNode;
    switch (name) {
      case 'linearGradient':
        return new Gradient({
          name: attributes.id,
          from: {
            // 解析得到的是 109% 这样的值
            x: parseFloat(attributes.x1) / 100,
            y: parseFloat(attributes.y1) / 100,
          },
          to: {
            x: parseFloat(attributes.x2) / 100,
            y: parseFloat(attributes.y2) / 100,
          },
          stops: defsNode.children.map((item) => {
            const {
              // TODO 有待改造 Stop 方法
              // offset,
              stopColor,
            } = item.attributes;
            // const color = new Color(stopColor);
            return stopColor;
          }),
        });
      default:
    }
  }

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
  static parseNodeToEllipse(node: svgson.INode): Ellipse | undefined {
    if (!node || (node && node.name !== 'ellipse')) return;

    const { rx, ry, cx, cy } = node.attributes;

    return new Ellipse({
      cx: parseFloat(cx),
      cy: parseFloat(cy),
      rx: parseFloat(rx),
      ry: parseFloat(ry),
    });
  }

  /**
   * 将 ellipse 的节点解析为圆
   * @param node
   */
  static parseNodeToCircle(node: svgson.INode): Ellipse | undefined {
    if (!node || (node && node.name !== 'circle')) return;

    const { r, cx, cy } = node.attributes;

    return new Ellipse({
      cx: parseFloat(cx),
      cy: parseFloat(cy),
      rx: parseFloat(r),
      ry: parseFloat(r),
    });
  }

  static parseNodeToRectangle(node: svgson.INode) {
    const { name, attributes } = node;
    if (name !== 'rect') return;

    const { x, y, width, height, rx } = attributes;
    return new Rectangle({
      cornerRadius: parseFloat(rx),
      width: parseFloat(width),
      height: parseFloat(height),
      x: parseFloat(x),
      y: parseFloat(y),
    });
  }
}

export default Svg;
