import Text from '../models/Layer/Text';
import { getTextLinesAndRange } from '../utils/text';

/**
 * 解析伪类
 */
export const parsePseudoToText = (
  node: Element,
  pseudoElt: 'before' | 'after',
) => {
  // 判断一下是否有伪类
  const pseudoEl: CSSStyleDeclaration = getComputedStyle(node, `:${pseudoElt}`);

  /// *** 处理 其他伪类的文本值 *** ///
  const { content } = pseudoEl;
  const pseudoText = content.replace(/"/g, '');

  const pseudoNode = node.cloneNode(true);

  const nodeBCR = node.getBoundingClientRect();

  pseudoNode.textContent = pseudoText;

  document.body.append(pseudoNode); // 插入到 dom 中 用于获取文本宽度

  const { rangeBCR } = getTextLinesAndRange(pseudoNode);

  let { x, y } = nodeBCR;
  if (pseudoElt === 'after') {
    x = nodeBCR.right - parseFloat(pseudoEl.marginRight) - rangeBCR.width;
  }

  const nodeDisplay = getComputedStyle(node).display;
  // 处理垂直居中的样式
  if (nodeDisplay !== 'inline') {
    y += (nodeBCR.height - rangeBCR.height) / 2;
  } else {
    y += (nodeBCR.height - rangeBCR.height) / 2;
  }

  document.body.removeChild(pseudoNode); // 处理完成后移除

  const textStyle = Text.getTextStyleFromNode(node);

  textStyle.lineHeight = rangeBCR.height;

  return new Text({
    x,
    y,
    width: rangeBCR.width,
    height: nodeBCR.height,
    text: pseudoText,
    style: textStyle,
    multiline: false,
  });
};
