import type { Rectangle } from '../models';
import { Frame } from '../models';
import { isVisibleShape } from '../utils/visibility';
import { parseToShape } from './shape';

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
  const isContentBox = pseudoEl.boxSizing === 'content-box';

  // 解析尺寸
  const pseudoW = isContentBox
    ? parseFloat(pseudoEl.width) +
      parseFloat(pseudoEl.paddingLeft) +
      parseFloat(pseudoEl.paddingRight) +
      parseFloat(pseudoEl.borderLeftWidth) +
      parseFloat(pseudoEl.borderRightWidth)
    : parseFloat(pseudoEl.width);

  const pseudoH = isContentBox
    ? parseFloat(pseudoEl.height) +
      parseFloat(pseudoEl.paddingTop) +
      parseFloat(pseudoEl.paddingBottom) +
      parseFloat(pseudoEl.borderTopWidth) +
      parseFloat(pseudoEl.borderBottomWidth)
    : parseFloat(pseudoEl.height);

  const rect = await parseToShape(node, pseudoEl);

  // 解析坐标
  // 如果采用绝对定位的话
  if (pseudoEl.position === 'absolute') {
    x += parseFloat(pseudoEl.left);
    y += parseFloat(pseudoEl.top);

    const { borderTopWidth, borderLeftWidth } = getComputedStyle(node);
    x += parseFloat(borderLeftWidth);
    y += parseFloat(borderTopWidth);

    // 解析 margin 值
    const { marginTop, marginLeft } = pseudoEl;
    x += parseFloat(marginLeft);
    y += parseFloat(marginTop);
  }

  rect.frame = new Frame({
    width: pseudoW !== width ? pseudoW : width,
    height: pseudoH !== height ? pseudoH : height,
    x,
    y,
  });

  rect.mapBasicInfo(node);

  // 应用 Transform
  const { transform } = pseudoEl;
  if (transform !== 'none') {
    // transform: rotate(45deg) scale(1) translate(-50%, -50%);
    // ↓↓↓
    // matrix(0.707107, 0.707107, -0.707107, 0.707107, 1.41421, -4.94975)
    // ↓↓↓
    const params = /matrix\((.*)\)/.exec(transform)?.[1].split(',');

    // 将 transform 转换到对象的 frame 上
    if (params) {
      const [a, b, c, d, e, f] = params.map(parseFloat);

      rect.frame.applyMatrix({ a, b, c, d, e, f });
      // TODO 有待研究
      // 很奇怪 这里需要用负才能转成正的值
      rect.rotation = -rect.rotation;
    }
  }

  if (isVisibleShape(<Rectangle>rect)) return rect;
};
