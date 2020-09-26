import Text from '../model/Layer/Text';
import { getTextLinesAndRange } from '../utils/text';

/**
 * 解析伪类
 */
export const parsePseudoToText = (
  node: Element,
  pseudoElt: 'before' | 'after' | 'placeholder',
) => {
  // 判断一下是否有伪类
  const pseudoEl: CSSStyleDeclaration = getComputedStyle(
    node,
    `:${pseudoElt !== 'placeholder' ? pseudoElt : 'placeholder'}`,
  );
  let pseudoText: string;

  if (pseudoElt === 'placeholder') {
    const { value, placeholder } = node as HTMLInputElement;
    if (!value && !placeholder) return;
    if (value) {
      pseudoText = value;
    } else {
      pseudoText = placeholder;
    }
  } else {
    const { content } = pseudoEl;
    pseudoText = content.replace(/"/g, '');
  }
  const pseudoNode = node.cloneNode(true);

  const {
    // 边框
    marginRight,
    paddingLeft,
    paddingTop,
    borderTopWidth,
  } = pseudoEl;

  const nodeBCR = node.getBoundingClientRect();

  pseudoNode.textContent = pseudoText;

  document.body.append(pseudoNode); // 插入到 dom 中 用于获取文本宽度

  const { rangeBCR } = getTextLinesAndRange(pseudoNode);

  let x = nodeBCR.left;
  switch (pseudoElt) {
    case 'after':
      x = nodeBCR.right - parseFloat(marginRight) - rangeBCR.width;
      break;
    case 'placeholder':
      x = nodeBCR.left + parseFloat(paddingLeft);
      break;
    default:
      break;
  }
  let { y } = nodeBCR;

  if (pseudoElt === 'placeholder') {
    y = y + parseFloat(paddingTop) + parseFloat(borderTopWidth);
  } else {
    const nodeDisplay = getComputedStyle(node).display;
    // 处理垂直居中的样式
    if (nodeDisplay !== 'inline') {
      y += (nodeBCR.height - rangeBCR.height) / 2;
    } else {
      y += (nodeBCR.height - rangeBCR.height) / 2;
    }
  }

  document.body.removeChild(pseudoNode); // 处理完成后移除
  let textStyle;
  if (pseudoElt === 'placeholder') {
    textStyle = Text.getTextStyleFromNode(node, '::placeholder');

    // ***** Placeholder 文本颜色的解法 ***** //
    // 无法用 js 的方式获取 placeholder 的颜色
    // 相关资料:
    // https://stackoverflow.com/questions/52355140/get-the-correct-placeholder-color-with-js
    // https://css-tricks.com/almanac/selectors/p/placeholder/
    // -----
    // 最终解法来源:
    // https://stackoverflow.com/questions/28592895/trying-to-get-style-of-placeholder-attribute-of-element
    // ------
    let textColor = textStyle.color;
    const { value } = node as HTMLInputElement;

    if (!value) {
      // 从样式表中拿到相应的 css 规则
      Array.from(document.styleSheets).forEach(({ cssRules }) => {
        Array.from(cssRules).forEach((rule) => {
          const { selectorText, style } = rule as CSSStyleRule;
          // 针对每条规则进行一次判断
          // 如果包含 placeholder 的样式
          if (
            selectorText?.includes(node.className) &&
            selectorText?.includes('::placeholder')
          ) {
            textColor = style.color; // 那么把相应的 style 取出来
          }
        });
      });
    }
    textStyle.color = textColor;
  } else {
    textStyle = Text.getTextStyleFromNode(node);
  }
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
