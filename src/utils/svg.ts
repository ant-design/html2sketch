// @ts-ignore
import getSvgoInstance from 'svgo-browser/lib/get-svgo-instance';

/**
 * svg 基本样式
 * defaults taken from Chrome
 * @see https://www.w3.org/TR/SVG2/styling.html
 */
export const SvgStyleProperties = [
  // name, default value
  ['cx', '0px'],
  ['cy', '0px'],

  ['height', 'auto'],
  ['width', 'auto'],
  ['x', '0px'],
  ['y', '0px'],

  ['r', '0px'],

  ['rx', 'auto'],
  ['ry', 'auto'],

  ['d', 'none'],

  ['fill', 'rgb(0, 0, 0)'],

  ['transform', 'none'],

  ['alignment-baseline', 'auto'],
  ['baseline-shift', '0px'],
  ['clip', 'auto'],
  ['clip-path', 'none'],
  ['clip-rule', 'nonzero'],
  ['color', 'rgb(0, 0, 0)'],
  ['color-interpolation', 'srgb'],
  ['color-interpolation-filters', 'linearrgb'],
  ['color-rendering', 'auto'],
  ['cursor', 'auto'],
  ['direction', 'ltr'],
  ['display', 'inline'],
  ['dominant-baseline', 'auto'],
  ['fill-opacity', '1'],
  ['fill-rule', 'nonzero'],
  ['filter', 'none'],
  ['flood-color', 'rgb(0, 0, 0)'],
  ['flood-opacity', '1'],
  ['font-family', 'Times'],
  ['font-size', '14px'],
  ['font-size-adjust', 'none'],
  ['font-stretch', '100%'],
  ['font-style', 'normal'],
  ['font-variant', 'normal'],
  ['font-weight', '400'],
  ['glyph-orientation-horizontal', undefined],
  ['glyph-orientation-vertical', undefined],
  ['image-rendering', 'auto'],
  ['letter-spacing', 'normal'],
  ['lighting-color', 'rgb(255, 255, 255)'],
  ['marker-end', 'none'],
  ['marker-mid', 'none'],
  ['marker-start', 'none'],
  ['mask', 'none'],
  ['opacity', '1'],
  ['overflow', 'visible'],
  ['pointer-events', 'auto'],
  ['shape-rendering', 'auto'],
  ['solid-color', undefined],
  ['solid-opacity', undefined],
  ['stop-color', 'rgb(0, 0, 0)'],
  ['stop-opacity', '1'],
  ['stroke', 'none'],
  ['stroke-dasharray', 'none'],
  ['stroke-dashoffset', '0px'],
  ['stroke-linecap', 'butt'],
  ['stroke-linejoin', 'miter'],
  ['stroke-miterlimit', '4'],
  ['stroke-opacity', '1'],
  ['stroke-width', '1px'],
  ['text-anchor', 'start'],
  ['text-decoration', 'none solid rgb(0, 0, 0)'],
  ['font-variant', 'tabular-nums'],
  ['text-overflow', 'clip'],
  ['text-rendering', 'auto'],
  ['unicode-bidi', 'normal'],
  ['vector-effect', 'none'],
  ['visibility', 'visible'],
  ['white-space', 'normal'],
  ['word-spacing', '0px'],
  ['writing-mode', 'horizontal-tb'],
];

/**
 * 节点获取原始的 String
 * @param svgNode
 */
export const nodeToRawSVG = (svgNode: Element): string => {
  return svgNode.outerHTML;
};

/**
 * 从 URL 请求 SVG 字符串
 * @param url
 */
export const urlToRawSVG = async (url: string) => {
  let data;
  try {
    data = await fetch(url, {
      mode: 'cors',
    });
  } catch (error) {
    const maybeCorsError = error.toString().includes('Failed to fetch');
    if (maybeCorsError) {
      const corsPrefix = `https://cors-anywhere.herokuapp.com/`;
      data = await fetch(corsPrefix + url, {
        mode: 'cors',
      });
      console.warn(
        '该图片存在跨域问题! 请在服务器端设置允许图片跨域,以提升解析速度:',
        url,
      );
    }
  }
  // TODO 添加一个报错 SVG string
  if (!data) return;

  const svg = await data.text();

  if (!(svg.startsWith('<svg') || svg.startsWith('<?xml'))) return;

  return svg;
};

