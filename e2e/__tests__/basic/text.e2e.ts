import {
  initHtml2Sketch,
  isUpdate,
  outputJSONData,
  textAlignmentJSON,
} from '@e2e-utils';

describe('测试文本解析问题', () => {
  test('文本对齐方式', async () => {
    const html2Sketch = await initHtml2Sketch();
    function selector(dom: Document) {
      return dom.getElementById('text-alignment')!;
    }

    const image = await html2Sketch.nodeToSymbol('/basic/text', selector);
    expect(image).toBeTruthy();

    if (isUpdate) {
      outputJSONData(image, 'text-alignment');
    }
    expect(image).toStrictEqual(textAlignmentJSON);
  }, 30000);
});
