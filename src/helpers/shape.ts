import parsePseudo from '../parser/pseudo';

/**
 * 判断是否存在伪类
 */
export const isExistPseudo = (node: Element) =>
  !!(parsePseudo(node, 'after') || parsePseudo(node, 'before'));
