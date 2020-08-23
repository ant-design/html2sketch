/**
 * 获取文本定界框与行数
 * @param textNode
 */
export const getTextContext = (textNode: Node) => {
  // 创建Range 对象
  const rangeHelper = document.createRange();
  rangeHelper.selectNodeContents(textNode); // 选中文本节点

  const textRanges = Array.from(rangeHelper.getClientRects());

  const lines = textRanges.length;
  const textBCR = rangeHelper.getBoundingClientRect();

  rangeHelper.detach();
  return {
    textBCR,
    lines,
    textRanges,
  };
};

/**
 * 获取文本的绝对 BCR 定位值
 * @param parentNode
 * @param textNode
 */
export const getTextAbsBCR = (parentNode: Element, textNode: Node) => {
  const styles: CSSStyleDeclaration = getComputedStyle(parentNode);
  const nodeBCR = parentNode.getBoundingClientRect();

  let x = nodeBCR.x;
  let y = nodeBCR.y;

  const { lines, textBCR } = getTextContext(textNode);

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
  }

  let textHeight = fixY < 0 ? textBCRHeight - fixY * 2 : textBCRHeight;

  // 处理垂直居中的样式
  if (display === 'flex' || display === 'inline-flex') {
    y = y + (nodeBCR.height - textHeight) / 2;
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
  for (let i = 0; i < text.length; i++) {
    const charNode = textNode.cloneNode(true);
    charNode.textContent = textContent;
    document.body.appendChild(charNode);
    const { textBCR } = getTextContext(charNode);
    document.body.removeChild(charNode);
    if (textBCR.width < width) {
      textContent += text[i];
    }
  }
  return textContent;
};
