import { useState } from 'react';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import copy from 'copy-to-clipboard';
import { nodeToGroup, nodeToSketchSymbol } from 'html2sketch';
import { message } from 'antd';

declare global {
  interface Window {
    DUMI_HTML2SKETCH: {
      nodeToSketchSymbol: any;
      nodeToGroup: any;
    };
  }
}

if (typeof window !== 'undefined') {
  window.DUMI_HTML2SKETCH = {
    nodeToSketchSymbol,
    nodeToGroup,
  };
}

const useSketchJSON = () => {
  const [sketchJSON, setJSON] = useState<object>();

  const parserFactory = async (
    elements: Element | Element[],
    parserFunc: (
      el: Element,
    ) => Promise<SketchFormat.Group | SketchFormat.SymbolMaster>,
  ) => {
    try {
      console.groupCollapsed('[html2sketch]开始转换...');
      let result;
      if (elements instanceof Array) {
        const objects: Object[] = [];

        Array.from(elements).forEach((el) => {
          const symbolJSON = parserFunc(el);
          objects.push(symbolJSON);
        });
        result = objects;
      } else {
        result = await parserFunc(elements);
      }
      console.groupEnd();
      console.log('解析结果:', result);
      copy(JSON.stringify(result));
      setJSON(result);
      message.success('转换成功🎉 已复制到剪切板');
      return result;
    } catch (e) {
      message.error('解析失败,请检查 Console 输出 😶');
      console.groupEnd();
      console.groupEnd();
      console.error('报错如下:');
      console.error(e);
    }
  };

  /**
   * 生成 Group 的方法
   * @param elements
   */

  return {
    sketchJSON,
    generateSymbol: async (elements: Element | Element[]) => {
      await parserFactory(elements, async (el: Element) =>
        (await nodeToSketchSymbol(el)).toSketchJSON(),
      );
    },
    generateGroup: async (elements: Element | Element[]) => {
      await parserFactory(elements, async (el: Element) =>
        (await nodeToGroup(el)).toSketchJSON(),
      );
    },
  };
};

export default useSketchJSON;
