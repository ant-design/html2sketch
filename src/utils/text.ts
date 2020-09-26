/**
 * 获取文本定界框与行数
 * @param textNode
 */
export const getTextLinesAndRange = (textNode: Node) => {
  // 创建Range 对象
  const rangeHelper = document.createRange();
  rangeHelper.selectNodeContents(textNode); // 选中文本节点

  const textRanges = Array.from(rangeHelper.getClientRects());

  const lines = textRanges.length;
  const rangeBCR = rangeHelper.getBoundingClientRect();

  rangeHelper.detach();
  return {
    rangeBCR,
    lines,
    textRanges,
  };
};

/**
 * 获取文本的绝对 BCR 定位值
 *
 * 使用场景 : 存在对齐等情况
 *
 * @param parentNode
 * @param textNode
 */
export const getTextAbsBCR = (parentNode: Element, textNode: Node) => {
  const styles: CSSStyleDeclaration = getComputedStyle(parentNode);
  const nodeBCR = parentNode.getBoundingClientRect();

  let { x } = nodeBCR;
  let { y } = nodeBCR;

  const { lines, rangeBCR } = getTextLinesAndRange(textNode);

  const {
    lineHeight,
    display,
    textAlign,
    paddingRight,
    paddingLeft,
    borderLeftWidth,
    paddingTop,
    borderTopWidth,
  } = styles;

  const textWidth = rangeBCR.width;
  const lineHeightInt = parseInt(lineHeight, 10);
  const textBCRHeight = rangeBCR.height;

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
      x += pl;
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
      x -= pl;
    }

    // 添加左侧的 border 宽度
    x += parseFloat(borderLeftWidth);

    // 处理内部高度
    const pt = parseFloat(paddingTop);
    y += pt;

    // 处理顶部 border 宽度
    y += parseFloat(borderTopWidth);
  }

  const textHeight = fixY < 0 ? textBCRHeight - fixY * 2 : textBCRHeight;

  // 处理垂直居中的样式
  if (display === 'flex' || display === 'inline-flex') {
    y += (nodeBCR.height - textHeight) / 2;
  }

  return { x, y, height: textHeight, width: textWidth };
};

/**
 * 获取一行宽度的文本
 * @param textNode
 * @param width
 */
export const getLineTextWithWidth = (textNode: ChildNode, width: number) => {
  const text = textNode.textContent;
  if (!text) return '';

  let textContent = '';
  for (let i = 0; i < text.length; i += 1) {
    const charNode = textNode.cloneNode(true);
    charNode.textContent = textContent;
    document.body.appendChild(charNode);
    const { rangeBCR } = getTextLinesAndRange(charNode);
    document.body.removeChild(charNode);
    if (rangeBCR.width < width) {
      textContent += text[i];
    }
  }
  return textContent;
};
