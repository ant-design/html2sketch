import { initHtml2Sketch, isUpdate, outputJSONData } from './utils';
import SvgButton from './json/svg-button.json';

describe('测试 Svg的Group 和Button 类型', () => {
  test('生成符合预期的规范', async () => {
    const html2Sketch = await initHtml2Sketch();
    function selector(dom: Document) {
      return dom.getElementById('button')!;
    }

    const symbol = await html2Sketch.nodeToSketchSymbol(
      '/basic/svg-group',
      selector,
    );
    expect(symbol).toBeTruthy();
    expect(symbol).toMatchSnapshot();

    if (isUpdate) {
      outputJSONData(symbol, 'svg-button');
    }
    expect(symbol).toStrictEqual(SvgButton);
  });
});
