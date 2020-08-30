import { Group, Style } from '../model';
import { getName } from '../utils/name';

export const parseToGroup = (node: Element) => {
  const bcr = node.getBoundingClientRect();
  const x = bcr.left;
  const y = bcr.top;

  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  const styles = getComputedStyle(node);
  const { opacity } = styles;

  const group = new Group({ x, y, width, height });
  const groupStyle = new Style();

  groupStyle.opacity = opacity;
  group.style = groupStyle;

  // Set the group name to the node's name, unless there is a name provider in the options
  group.name = getName(node.nodeName);

  group.mapBasicInfo(node);
  return group;
};
