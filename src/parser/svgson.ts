import * as svgson from 'svgson';
import { SVGPathData } from 'svg-pathdata';

import Frame from '../models/Base/Frame';
import ShapePath from '../models/Layer/ShapePath';
import ShapeGroup from '../models/Layer/ShapeGroup';
import Ellipse from '../models/Layer/Ellipse';
import Rectangle from '../models/Layer/Rectangle';
import Group from '../models/Layer/Group';
import Text from '../models/Layer/Text';

import Style from '../models/Style/Style';
import TextStyle from '../models/Style/TextStyle';
import Gradient from '../models/Style/Gradient';
import Fill from '../models/Style/Fill';
import Color from '../models/Style/Color';

import {
  SketchFormat,
  AnyLayer,
  FrameType,
  ShapeGroupType,
  SvgDefsStyle,
  SvgLayerType,
} from '../types';

/**
 * 计算 Frame 的缩放比例
 */
export const calcFrameScale = (
  originFrame: FrameType,
  targetFrame: FrameType,
) => {
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
 * 一致化缠绕规则参数
 * @param ruleStr
 */
export const normalizeWindingRule = (ruleStr?: string) => {
  const rule = ruleStr?.toLowerCase();
  if (rule && ['nonzero', 'nozero', 'non-zero', 'no-zero'].includes(rule)) {
    return SketchFormat.WindingRule.NonZero;
  }
  return SketchFormat.WindingRule.EvenOdd;
};

/**
 * 获取 svgPath 的内部定界框
 * @param svgPath svg 的path路径
 */
export const getSvgPathGroupFrame = (svgPath: string) => {
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
 * 将 Path 转为贝赛尔曲线
 * @param svgPath 路径
 */
export const pathToShapeGroup = (svgPath: string): ShapeGroupType => {
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
  const groupFrame = getSvgPathGroupFrame(svgPath);

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
 * SVG 对象
 */
export class Svgson {
  constructor(
    svgString: string,
    {
      width,
      height,
    }: {
      width?: number;
      height?: number;
    },
  ) {
    if (!svgString) return;
    // --------- 处理 Svg String 变成 Svg Shape ---------- //

    let result = svgson.parseSync(svgString, { camelcase: true });

    // 排除一下 svg 的循环嵌套的问题
    while (result.children.length === 1 && result.children[0].name === 'svg') {
      [result] = result.children;
    }

    const { children, attributes } = result;

    const { viewBox } = attributes;

    // 解析获得 viewBox 值
    const [viewX, viewY, viewWidth, viewHeight] = viewBox
      ?.split(' ')
      .map(parseFloat);
    this.viewBox = new Frame({
      x: viewX || 0,
      height: viewHeight || height,
      width: viewWidth || width,
      y: viewY || 0,
    });
    this.aspectRatio = calcFrameScale(this.viewBox.toJSON(), {
      height: height || viewHeight,
      width: width || viewWidth,
      x: 0,
      y: 0,
    });
    if (!children) return;

    const background = new Rectangle(this.viewBox.toJSON());
    background.name = '容器';
    background.hasClippingMask = true;

    // ------ 将 Svg 的子节点转换成子图层 ------ //
    this.layers = children.map(this.parseSvgson).filter((c) => c) as [];
    this.layers.unshift(background);

    // 根据 viewBox 进行相应的偏移操作
    this.layers.forEach((layer) => {
      layer.frame.offset(-this.viewBox.x, -this.viewBox.y);
    });

    // 对内部每个图层都进行坐标变换 //
    this.layers.forEach(this.scaleLayersToFrame);
  }

  /**
   * 缩放比例
   */
  aspectRatio: number = 1;

  /**
   * svg 的 ViewBox
   */
  viewBox = new Frame();

  /**
   * Svg 包含的图层对象
   * 每一个对象都是 SvgLayer 类型
   */
  layers: AnyLayer[] = [];

  /**
   * 全局描述
   * @private
   */
  defs: (Gradient | SvgDefsStyle)[] = [];

  shapes: { path: string; style?: string }[] = [];

  static init(): Svgson {
    return new Svgson('', {});
  }

  /**
   * 将图层
   */
  scaleLayersToFrame = (layer: AnyLayer) => {
    layer.frame.scale(this.aspectRatio);
    if (layer.class === 'text') {
      (layer as Text).textStyle.fontSize *= this.aspectRatio;
    }
    if (layer.layers.length > 0) {
      layer.layers.forEach(this.scaleLayersToFrame);
    }
  };

  // ---------- Svgson 解析方法群 ---------- //
  // ------------------------------------- //

  /**
   * 解析 Svgson 变成 layer
   * @param node
   */
  parseSvgson = (node: svgson.INode): SvgLayerType => {
    switch (node.name) {
      // 全局定义
      case 'defs':
        this.defs = node.children.map(Svgson.parseSvgDefs) as [];
        break;
      // 编组
      case 'g':
        return this.parseNodeToGroup(node);
      // 路径
      case 'path':
        return this.parseSvgsonPathToShape(node);
      // 椭圆
      case 'ellipse':
        return this.parseNodeToEllipse(node);
      // 圆形
      case 'circle':
        return this.parseNodeToCircle(node);
      // 矩形
      case 'rect':
        return this.parseNodeToRectangle(node);
      // 多边形
      case 'polygon':
        // return Svg.parseNodeToPolygon(node);
        break;
      // 文本
      case 'text':
        return this.parseNodeToText(node);
      case 'svg':
        return node.children.map(this.parseSvgson);
      default:
    }
  };

  /**
   * 将节点解析为 pathShape
   * @param node
   */
  parseSvgsonPathToShape(node: svgson.INode) {
    const { attributes, name } = node;
    // 如果没有对象的话 就直接结束
    if (name !== 'path') return;

    // ------ 进行统一的坐标和尺寸变换 -------- //
    const path = new SVGPathData(attributes.d).toAbs().encode();

    const shapeGroupType = pathToShapeGroup(path);

    const isClose = !shapeGroupType.shapes.every((shape) => !shape.isClose);
    const shapePaths = this.shapeGroupDataToLayers(shapeGroupType);

    if (shapePaths.length === 1) {
      const shapePath = shapePaths[0];
      shapePath.style = this.parseNodeAttrToStyle(node.attributes, isClose);
    }
    const shapeGroup = new ShapeGroup(shapeGroupType.frame);

    shapeGroup.addLayers(shapePaths);
    shapeGroup.style = this.parseNodeAttrToStyle(node.attributes, isClose);

    return shapeGroup;
  }

  /**
   * 将 svg 的 Defs 解析成相应的对象
   * @param defsNode
   */
  static parseSvgDefs(defsNode: svgson.INode) {
    const { attributes, name, children } = defsNode;
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
            const { offset, stopColor, stopOpacity } = item.attributes;
            const color = new Color(stopColor);

            return {
              color: [
                color.red,
                color.green,
                color.blue,
                Number(stopOpacity) || 1,
              ],
              offset: parseFloat(offset) / 100,
            };
          }),
        });
      case 'radialGradient':
        console.log(attributes);
        return new Gradient({
          type: SketchFormat.GradientType.Radial,
          name: attributes.id,
          from: {
            // 解析得到的是 109% 这样的值
            x: parseFloat(attributes.fx) / 100,
            y: parseFloat(attributes.fy) / 100,
          },
          to: {
            x: (parseFloat(attributes.cx) + parseFloat(attributes.r)) / 100,
            y: parseFloat(attributes.cy) / 100,
          },
          // radius: parseFloat(attributes.r) / 100,
          stops: defsNode.children.map((item) => {
            const { offset, stopColor, stopOpacity } = item.attributes;
            const color = new Color(stopColor);

            console.log(stopOpacity);

            const opacity = Number(stopOpacity);

            return {
              color: [
                color.red,
                color.green,
                color.blue,
                isNaN(opacity) ? 1 : opacity,
              ],
              offset: parseFloat(offset) / 100,
            };
          }),
        });
      case 'style':
        // eslint-disable-next-line no-case-declarations
        const style = children?.[0]?.value;
        if (!style) return;

        // eslint-disable-next-line no-case-declarations
        const rules = Style.parseClassStyle(style);
        return { class: 'classStyle', rules };
      default:
    }
  }

  /**
   * 解析 Node 的 Attribute 变成 style
   * @param attributes node 的属性
   * @param isClose
   */
  parseNodeAttrToStyle = (
    attributes: svgson.INode['attributes'],
    isClose: boolean = true,
  ) => {
    const {
      stroke,
      strokeWidth,
      fill: fillStr,
      style: styleString,
      class: className,
      opacity,
    } = attributes;

    const style = new Style();
    const styleObj = Style.parseStyleString(styleString);

    // 获得具体的 class 规则
    const rule = this.getCssRuleByClassName(className);
    if (rule) {
      const { styles } = rule;

      // 处理 fill
      if (styles.fill) {
        const fill = this.getFillByString(styles.fill);
        if (fill) style.fills.push(fill);
      }
    }

    // 如果闭合了的话
    // 直接使用默认填充
    if (isClose) {
      const baseFill = this.getFillByString(fillStr);
      if (baseFill) style.fills.push(baseFill);
    }

    // 如果存在currentColor 则采用 inline Style 的 fill
    if (fillStr === 'currentColor' && styleObj?.fill) {
      style.addColorFill(styleObj.fill);
    }

    if (stroke && stroke !== 'none') {
      style.addBorder({
        thickness: parseFloat(strokeWidth || '1'),
        color: stroke,
        position: SketchFormat.BorderPosition.Center,
      });
    }

    // 设置不透明度
    style.opacity = Number(opacity) || 1;
    return style;
  };

  /**
   * 解析 Node 的 Attribute 变成 textStyle
   * @param attributes node 的属性
   */
  parseNodeAttrToTextStyle = (attributes: svgson.INode['attributes']) => {
    const {
      fontSize,
      lineHeight,
      class: className,
      style: styleString,
    } = attributes;

    const style = new TextStyle({
      fontSize: parseFloat(fontSize) || 14,
      lineHeight: parseFloat(lineHeight) || 22,
    });
    const styleObj = Style.parseStyleString(styleString);

    if (styleObj) {
      // console.log(styleObj);
    }

    const rule = this.getCssRuleByClassName(className);
    // 获得具体的规则
    if (rule) {
      const { styles } = rule;

      if (styles.fill) {
        style.color = new Color(styles.fill);
      }

      if (styles.fontSize) {
        style.fontSize = parseFloat(styles.fontSize);
      }

      if (styles.lineHeight) {
        style.lineHeight = parseFloat(styles.lineHeight);
      }
    }

    return style;
  };

  /**
   * 将 g 节点解析为 Group
   * @param node
   */
  parseNodeToGroup = (node: svgson.INode): Group => {
    const group = new Group();

    const layers = node.children.map(this.parseSvgson).filter((c) => c);
    if (layers && layers.length > 0) {
      group.addLayers(layers as []);
    }

    const { height, width } = group.getSize();

    group.height = height;
    group.width = width;
    group.name = '编组';

    // TODO 确认缠绕规则
    // const { fillRule } = node.attributes;
    // group.windingRule = normalizeWindingRule(fillRule);
    return group;
  };

  /**
   * 将 ellipse 的节点解析为椭圆
   * @param node
   */
  parseNodeToEllipse(node: svgson.INode): Ellipse | undefined {
    if (!node || (node && node.name !== 'ellipse')) return;

    const { rx, ry, cx, cy } = node.attributes;
    const style = this.parseNodeAttrToStyle(node.attributes);

    const ellipse = new Ellipse({
      cx: parseFloat(cx),
      cy: parseFloat(cy),
      rx: parseFloat(rx),
      ry: parseFloat(ry),
    });
    ellipse.name = '椭圆';
    ellipse.style = style;

    return ellipse;
  }

  /**
   * 将 ellipse 的节点解析为圆
   * @param node
   */
  parseNodeToCircle(node: svgson.INode): Ellipse | undefined {
    if (!node || (node && node.name !== 'circle')) return;

    const { r, cx, cy } = node.attributes;
    const style = this.parseNodeAttrToStyle(node.attributes);

    const ellipse = new Ellipse({
      cx: parseFloat(cx),
      cy: parseFloat(cy),
      rx: parseFloat(r),
      ry: parseFloat(r),
    });

    ellipse.style = style;

    return ellipse;
  }

  /**
   * 将 ellipse 的节点解析为矩形
   * @param node
   */
  parseNodeToRectangle(node: svgson.INode) {
    const { name, attributes } = node;
    if (name !== 'rect') return;

    const { x, y, width, height, rx } = attributes;
    const style = this.parseNodeAttrToStyle(attributes);

    const rect = new Rectangle({
      cornerRadius: parseFloat(rx),
      width: parseFloat(width),
      height: parseFloat(height),
      x: parseFloat(x),
      y: parseFloat(y),
    });
    rect.style = style;
    return rect;
  }

  /**
   * 将 text 的节点解析为文本
   * @param node
   */
  parseNodeToText(node: svgson.INode): Text | undefined {
    const { name, attributes, children } = node;
    if (name !== 'text') return;

    const { transform } = attributes;
    const positionStr = /translate\((.*)\)/.exec(transform)?.[1];

    const position = positionStr?.split(' ');

    const style = this.parseNodeAttrToTextStyle(attributes);

    const text = new Text({
      width: 0,
      height: 0,
      x: parseFloat(position?.[0] || '0'),
      y: parseFloat(position?.[1] || '0'),
      text: children?.[0]?.value,
    });
    text.textStyle = style;
    return text;
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
   * 从 Defs 中获取样式表
   * @param className
   */
  private getCssRuleByClassName = (className: string | undefined) => {
    if (!className) return;
    // 拿到样式表
    const classStyle = this.defs.find(
      (d) => d.class === 'classStyle',
    ) as SvgDefsStyle;

    // 获得具体的规则
    return classStyle?.rules.find((r) => r.className === `.${className}`);
  };

  /**
   * 根据 fill 字符填充 Fill 对象
   * @param fill 填充文本
   */
  private getFillByString = (fill: string) => {
    if (fill === 'none') return;

    // TODO 针对 path 类型的对象 如果没有 fill 不能默认填充黑色
    if (!fill) {
      return new Fill({ type: SketchFormat.FillType.Color, color: '#000' });
    }

    if (fill.startsWith('url')) {
      // 说明来自 defs
      const id = /url\(#(.*)\)/.exec(fill)?.[1];
      // 从 defs 中拿到相应的配置项
      const defsFill = this.defs.find(
        (def) => def?.class === 'gradient' && def.name === id,
      );

      switch (defsFill?.class) {
        case 'gradient':
          // eslint-disable-next-line no-case-declarations
          const newFill = new Fill({});
          newFill.type = SketchFormat.FillType.Gradient;
          newFill.gradient = defsFill;
          return newFill;
        default:
      }
    } else {
      return new Fill({
        type: SketchFormat.FillType.Color,
        color: fill,
      });
    }
  };
}
