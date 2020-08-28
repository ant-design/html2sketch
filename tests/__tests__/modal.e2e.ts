import { initHtml2Sketch, isUpdate, outputJSONData, waitTime } from './utils';
import DefaultModalJSON from './json/default-modal.json';

describe('测试 Modal 类型', () => {
  test('Modal 正常', async () => {
    const html2Sketch = await initHtml2Sketch();
    // 需要等待网页加载完毕
    await waitTime(3000);

    function selector(dom: Document) {
      return dom.getElementsByClassName('ant-modal')?.item(0)!;
    }

    const symbol = await html2Sketch.nodeToSketchSymbol(
      '/basic/modal',
      selector,
    );
    expect(symbol).toBeTruthy();
    expect(symbol).toMatchSnapshot();

    if (isUpdate) {
      outputJSONData(symbol, 'default-modal');
    }
    expect(symbol).toStrictEqual(DefaultModalJSON);
  }, 15000);
});
