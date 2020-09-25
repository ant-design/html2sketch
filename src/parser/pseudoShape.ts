import { Rectangle, Frame } from '../model';
import { parseToShape } from './shape';
import { isVisibleShape } from '../utils/visibility';

/**
 * 解析图形类伪类
 */
export const parsePseudoToShape = async (
  node: Element,
  pseudoElt: 'before' | 'after',
) => {
  // 判断一下是否有伪类
  const pseudoEl: CSSStyleDeclaration = getComputedStyle(node, `:${pseudoElt}`);
  const bcr = node.getBoundingClientRect();
  const { left, top, height, width } = bcr;
  let x = left;
  let y = top;

  const pseudoW = parseFloat(pseudoEl.width);
  const pseudoH = parseFloat(pseudoEl.height);

  const rect = await parseToShape(node, pseudoEl);

  // 如果采用绝对定位的话
  if (pseudoEl.position === 'absolute') {
    x += parseFloat(pseudoEl.left);
    y += parseFloat(pseudoEl.top);
  }

  rect.frame = new Frame({
    width: pseudoW !== width ? pseudoW : width,
    height: pseudoH !== height ? pseudoH : height,
    x,
    y,
  });

  rect.mapBasicInfo(node);

  const { transform } = pseudoEl;
  if (transform !== 'none') {
    // TODO 如何使用 将 transform 转换到 对象的 frame 上 ?
    // transform: rotate(45deg) scale(1) translate(-50%, -50%);
    // ↓↓↓
    // matrix(0.707107, 0.707107, -0.707107, 0.707107, 1.41421, -4.94975)
    // ↓↓↓
    // ???
  }

  if (isVisibleShape(<Rectangle>rect)) return rect;
};
