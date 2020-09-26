import Text from '../model/Layer/Text';

import {
  getTextLinesAndRange,
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
      // 💩 这里的代码写的有点屎
      // 主要问题在于 text 在不同 display 模式下的位置问题
      // 影响因素:
      // 1. 自身的 display 和 text-align
      // 2. 父级的 display 和 布局参数
      // 上述 4 个要素综合影响文本的 x y 坐标
      // 有待重构

      // 大部分时候可以直接使用 rangeBCR 作为文本的 BCR
      const { lines, rangeBCR } = getTextLinesAndRange(childNode);

      const {
        // x,
        y,
        width: bcrWidth,
        height,
      } = getTextAbsBCR(node, childNode);
      let textWidth = bcrWidth;

      const { display, whiteSpace, overflow, textOverflow, width } = styles;

      if ('inline'.includes(display)) {
        textStyle.lineHeight = rangeBCR.height / lines;
      }
      // **** 处理文本带省略的情况 ****** //

      let textValue = Text.fixWhiteSpace(childNode.nodeValue || '', whiteSpace);
      const originText = textValue;
      // 针对隐藏或者带省略号的
      if (overflow === 'hidden') {
        // 修改宽度
        textWidth = parseFloat(width);
        // 并对比修改后的文本内容
        textValue = getLineTextWithWidth(childNode, textWidth);

        // 如果是 ellipsis 类型且存在省略号
        // 按省略号添加
        if (
          textOverflow === 'ellipsis' &&
          originText.length !== textValue.length
        ) {
          textValue = textValue.slice(0, textValue.length - 2);
          textValue += '...';
        }
      }

      return new Text({
        // x: ['inline-block'].includes(display) ? x : rangeBCR.x,
        x: rangeBCR.x,
        // y: textBCR.y,
        y,
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
