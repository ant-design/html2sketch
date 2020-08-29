import { initHtml2Sketch, isUpdate, outputJSONData } from './utils';
import SvgIcon from './json/svg-icon.json';

describe('测试 Svg icon 类型', () => {
  test('生成符合预期的规范', async () => {
    const html2Sketch = await initHtml2Sketch();
    function selector(dom: Document) {
      return dom.getElementById('icons')!;
    }

    const symbol = await html2Sketch.nodeToSketchSymbol('/basic/svg', selector);
    expect(symbol).toBeTruthy();
    expect(symbol).toMatchSnapshot();

    if (isUpdate) {
      outputJSONData(symbol, 'svg-icon');
    }
    expect(symbol).toStrictEqual(SvgIcon);
  });
});
