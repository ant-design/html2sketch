/* eslint-disable no-console */
import nodeToLayers from './nodeToLayers';
import { isNodeVisible } from '../utils/visibility';
import { getChildNodeList } from '../utils/hierarchy';
import { getName } from '../utils/name';
import { Group, Style, AnyLayer } from '../model';
import { isExistPseudoText, isExistPseudoShape } from '../utils/shape';

export interface Options {
  postTransform?: (group: AnyLayer) => AnyLayer;
  getGroupName: (node: Element) => string;
}
/**
 * 将一个节点和其包含的所有子级转为 Group 对象
 * @param node
 * @param options
 */
const nodeToGroup = (node: Element, options?: Options): AnyLayer => {
  if (!node) throw Error('解析对象不存在 请检查传入对象');

  const bcr = node.getBoundingClientRect();
  const { left, top } = bcr;
  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  const layers = nodeToLayers(node) || [];

  // ---------- 处理父节点 ------ //
  if (node.nodeName !== 'svg') {
    const childNodeList = getChildNodeList(node);

    // Recursively collect child groups for child nodes
    childNodeList.forEach((childNode) => {
      layers.push(nodeToGroup(childNode, options));

      // Traverse the shadow DOM if present
      if (childNode.shadowRoot) {
        Array.from(childNode.shadowRoot.children)
          .filter((n) => isNodeVisible(n))
          .map((n) => nodeToGroup(n))
          .forEach((layer) => layers.push(layer));
      }
    });
  }

  // Now build a group for all these children

  const styles = getComputedStyle(node);
  const { opacity } = styles;

  const group = new Group({ x: left, y: top, width, height });
  const groupStyle = new Style();

  groupStyle.opacity = opacity;
  group.style = groupStyle;

  layers
    .filter((l) => l)
    .forEach((layer) => {
      group.addLayer(layer);
    });

  // 处理多余的层级
  if (
    group.layers.length === 1 &&
    (group.layers[0].class === 'rectangle' ||
      group.layers[0].class === 'text' ||
      group.layers[0].class === 'svg' ||
      group.layers[0].class === 'group')
  ) {
    const layer = group.layers[0];
    console.log(
      `[nodeToSketchGroup]该 group 只包含一个子级 [${layer.class}]: ${layer.name} ,丢弃...`,
    );
    // 将父级的图层关系还给子集
    layer.x += group.x;
    layer.y += group.y;
    return layer;
  }

  if (
    group.layers.length === 0 &&
    !isExistPseudoText(node) &&
    !isExistPseudoShape(node)
  ) {
    console.log('[nodeToSketchGroup]该 group 是空的,丢弃...');
    // @ts-ignore
    // eslint-disable-next-line consistent-return
    return;
  }

  if (options && options.getGroupName) {
    group.name = options.getGroupName(node);
  } else {
    group.name = getName(node.nodeName);
  }

  group.className = node.className;

  return group;
};

export default nodeToGroup;
