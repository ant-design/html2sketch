import { Rectangle, Style } from '..';

export const createOverflowMask = (node: Element, options?: { isInput?: boolean }) => {
  const { width, height } = node.getBoundingClientRect();
  const rect = new Rectangle({
    width,
    height,
    x: 0,
    y: 0,
  });
  rect.name = 'Overflow 蒙层';

  const nodeStyles = getComputedStyle(node);
  rect.cornerRadius = {
    topLeft: Style.parseBorderRadius(nodeStyles.borderTopLeftRadius, width, height),
    topRight: Style.parseBorderRadius(nodeStyles.borderTopRightRadius, width, height),
    bottomLeft: Style.parseBorderRadius(nodeStyles.borderBottomLeftRadius, width, height),
    bottomRight: Style.parseBorderRadius(nodeStyles.borderBottomRightRadius, width, height),
  };

  if (options?.isInput) {
    // 输入框需要计算 padding
    const paddingLeft = parseFloat(nodeStyles.getPropertyValue('padding-left'));
    const paddingTop = parseFloat(nodeStyles.getPropertyValue('padding-top'));
    const paddingRight = parseFloat(nodeStyles.getPropertyValue('padding-right'));
    const paddingBottom = parseFloat(nodeStyles.getPropertyValue('padding-bottom'));
    rect.width = width - paddingLeft - paddingRight;
    rect.height = height - paddingTop - paddingBottom;
    rect.x = paddingLeft;
    rect.y = paddingTop;
  }

  rect.hasClippingMask = true;

  return rect;
};
