import parsePseudo from '../parser/pseudo';

/**
 * 解析圆角
 * @param borderRadius
 * @param width
 * @param height
 */
export const parserBorderRadius = (
  borderRadius: string,
  width: number,
  height: number
) => {
  const matches = borderRadius.match(/^([0-9.]+)(.+)$/);

  // Sketch uses 'px' units for border radius, so we need to convert % to px
  if (matches && matches[2] === '%') {
    const baseVal = Math.max(width, height);
    const percentageApplied = baseVal * (parseInt(matches[1], 10) / 100);

    return Math.round(percentageApplied);
  }
  return parseInt(borderRadius, 10);
};

/**
 * 判断是否存在伪类
 */
export const isExistPseudo = (node: Element) =>
  !!(parsePseudo(node, 'after') || parsePseudo(node, 'before'));
