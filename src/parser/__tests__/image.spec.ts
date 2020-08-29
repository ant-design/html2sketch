import { JSDOM } from 'jsdom';
import { Bitmap } from 'html2sketch';
import { parseToBitmap } from '../image';

describe('parseToBitmap', () => {
  const dom = new JSDOM(
    `    <div id="div"></div><img id='img' alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />`,
  );

  const { document } = dom.window;

  it('传入空值 则返回未定义对象', () => {
    const img = document.getElementById('im') as HTMLImageElement;
    const imageLayer = parseToBitmap(img);
    expect(imageLayer).toBeUndefined();
  });
  it('传入不正确的节点 则返回未定义对象', () => {
    const img = document.getElementById('div') as HTMLImageElement;
    const imageLayer = parseToBitmap(img);
    expect(imageLayer).toBeUndefined();
  });

  xit('可正常解析', () => {
    const img = document.getElementById('img') as HTMLImageElement;
    const imageLayer = parseToBitmap(img);
    expect((imageLayer as Bitmap)?.url).toBe(
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    );
  });
});
