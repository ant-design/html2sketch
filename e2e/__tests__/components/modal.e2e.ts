import type SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { initHtml2Sketch, isUpdate, outputJSONData } from '@e2e-utils';

describe('测试 Modal 类型', () => {
  test('Modal 正常', async () => {
    const html2Sketch = await initHtml2Sketch({ debug: true });
    function selector(dom: Document) {
      const item = dom.getElementsByClassName('ant-modal')?.item(0);
      if (!item) throw Error('没找到 item');
      return item;
    }

    await html2Sketch.page.waitFor(3000);

    const symbol = await html2Sketch.nodeToSymbol(
      '/components/modal',
      selector,
    );
    expect(symbol).toBeTruthy();

    if (isUpdate) {
      outputJSONData(symbol, 'default-modal');
    }
    expect(symbol._class).toBe('symbolMaster');
    expect(symbol.groupLayout).toStrictEqual({
      _class: 'MSImmutableFreeformGroupLayout',
    });
    expect(symbol.name).toBe('Modal');
    expect(symbol.layers.length).toBe(5);

    const header = symbol.layers[1] as SketchFormat.Group;
    expect(header.groupLayout).toStrictEqual({
      _class: 'MSImmutableInferredGroupLayout',
      axis: 0,
      layoutAnchor: 0,
    });
  }, 30000);
});
