import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { message } from 'antd';
import copy from 'copy-to-clipboard';
import { nodeToGroup, nodeToSymbol } from 'html2sketch';
import { useState } from 'react';

declare global {
  interface Window {
    DUMI_HTML2SKETCH: {
      nodeToSymbol: any;
      nodeToGroup: any;
    };
  }
}

if (typeof window !== 'undefined') {
  window.DUMI_HTML2SKETCH = {
    nodeToSymbol,
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

        for (let i = 0; i < elements.length; i += 1) {
          const el = elements[i];
          // eslint-disable-next-line no-await-in-loop
          const symbolJSON = await parserFunc(el);
          objects.push(symbolJSON);
        }

        result = objects;
      } else {
        result = await parserFunc(elements);
      }
      console.groupEnd();
      console.log('解析结果:', result);
      copy(JSON.stringify(result));
      setJSON(result);
      await message.success('转换成功🎉 已复制到剪切板');
      return result;
    } catch (e) {
      await message.error('解析失败,请检查 Console 输出 😶');
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
        (await nodeToSymbol(el)).toSketchJSON(),
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
