import { Group, Rectangle } from 'html2sketch';

export const createOverflowMask = (node: HTMLElement, children: any) => {
  const { width, height, left, top } = node.getBoundingClientRect();
  const nodeStyles = getComputedStyle(node);
  const paddingLeft = parseFloat(nodeStyles.getPropertyValue('padding-left'));
  const paddingTop = parseFloat(nodeStyles.getPropertyValue('padding-top'));
  const paddingRight = parseFloat(nodeStyles.getPropertyValue('padding-right'));
  const paddingBottom = parseFloat(nodeStyles.getPropertyValue('padding-bottom'));
  const rect = new Rectangle({
    width: width - paddingLeft - paddingRight,
    height: height - paddingTop - paddingBottom,
    x: paddingLeft,
    y: paddingTop,
    name: '蒙层',
  });
  rect.hasClippingMask = true;

  const group = new Group({ x: left, y: top, name: '子元素' });
  group.layers.push(rect);
  group.addLayer(children);

  return group;
};
