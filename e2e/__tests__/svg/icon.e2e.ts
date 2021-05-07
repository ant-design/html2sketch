import {
  initHtml2Sketch,
  isUpdate,
  outputJSONData,
  svgButtonJSON,
  svgIconJSON,
} from '@e2e-utils';

describe('测试 Svg Icon', () => {
  test('Svg icon', async () => {
    const html2Sketch = await initHtml2Sketch();
    function selector(dom: Document) {
      return dom.getElementById('icons')!;
    }

    const symbol = await html2Sketch.nodeToSymbol('/svg/icon', selector);
    expect(symbol).toBeTruthy();

    if (isUpdate) {
      outputJSONData(symbol, 'svg-icon');
    }
    expect(symbol).toStrictEqual(svgIconJSON);
  }, 15000);

  test('svg button', async () => {
    const html2Sketch = await initHtml2Sketch();
    function selector(dom: Document) {
      return dom.getElementById('button')!;
    }

    const symbol = await html2Sketch.nodeToSymbol('/svg/icon', selector);
    expect(symbol).toBeTruthy();

    if (isUpdate) {
      outputJSONData(symbol, 'svg-button');
    }
    expect(symbol).toStrictEqual(svgButtonJSON);
  }, 15000);
});
