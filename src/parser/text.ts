import Text from '../model/Layer/Text';
import TextStyle from '../model/Style/TextStyle';
import { fixWhiteSpace } from '../helpers/text';

/**
 * @param {string} fontWeight font weight as provided by the browser
 * @return {number} normalized font weight
 */
function parseFontWeight(fontWeight: string): number {
  // Support 'bold' and 'normal' for Electron compatibility.
  if (fontWeight === 'bold') {
    return 700;
  } else if (fontWeight === 'normal') {
    return 400;
  }
  return parseInt(fontWeight, 10);
}

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
  } = styles;

  const textStyle = new TextStyle({
    fontFamily,
    fontSize: parseInt(fontSize, 10),
    lineHeight: lineHeight !== 'normal' ? parseFloat(lineHeight) : undefined,
    letterSpacing:
      letterSpacing !== 'normal' ? parseFloat(letterSpacing) : undefined,
    fontWeight: parseFontWeight(fontWeight),
    color,
    textTransform,
    textDecoration: textDecorationLine,
    textAlign:
      display === 'flex' || display === 'inline-flex'
        ? justifyContent
        : textAlign,
    skipSystemFonts: true,
  });

  const rangeHelper = document.createRange();
  const nodeBCR = node.getBoundingClientRect();
  let x = nodeBCR.x;
  let y = nodeBCR.y;
  // let { x, y } = getRelativeXY(node, textAlign);

  // 处理内部Text节点
  const childNodeList = Array.from(node.childNodes);

  const textNode = childNodeList
    .filter(
      (child) =>
        // 提取所有 text 元素 且 text 里有东西
        child.nodeType === Node.TEXT_NODE && child.nodeValue!.trim().length > 0
    )
    .map((textNode) => {
      rangeHelper.selectNodeContents(textNode);

      const textRanges = Array.from(rangeHelper.getClientRects());

      const numberOfLines = textRanges.length;
      const textBCR = rangeHelper.getBoundingClientRect();
      const textWidth = textBCR.right - textBCR.left;

      const lineHeightInt = parseInt(lineHeight, 10);
      const textBCRHeight = textBCR.bottom - textBCR.top;

      let fixY = 0;

      // center text inside a box
      if (lineHeightInt && textBCRHeight !== lineHeightInt * numberOfLines) {
        fixY = (textBCRHeight - lineHeightInt * numberOfLines) / 2;
      }

      // 如果是左对齐
      if (textAlign === 'left') {
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
        x = nodeBCR.right - textWidth;
        x = x - pl;
      }

      // 处理内部高度
      const pt = parseFloat(paddingTop);
      y = y + pt;

      const textValue = fixWhiteSpace(textNode.nodeValue || '', whiteSpace);

      return new Text({
        x,
        y,
        width: textWidth,
        height: fixY < 0 ? textBCRHeight - fixY * 2 : textBCRHeight,
        text: textValue,
        style: textStyle,
        multiline: numberOfLines > 1,
      });
    });
  if (textNode.length === 0) {
    return;
  } else if (textNode.length === 1) {
    return textNode[0];
  } else return textNode;
};

export default transformToText;
