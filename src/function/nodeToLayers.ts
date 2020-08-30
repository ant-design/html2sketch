/* eslint-disable no-console */
import { AnyLayer } from '..';
import { defaultNodeStyle } from '../model/utils';
import { Text } from '../model';

import {
  parseCanvasToBitmap,
  parseToBitmap,
  parseToSvg,
  parseToText,
  parseToShape,
  parsePseudoToShape,
  parsePseudoToText,
} from '../parser';

import { isTextVisible } from '../utils/visibility';
import { isExistPseudoText, isExistPseudoShape } from '../utils/shape';
import {
  isCanvasNode,
  isImageNode,
  isSVGChildNode,
  isSvgNode,
  isTextNode,
} from '../utils/nodeType';

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
 * 将节点转为 Layer 对象
 * @param {HTMLElement} node 节点
 */
const nodeToLayers = (node: Element): AnyLayer[] => {
  const layers: any[] = [];
  const styles: CSSStyleDeclaration = getComputedStyle(node);

  // ---------- 处理节点 ---------- //

  // svg 内部节点 直接跳过 ( 已经被转换到 svg 中)
  if (isSVGChildNode(node)) {
    console.log('SVG 内部节点,跳过...');
    return layers;
  }

  // 图片类型的节点(img)
  if (isImageNode(node)) {
    const image = parseToBitmap(<HTMLImageElement>node);
    console.info('转换为:', image);
    layers.push(image);
    return layers;
  }

  // 画布类型节点(canvas)
  if (isCanvasNode(node)) {
    const canvas = parseCanvasToBitmap(<HTMLCanvasElement>node);
    console.info('转换为:', canvas);
    layers.push(canvas);
    return layers;
  }

  // 图层存在样式(阴影 边框等) 使用 Rect 类
  const isShape = !isDefaultStyles(styles);

  // 如果图层存在样式(阴影 边框等 返回 shape 节点
  if (isShape || isExistPseudoShape(node)) {
    // 判断一下是否有伪类
    const afterEl = parsePseudoToShape(node, 'after');

    if (afterEl) {
      console.info('转换为:', afterEl);
      layers.push(afterEl);
    }

    if (isShape) {
      const shape = parseToShape(node);
      console.info('转换为:', shape);
      layers.push(shape);
    }

    // 判断一下是否有伪类
    const beforeEl = parsePseudoToShape(node, 'before');

    if (beforeEl) {
      console.info('转换为:', afterEl);
      layers.push(beforeEl);
    }
  }

  // 转换为 SVG
  if (isSvgNode(node)) {
    const svg = parseToSvg(node as SVGElement);
    console.info('转换为:', svg);
    layers.push(svg);

    return layers;
  }

  // 判断一下文本是否可见 不可见直接返回
  if (!isTextVisible(styles)) {
    return layers;
  }

  // 文本类型节点
  const isText = isTextNode(node);

  // 转换为文本
  if (isText || isExistPseudoText(node)) {
    let text;
    if (isText) {
      text = parseToText(node);
      console.info('转换为:', text);
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
    const afterEl = parsePseudoToText(node, 'after');

    if (afterEl) {
      layers.push(afterEl);
      if (text instanceof Text) {
        text.right = afterEl.x;
      }
    }

    // 判断一下是否有伪类
    const beforeEl = parsePseudoToText(node, 'before');
    if (beforeEl) {
      layers.push(beforeEl);
    }

    // 添加后继续执行,不终止
  }

  return layers;
};

export default nodeToLayers;
