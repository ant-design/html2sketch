import pseudoText from '../parser/pseudoText';
import pseudoShape from '../parser/pseudoShape';
import Rectangle from '../model/Layer/Rectangle';

/**
 * 判断是否存在伪类
 */
export const isExistPseudoText = (node: Element) =>
  !!(pseudoText(node, 'after') || pseudoText(node, 'before'));
/**
 * 判断是否存在图形伪类
 */
export const isExistPseudoShape = (node: Element) =>
  !!(pseudoShape(node, 'after') || pseudoShape(node, 'before'));

/**
 * 判断是否是不可见的样式
 * @param shape
 */
export const isVisibleShape = (shape: Rectangle) => {
  const isInvisible = shape.style.opacity === 0;

  // 透明度为 0 也返回不可见
  if (isInvisible) return false;

  // 没任何样式的话,就返回不可见
  const hasNoStyle =
    shape.style.fills.length === 0 && shape.style.borders.length === 0;
  if (hasNoStyle) return false;

  const isInvalidFills = shape.style.fills.every(
    (fill) => fill.opacity.toString() === '0',
  );
  const isInvalidBorders = shape.style.borders.every(
    (border) => border.opacity === 0 || border.thickness === 0,
  );

  return !(isInvalidFills && isInvalidBorders);
};
