import Text from '../model/Layer/Text';

import {
  getTextContext,
  getTextAbsBCR,
  getLineTextWithWidth,
} from '../utils/text';

/**
 * 将 Node 转为 Text 对象
 * */
export const parseToText = (node: Element): Text | Text[] | undefined => {
  // 添加文本
  const styles: CSSStyleDeclaration = getComputedStyle(node);
  const textStyle = Text.getTextStyleFromNode(node);
  // 处理内部Text节点
  const textNode = Array.from(node.childNodes)
    .filter(
      (child) =>
        // 提取所有 text 元素 且 text 里有东西
        child.nodeType === Node.TEXT_NODE && child.nodeValue!.trim().length > 0,
    )
    .map((childNode) => {
      const { lines, textBCR } = getTextContext(childNode);
      const {
        // x, y,
        width: bcrWidth,
        height,
      } = getTextAbsBCR(node, childNode);
      let textWidth = bcrWidth;

      const { display, whiteSpace, overflow, textOverflow, width } = styles;

      if (display === 'inline') {
        textStyle.lineHeight = textBCR.height;
      }
      // **** 处理文本 ****** //

      let textValue = Text.fixWhiteSpace(childNode.nodeValue || '', whiteSpace);
      const originText = textValue;
      // 针对隐藏或者带省略号的
      if (overflow === 'hidden') {
        textWidth = parseFloat(width); // 修改其宽度

        textValue = getLineTextWithWidth(childNode, textWidth);
        if (
          textOverflow === 'ellipsis' &&
          originText.length !== textValue.length
        ) {
          textValue = textValue.slice(0, textValue.length - 2);
          textValue += '...';
        }
      }

      return new Text({
        x: textBCR.x,
        y: textBCR.y,
        width: textWidth,
        height,
        text: textValue,
        style: textStyle,
        multiline: lines > 1,
      });
    });

  if (textNode.length === 0) {
    return;
  }
  if (textNode.length === 1) {
    return textNode[0];
  }
  return textNode;
};
