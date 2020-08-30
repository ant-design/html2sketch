import Color from 'color';
import { isDefaultStyles } from './style';

/**
 * 判断是否存在伪类文本
 */
export const isExistPseudoText = (node: Element): HasPseudoType => {
  const beforePseudoEl: CSSStyleDeclaration = getComputedStyle(node, ':before');
  const afterPseudoEl: CSSStyleDeclaration = getComputedStyle(node, ':after');

  const hasPseudoText = (style: CSSStyleDeclaration) => {
    const { display, content, color, opacity } = style;

    const hasContent = content !== 'none'; // 存在文本内容

    const isDisplayVisible = display !== 'none'; // display 属性可见

    const textColor = new Color(color); // 颜色不透明度不为 0
    const isColorVisible = textColor.alpha() !== 0;

    const isOpacityVisible = Number(opacity) !== 0; // 图层不透明不为 0
    return (
      // 包含文本 且 不隐藏 且 文本不透明不为 0
      hasContent && isDisplayVisible && isColorVisible && isOpacityVisible
    );
  };

  const hasBeforeText = hasPseudoText(beforePseudoEl);
  const hasAfterText = hasPseudoText(afterPseudoEl);
  return {
    after: hasAfterText,
    before: hasBeforeText,
    exist: hasBeforeText || hasAfterText,
  };
};

interface HasPseudoType {
  /**
   * 是否存在
   */
  exist: boolean;
  /**
   * 是否存在 before 伪类
   */
  before: boolean;
  /**
   * 是否存在after 伪类
   */
  after: boolean;
}
/**
 * 判断是否存在图形伪类
 */
export const isExistPseudoShape: (node: Element) => HasPseudoType = (
  node: Element,
) => {
  const beforePseudoEl: CSSStyleDeclaration = getComputedStyle(node, ':before');
  const afterPseudoEl: CSSStyleDeclaration = getComputedStyle(node, ':after');

  const hasPseudoShapeStyle = (style: CSSStyleDeclaration) => {
    const { display, opacity } = style;

    const isDisplayVisible = display !== 'none'; // display 属性可见

    const isDefaultStyle = isDefaultStyles(style);

    const isOpacityVisible = Number(opacity) !== 0; // 图层不透明不为 0
    return (
      // 包含文本 且 不隐藏 且 文本不透明不为 0
      isDisplayVisible && isOpacityVisible && !isDefaultStyle
    );
  };

  const hasBefore = hasPseudoShapeStyle(beforePseudoEl);
  const hasAfter = hasPseudoShapeStyle(afterPseudoEl);

  return {
    exist: hasAfter || hasBefore,
    before: hasBefore,
    after: hasAfter,
  };
};
