import { Rectangle, Frame } from '../model';
import { parseToShape } from './shape';
import { isVisibleShape } from '../utils/visibility';

/**
 * 解析图形类伪类
 */
// eslint-disable-next-line consistent-return
export const parsePseudoToShape = (
  node: Element,
  pseudoElt: 'before' | 'after',
) => {
  // 判断一下是否有伪类
  const pseudoEl: CSSStyleDeclaration = getComputedStyle(node, `:${pseudoElt}`);
  const bcr = node.getBoundingClientRect();
  const { x, y, height, width } = bcr;

  const rect = parseToShape(node, pseudoEl);

  rect.frame = new Frame({ width, height, x, y });

  rect.mapBasicInfo(node);

  if (isVisibleShape(<Rectangle>rect)) return rect;
};
