import { defaultNodeStyle } from '../model/utils';

import transferToSvg from '../parser/svg';
import transferToShape from '../parser/shape';
import transferToText from '../parser/text';

import { isTextVisible } from '../helpers/visibility';
import { isTextNode } from '../helpers/nodeType';
import { AnyLayer } from '../model/utils';

/**
 * 是否是默认样式
 */
const isDefaultStyles = (styles: CSSStyleDeclaration) =>
  Object.keys(defaultNodeStyle).every((key) => {
    // @ts-ignore
    const defaultValue = defaultNodeStyle[key];
    // @ts-ignore
    const value = styles[key];

    return defaultValue === value;
  });

/**
 * 是否是 SVG 的子级
 */
const isSVGDescendant = (node: Element) =>
  node instanceof SVGElement && node.matches('svg *');

/**
 * 获取相对定位
 * @param {Element} node 节点
 * @param {string} align 对齐
 */
export let getRelativeXY: (
  node: Element,
  align?: string
) => { x: number; y: number };

/**
 * 将节点转为 sketch JSON 对象
 * @param {HTMLElement} node 节点
 * @param {HTMLElement} options? 配置项
 */
const nodeToSketchLayers = (node: Element): AnyLayer[] => {
  const layers: any[] = [];

  const styles: CSSStyleDeclaration = getComputedStyle(node);

  const nodeName = node.nodeName.toLowerCase();
  console.log('处理节点为:', node.id || node.className || nodeName, node);

  // ----- 初步判断 ------ //
  // skip Svg child nodes as they are already covered by `new Svg(…)`
  if (isSVGDescendant(node)) {
    console.log('SVG 内部节点,跳过...');
    return layers;
  }

  // ---------- 处理子节点 ---------- //

  // 使用 Rect 类, 图片填充到 Fill 里
  const isImage = nodeName === 'img' && (node as HTMLImageElement).currentSrc;
  // 图层存在样式(阴影 边框等) 使用 Rect 类
  const isShape = !isDefaultStyles(styles);
  // 使用 SVG 类
  const isSVG = nodeName === 'svg';
  // 使用 Text 类
  const isText = isTextNode(node);

  // 如果图层存在样式(阴影 边框等 返回 shape 节点
  if (isImage || isShape) {
    const shape = transferToShape(node);
    console.log('转换为 Rectangle: ', shape);
    layers.push(shape);
    // 添加后继续执行,不终止
  }

  // 转换为 SVG
  if (isSVG) {
    const svg = transferToSvg(node);
    console.log('转换为 Svg: ', svg);
    layers.push(svg);

    return layers;
  }
  // 判断一下文本是否可见 不可见直接返回
  if (!isTextVisible(styles)) {
    return layers;
  }

  // 转换为文本
  if (isText) {
    const text = transferToText(node);
    console.log('转换为 Text:', text);
    layers.push(text);

    // 添加后继续执行,不终止
  }

  return layers;
};

export default nodeToSketchLayers;
