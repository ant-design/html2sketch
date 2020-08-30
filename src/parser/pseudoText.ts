import Text from '../model/Layer/Text';
import { getTextContext } from '../utils/text';

/**
 * 解析伪类
 */
export const parsePseudoToText = (
  node: Element,
  pseudoElt: 'before' | 'after',
) => {
  // 判断一下是否有伪类
  const pseudoEl: CSSStyleDeclaration = getComputedStyle(node, `:${pseudoElt}`);
  const { content } = pseudoEl;
  const pseudoNode = node.cloneNode(true);
  const pseudoText = content.replace(/"/g, '');

  const {
    // 边框
    marginRight,
  } = pseudoEl;

  const nodeBCR = node.getBoundingClientRect();

  pseudoNode.textContent = pseudoText;

  document.body.append(pseudoNode); // 插入到 dom 中 用于获取文本宽度

  const { textBCR } = getTextContext(pseudoNode);

  let x = nodeBCR.left;
  switch (pseudoElt) {
    case 'after':
      x = nodeBCR.right - parseFloat(marginRight) - textBCR.width;
      break;
    default:
      break;
  }
  let { y } = nodeBCR;

  const nodeDisplay = getComputedStyle(node).display;
  // 处理垂直居中的样式
  if (nodeDisplay !== 'inline') {
    y += (nodeBCR.height - textBCR.height) / 2;
  } else {
    y += (nodeBCR.height - textBCR.height) / 2;
  }

  document.body.removeChild(pseudoNode); // 处理完成后移除

  const textStyle = Text.getTextStyleFromNode(node);
  textStyle.lineHeight = textBCR.height;

  return new Text({
    x,
    y,
    width: textBCR.width,
    height: nodeBCR.height,
    text: pseudoText,
    style: textStyle,
    multiline: false,
  });
};
