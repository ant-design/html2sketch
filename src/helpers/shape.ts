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

export const isVisibleShape = (shape: Rectangle) => {
  const isInvalidFills =
    shape.style.fills.length === 0 ||
    shape.style.fills.every((fill) => fill.opacity.toString() === '0');
  const isInvalidBorders =
    shape.style.borders.length === 0 ||
    shape.style.borders.every(
      (border) => border.opacity === 0 || border.thickness === 0
    );

  console.log(
    shape.name,
    'isInvalidFills',
    isInvalidFills,
    'isInvalidBorders',
    isInvalidBorders
  );
  const isInvisible = shape.style.opacity === 0;

  if (isInvisible) return false;

  if (isInvalidFills && isInvalidBorders) {
    return false;
  }
  return true;
};
