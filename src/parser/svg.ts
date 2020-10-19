import Svg from '../models/Layer/Svg';
import Frame from '../models/Base/Frame';
import { nodeToRawSVG, StrToRenderSVG, urlToRawSVG } from '../utils/svg';

/**
 * 将 SVG node 节点转为 SVG Sketch对象
 * @param {SVGElement} node svg节点
 */
export const parseToSvg = async (node: SVGElement) => {
  const { height, width, left, top } = node.getBoundingClientRect();

  const svgString = await StrToRenderSVG(
    nodeToRawSVG(node),
    {
      width,
      height,
    },
    node,
  );

  const svg = new Svg({
    x: left,
    y: top,
    width,
    height,
    svgString,
  });

  svg.name = node.getAttribute('data-icon') || 'svg';
  return svg;
};

/**
 * 将 URL 转换为 Svg 对象
 * @param url
 * @param frame
 */
export const parseURLToSvg = async (url: string, frame: Frame) => {
  let svgString = await urlToRawSVG(url);
  if (!svgString) return;

  const { x, y, width, height } = frame;

  svgString = await StrToRenderSVG(svgString, { width, height });

  return new Svg({ svgString, x, y, width, height });
};