/**
 * 压缩和优化 Svg
 * TODO 有待优化 svgo 的方法
 * @param svgStr svg 字符串
 */
export const optimizeRawSVG = async (svgStr: string): Promise<string> => {
  const svgo = getSvgoInstance({
    cleanupAttrs: true,
    removeDoctype: true,
    removeXMLProcInst: true,
    removeComments: true,
    removeMetadata: true,
    removeTitle: true,
    removeDesc: true,
    removeUselessDefs: true,
    removeEditorsNSData: true,
    removeEmptyAttrs: true,
    removeHiddenElems: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    removeViewBox: true,
    cleanupEnableBackground: true,
    convertStyleToAttrs: true,
    convertColors: true,
    convertPathData: true,
    convertTransform: true,
    removeUnknownsAndDefaults: true,
    removeNonInheritableGroupAttrs: true,
    removeUselessStrokeAndFill: true,
    removeUnusedNS: true,
    cleanupIDs: true,
    cleanupNumericValues: true,
    moveElemsAttrsToGroup: true,
    moveGroupAttrsToElems: true,
    collapseGroups: true,
    removeRasterImages: false,
    mergePaths: true,
    convertShapeToPath: true,
    sortAttrs: true,
    removeDimensions: true,
  });

  const svg = await svgo.optimize(svgStr);

  return svg.data;
};

/**
 * 将样式直接 inline 到 Style 中
 *
 * TODO: 针对 class 的样式似乎并不生效?
 * @param node
 */
const inlineStyles = (node: SVGElement) => {
  const styles = getComputedStyle(node);

  SvgStyleProperties.forEach((prop) => {
    const propName = prop[0] as string;
    const propDefaultValue = prop[1];
    const propCurrentValue = styles[propName];
    const propAttributeValue = node.getAttribute(propName);

    if (
      propCurrentValue !== propDefaultValue &&
      propCurrentValue !== propAttributeValue &&
      // 不用 d 属性
      propName !== 'd' &&
      propName !== 'font-family'
    ) {
      node.style[propName] = propCurrentValue;
    }
  });
};

/**
 * 替换 SVG 的 use 和 symbol
 * @param node
 */
const getUseReplacement = (node: SVGUseElement) => {
  const href = node.href.baseVal;
  // TODO this will only work for internal references
  let refNode = null;
  let resultNode: SVGSVGElement;

  try {
    refNode = document.querySelector(href);
  } catch (e) {
    // ignore
  }

  if (refNode) {
    if (refNode instanceof SVGSymbolElement) {
      resultNode = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      Array.from(refNode.attributes).forEach((attr) =>
        resultNode.setAttribute(attr.name, attr.value),
      );
      // @ts-ignore
      Array.from(refNode.cloneNode(true).children).forEach((child) =>
        resultNode.appendChild(<Node>child),
      );
    } else {
      // @ts-ignore
      resultNode = refNode.cloneNode(true);
    }
    return resultNode;
  }
};

/**
 * 根据 Svg String 字符串 渲染出需要的样式
 * @param svgString
 * @param width
 * @param height
 * @param node 需要挂载的节点位置
 */
export const StrToRenderSVG = async (
  svgString: string,
  { width, height }: { width: number; height: number },
  node?: Element,
) => {
  const divNode = document.createElement('div');
  divNode.innerHTML = svgString;
  const svgNode = divNode.children[0] as SVGElement;

  svgNode.style.width = `${width}px`;
  svgNode.style.height = `${height}px`;

  if (node) {
    node.append(divNode);
  } else {
    document.body.append(divNode);
  }

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

    if (node) {
      inlineStyles(<SVGElement>node);
      Array.from(node.children).forEach((child) => queue.push(child));
    }
  }
  divNode.remove();

  return optimizeRawSVG(svgNode.outerHTML);
};
