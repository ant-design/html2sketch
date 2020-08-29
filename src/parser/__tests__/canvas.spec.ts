import { JSDOM } from 'jsdom';
import { parseCanvasToBitmap } from '../canvas';

describe('parseCanvasToBitmap', () => {
  describe('正常解析', () => {
    const dom = new JSDOM(`<canvas id="canvas" />`);
    const { document } = dom.window;

    it('传入空值 则返回未定义对象', () => {
      const img = document.getElementById('im') as HTMLCanvasElement;
      const imageLayer = parseCanvasToBitmap(img);
      expect(imageLayer).toBeUndefined();
    });
    it('传入不正确的节点 则返回未定义对象', () => {
      const img = document.getElementById('div') as HTMLCanvasElement;
      const imageLayer = parseCanvasToBitmap(img);
      expect(imageLayer).toBeUndefined();
    });

    it('可正常解析', () => {
      const img = document.getElementById('canvas') as HTMLCanvasElement;
      const imageLayer = parseCanvasToBitmap(img);
      expect(imageLayer?.url).toBeUndefined();
    });
  });

  describe('带有 URL 解析', () => {
    const dom = new JSDOM(`<canvas id="canvas" />`);
    const { document } = dom.window;

    it('可正常解析', () => {
      const img = document.getElementById('canvas') as HTMLCanvasElement;
      const imageLayer = parseCanvasToBitmap(img);
      expect(imageLayer?.url).toBeUndefined();
    });
  });
});
