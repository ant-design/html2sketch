import Color from 'color';

const parserColor = (paletteName: string, nodes: Element[]) => {
  return nodes.map((box, index) => {
    const color = getComputedStyle(box).backgroundColor;
    return {
      name: `${paletteName}-${index + 1}`,
      color: new Color(color).hex(),
    };
  });
};

export default parserColor;
