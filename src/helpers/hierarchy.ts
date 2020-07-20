import { isNodeVisible } from './visibility';

/**
 * 获得显示顺序的的子级节点列表
 */
export const getChildNodeList = (node: Element) =>
  Array.from(node.children)
    .filter((node) => isNodeVisible(node))
    // 根据 z-index 排序 将顶上的元素放上面
    .sort((a, b) => {
      const computedA = getComputedStyle(a).zIndex,
        computedB = getComputedStyle(b).zIndex,
        zIndexA = isNaN(Number(computedA)) ? 0 : +computedA,
        zIndexB = isNaN(Number(computedB)) ? 0 : +computedB;

      return zIndexA - zIndexB;
    });

/**
 * 对 Node 进行排序
 * @param nodes
 */
export const orderNodeList = (nodes: Element[]) => {
  return (
    Array.from(nodes)
      .filter((node) => isNodeVisible(node))
      // 根据 z-index 排序 将顶上的元素放上面
      .sort((a, b) => {
        const computedA = getComputedStyle(a).zIndex,
          computedB = getComputedStyle(b).zIndex,
          zIndexA = isNaN(Number(computedA)) ? 0 : +computedA,
          zIndexB = isNaN(Number(computedB)) ? 0 : +computedB;

        return zIndexA - zIndexB;
      })
  );
};
