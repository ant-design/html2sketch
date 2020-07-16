import { getGroupBCR } from '../helpers/bcr';
import { getSVGString } from '../helpers/svg';
import SVG from '../model/Layer/Svg';
import { SVGPathData } from 'svg-pathdata';

/**
 * 将 SVG node 节点转为 SVG Sketch对象
 * @param {Element} node 节点
 */
const transferToSvg = (node: Element) => {
  // sketch ignores padding and centerging as defined by viewBox and preserveAspectRatio when
  // importing Svg, so instead of using BCR of the Svg, we are using BCR of its children
  const childrenBCR = getGroupBCR(Array.from(node.children));

  Array.from(node.children).forEach((child) => {
    if (child.nodeName === 'path') {
      const path = child.getAttribute('d');
      if (path) {
        const newPath = new SVGPathData(path).toRel().encode();
        child.setAttribute('d', newPath);
      }
    }
  });

  const svg = new SVG({
    // x,
    // y,
    x: childrenBCR.left,
    y: childrenBCR.top,
    width: childrenBCR.width,
    height: childrenBCR.height,
    rawSVGString: getSVGString(node),
  });
  svg.name = node.getAttribute('data-icon') || 'svg';
  return svg;
};
export default transferToSvg;
