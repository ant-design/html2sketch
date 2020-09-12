import { initHtml2Sketch, isUpdate, outputJSONData } from './utils';
import inlineImage from './json/inline-image.json';
import pngUrl from './json/png-url-image.json';

describe('测试图片', () => {
  test('inline 的图片类型正常', async () => {
    const html2Sketch = await initHtml2Sketch();
    function selector(dom: Document) {
      return dom.getElementById('inline-img')!;
    }

    const image = await html2Sketch.nodeToSketchSymbol(
      '/basic/image',
      selector,
    );
    expect(image).toBeTruthy();

    if (isUpdate) {
      outputJSONData(image, 'inline-image');
    }
    expect(image).toStrictEqual(inlineImage);
  });

  test('PNG图片链接类型正常', async () => {
    const html2Sketch = await initHtml2Sketch();
    function selector(dom: Document) {
      return dom.getElementById('png-url')!;
    }

    const image = await html2Sketch.nodeToSketchSymbol(
      '/basic/image',
      selector,
    );
    expect(image).toBeTruthy();

    if (isUpdate) {
      outputJSONData(image, 'png-url-image');
    }
    expect(image).toStrictEqual(pngUrl);
  }, 30000);
});
