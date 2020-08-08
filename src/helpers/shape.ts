import pseudoText from '../parser/pseudoText';
import pseudoShape from '../parser/pseudoShape';

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
