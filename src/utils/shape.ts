import { parsePseudoToText, parsePseudoToShape } from '../parser';

/**
 * 判断是否存在伪类文本
 */
export const isExistPseudoText = (node: Element) =>
  !!(parsePseudoToText(node, 'after') || parsePseudoToText(node, 'before'));

/**
 * 判断是否存在图形伪类
 */
export const isExistPseudoShape = (node: Element) =>
  !!(parsePseudoToShape(node, 'after') || parsePseudoToShape(node, 'before'));
