import Text from '../models/Layer/Text';
import { getTextLinesAndRange } from '../utils/text';

/**
 * 解析输入框文本
 */
export const parseInputTextToText = (
  node: HTMLInputElement,
): Text | undefined => {
  // 判断一下是否有伪类
  const inputTextStyle: CSSStyleDeclaration = getComputedStyle(
    node,
    'placeholder',
  );
  let pseudoText: string;

  /// *** 处理 input 的文本值 *** ///

  const { value, placeholder } = node as HTMLInputElement;
  if (!value && !placeholder) return;
  if (value) {
    pseudoText = value;
  } else {
    pseudoText = placeholder;
  }

  const pseudoNode = node.cloneNode(true);

  const {
    paddingLeft,
    paddingRight,
    paddingTop,
    borderTopWidth,
  } = inputTextStyle;

  const nodeBCR = node.getBoundingClientRect();

  pseudoNode.textContent = pseudoText;

  document.body.append(pseudoNode); // 插入到 dom 中 用于获取文本宽度

  const { rangeBCR } = getTextLinesAndRange(pseudoNode);

  let { y } = nodeBCR;

  y = y + parseFloat(paddingTop) + parseFloat(borderTopWidth);

  document.body.removeChild(pseudoNode); // 处理完成后移除

  const textStyle = Text.getTextStyleFromNode(node, '::placeholder');

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

  textStyle.lineHeight = rangeBCR.height;

  const text = new Text({
    x: 0,
    y,
    width: rangeBCR.width,
    height: nodeBCR.height,
    text: pseudoText,
    style: textStyle,
    multiline: false,
  });

  switch (inputTextStyle.textAlign) {
    case 'left':
    default:
      text.left = nodeBCR.left + parseFloat(paddingLeft);
      break;
    case 'center':
      text.centerX = (nodeBCR.left + nodeBCR.right) / 2;
      break;
    case 'right':
      text.right = nodeBCR.right - parseFloat(paddingRight);
  }
  return text;
};
