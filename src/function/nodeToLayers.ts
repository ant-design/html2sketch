/* eslint-disable no-console */
import { defaultNodeStyle } from '../model/utils';

import parserToSvg from '../parser/svg';
import transferToShape from '../parser/shape';
import transferToText from '../parser/text';
import parserPseudoText from '../parser/pseudoText';
import parserPseudoShape from '../parser/pseudoShape';

import { isTextVisible } from '../utils/visibility';
import { isTextNode } from '../utils/nodeType';
import { AnyLayer, Text } from '../model';
import { isExistPseudoText, isExistPseudoShape } from '../utils/shape';

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
 * 将节点转为 Layer 对象
 * @param {HTMLElement} node 节点
 */
const nodeToLayers = (node: Element): AnyLayer[] => {
  const layers: any[] = [];

  const styles: CSSStyleDeclaration = getComputedStyle(node);

  const nodeName = node.nodeName.toLowerCase();
  console.info('[nodeToSketchLayers]处理节点为:', node);

  // ----- 初步判断 ------ //
  // skip Svg child nodes as they are already covered by `new Svg(…)`
  if (isSVGDescendant(node)) {
    console.log('[nodeToSketchLayers]SVG 内部节点,跳过...');
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
  if (isImage || isShape || isExistPseudoShape(node)) {
    // 判断一下是否有伪类
    const afterEl = parserPseudoShape(node, 'after');

    if (afterEl) {
      layers.push(afterEl);
    }

    if (isImage || isShape) {
      // 添加后继续执行,不终止
      const shape = transferToShape(node);

      console.info('[nodeToSketchLayers]转换为 Rectangle: ', shape);
      layers.push(shape);
    }

    // 判断一下是否有伪类
    const beforeEl = parserPseudoShape(node, 'before');

    if (beforeEl) {
      layers.push(beforeEl);
    }
  }

  // 转换为 SVG
  if (isSVG) {
    const svg = parserToSvg(node as SVGElement);
    console.info('[nodeToSketchLayers]转换为 Svg: ', svg);
    layers.push(svg);

    return layers;
  }
  // 判断一下文本是否可见 不可见直接返回
  if (!isTextVisible(styles)) {
    return layers;
  }

  // 转换为文本
  if (isText || isExistPseudoText(node)) {
    let text;
    if (isText) {
      text = transferToText(node);
      console.info('[nodeToSketchLayers]转换为 Text:', text);
      if (text instanceof Array) {
        for (let i = 0; i < text.length; i += 1) {
          const textElement = text[i];
          if (i !== 0) {
            textElement.x = text[i - 1].right;
          }
          layers.push(textElement);
        }
      } else {
        layers.push(text);
      }
    }

    // 判断一下是否有伪类
    const afterEl = parserPseudoText(node, 'after');

    if (afterEl) {
      layers.push(afterEl);
      if (text instanceof Text) {
        text.right = afterEl.x;
      }
    }

    // 判断一下是否有伪类
    const beforeEl = parserPseudoText(node, 'before');
    if (beforeEl) {
      layers.push(beforeEl);
    }

    // 添加后继续执行,不终止
  }

  return layers;
};

export default nodeToLayers;
