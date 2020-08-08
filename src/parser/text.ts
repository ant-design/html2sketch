import Text from '../model/Layer/Text';
import { TextStyleParams } from '../model/Style/TextStyle';
import { getTextContext } from '../helpers/text';

/**
 * 将 Node 转为 Text 对象
 **/
const transformToText = (node: Element): Text | Text[] | undefined => {
  // 添加文本
  const styles: CSSStyleDeclaration = getComputedStyle(node);

  const {
    // 字体
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecorationLine,
    textAlign,
    justifyContent,
    display,
    whiteSpace,
    color,
    paddingLeft,
    paddingTop,
    paddingRight,
    borderLeftWidth,
    borderTopWidth,
    overflow,
    textOverflow,
    width,
  } = styles;

  const textStyle: TextStyleParams = {
    fontFamily,
    fontSize: parseInt(fontSize, 10),
    lineHeight: lineHeight !== 'normal' ? parseFloat(lineHeight) : undefined,
    letterSpacing:
      letterSpacing !== 'normal' ? parseFloat(letterSpacing) : undefined,
    fontWeight: Text.parseFontWeight(fontWeight),
    color,
    textTransform,
    textDecoration: textDecorationLine,
    textAlign:
      display === 'flex' || display === 'inline-flex'
        ? justifyContent
        : textAlign,
    skipSystemFonts: true,
  };

  const nodeBCR = node.getBoundingClientRect();

  let x = nodeBCR.x;
  let y = nodeBCR.y;

  // 处理内部Text节点
  const childNodeList = Array.from(node.childNodes);

  const textNode = childNodeList
    .filter(
      (child) =>
        // 提取所有 text 元素 且 text 里有东西
        child.nodeType === Node.TEXT_NODE && child.nodeValue!.trim().length > 0
    )
    .map((textNode) => {
      const { lines, textBCR } = getTextContext(textNode);

      let textWidth = textBCR.width;
      const lineHeightInt = parseInt(lineHeight, 10);
      const textBCRHeight = textBCR.height;

      let fixY = 0;

      // center text inside a box
      if (lineHeightInt && textBCRHeight !== lineHeightInt * lines) {
        fixY = (textBCRHeight - lineHeightInt * lines) / 2;
      }

      if (display !== 'inline') {
        // 如果是左对齐
        if (textAlign === 'left' || textAlign === 'start') {
          // 确认下 padding 的距离
          const pl = parseFloat(paddingLeft);
          x = x + pl;
        }
        // 如果是居中对齐
        if (textAlign === 'center') {
          x = x + nodeBCR.width / 2 - textWidth / 2;
        }
        // 如果是右对齐
        if (textAlign === 'right') {
          // 确认下 padding 的距离
          const pl = parseFloat(paddingRight);
          // TODO 需要排除右侧有东西的情况
          // 即 需要明确什么时候使用用下面这个公式
          x = nodeBCR.right - textWidth;
          x = x - pl;
        }

        // 添加左侧的 border 宽度
        x = x + parseFloat(borderLeftWidth);

        // 处理内部高度
        const pt = parseFloat(paddingTop);
        y = y + pt;

        // 处理顶部 border 宽度
        y = y + parseFloat(borderTopWidth);
      } else {
        textStyle.lineHeight = textBCRHeight;
      }
      let textHeight = fixY < 0 ? textBCRHeight - fixY * 2 : textBCRHeight;

      // 处理垂直居中的样式
      if (display === 'flex' || display === 'inline-flex') {
        y = y + (nodeBCR.height - textHeight) / 2;
      }

      // **** 处理文本 ****** //

      let textValue = Text.fixWhiteSpace(textNode.nodeValue || '', whiteSpace);

      if (overflow === 'hidden') {
        textWidth = parseFloat(width);

        if (textOverflow === 'ellipsis') {
          textValue += '...';
        }
      }

      return new Text({
        x,
        y,
        width: textWidth,
        height: textHeight,
        text: textValue,
        style: textStyle,
        multiline: lines > 1,
      });
    });

  if (textNode.length === 0) {
    return;
  } else if (textNode.length === 1) {
    return textNode[0];
  } else return textNode;
};

export default transformToText;
