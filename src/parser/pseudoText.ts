import { Style } from '../model';
import Text from '../model/Layer/Text';
import { getTextContext } from '../helpers/text';

/**
 * 解析伪类
 */
const parsePseudoText = (node: Element, pseudoElt: 'before' | 'after') => {
  // 判断一下是否有伪类
  const pseudoEl: CSSStyleDeclaration = getComputedStyle(node, ':' + pseudoElt);
  const { content, display } = pseudoEl;
  const pseudoNode = node.cloneNode(true);
  const pseudoText = content.replace(/"/g, '');

  if (
    content === 'none' ||
    // 如果修剪一下没东西,也直接去掉
    !pseudoText.trim() ||
    content === '' ||
    display === 'none'
  ) {
    return null;
  }

  const {
    // 背景颜色
    backgroundColor,
    // 边框
    marginRight,
  } = pseudoEl;

  const nodeBCR = node.getBoundingClientRect();

  const style = new Style();

  if (backgroundColor) {
    style.addColorFill(backgroundColor);
  }

  pseudoNode.textContent = pseudoText;

  document.body.append(pseudoNode); // 插入到 dom 中 用于获取文本宽度

  const { textBCR } = getTextContext(pseudoNode);

  let x = nodeBCR.left;
  switch (pseudoElt) {
    case 'after':
      x = nodeBCR.right - parseFloat(marginRight) - textBCR.width;
  }
  let y = nodeBCR.y;

  const nodeDisplay = getComputedStyle(node).display;
  // 处理垂直居中的样式
  if (nodeDisplay !== 'inline') {
    y = y + (nodeBCR.height - textBCR.height) / 2;
  } else {
    y = y + (nodeBCR.height - textBCR.height) / 2;
  }

  document.body.removeChild(pseudoNode); // 处理完成后移除

  return new Text({
    x,
    y,
    width: textBCR.width,
    height: nodeBCR.height,
    text: pseudoText,
    multiline: false,
  });
};

export default parsePseudoText;
