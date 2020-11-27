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

  const pseudoNode = document.createElement('text');

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

  // 默认情况下的 y 采用 input 节点的 y 值
  // 特殊情况在下面处理
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

  // 针对line-height 做单独处理:

  // 如果 input 的 line-height 超过 rangeBCR 的 line-height
  // 那么意味着 input 节点会被撑开,然后文本应该处于 input 的垂直居中位置
  // 相关问题: https://github.com/ant-design/html2sketch/issues/50
  // 问题 demo: https://codesandbox.io/s/optimistic-firefly-f7dy8?file=/src/Demo.tsx

  const { lineHeight } = inputTextStyle;

  // TODO: 还有什么时候需要垂直居中呢?
  if (parseFloat(lineHeight) > rangeBCR.height) {
    // 需要垂直居中的地方
    console.log(y, nodeBCR.y);
    console.log(nodeBCR.height, rangeBCR.height);
    // 计算公式:
    // 偏差值 = (input 的高度 - text 的高度 )/2 - 目前已有的offsetY
    const offsetY = (nodeBCR.height - rangeBCR.height) / 2 - (y - nodeBCR.y);
    y += offsetY;
  }

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
