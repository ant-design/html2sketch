import Svg from '../model/Layer/Svg';

/**
 * 将 SVG node 节点转为 SVG Sketch对象
 * @param {SVGElement} node svg节点
 */
export const parseToSvg = async (node: SVGElement) => {
  const nodeBCR = node.getBoundingClientRect();

  const svgString = await Svg.getSVGString(node);
  const svg = new Svg({
    x: nodeBCR.left,
    y: nodeBCR.top,
    width: nodeBCR.width,
    height: nodeBCR.height,
    svgString,
  });

  svg.name = node.getAttribute('data-icon') || 'svg';
  return svg;
};
