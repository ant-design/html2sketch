import Color from 'color';

export const parserToColor = (node: Element) => {
  const color = getComputedStyle(node).backgroundColor;
  return {
    name: node.className || node.id || node.nodeName,
    color: new Color(color).hex(),
  };
};

/**
 * 将一组节点转为面板颜色
 * @param paletteName
 * @param nodes
 */
export const parserToColorPalette = (
  nodes: Element[],
  paletteName: string = 'palette',
) => {
  return nodes.map((node, index) => {
    const color = getComputedStyle(node).backgroundColor;
    return {
      name: `${paletteName}-${index + 1}`,
      color: new Color(color).hex(),
    };
  });
};
