import { Page } from 'html2sketch';

describe('Page 类', () => {
  describe('Page 创建', () => {
    it('带参数创建', () => {
      const page = new Page({ width: 200, height: 100 });
      expect(page.toSketchJSON()).toMatchSnapshot();
    });
    it('不带参数创建', () => {
      const page = new Page();
      expect(page.toSketchJSON()).toMatchSnapshot();
    });
  });
  describe('toSketchJSON', () => {
    it('带参数生成', () => {
      const page = new Page({ width: 200, height: 100 });
      const json = page.toSketchJSON();
      expect(json._class).toBe('page');
      expect(json.frame.width).toEqual(200);
      expect(json.frame.height).toEqual(100);
      expect(json.frame.x).toEqual(0);
      expect(json.frame.y).toEqual(0);
    });
    it('不带参数生成', () => {
      const page = new Page();
      const json = page.toSketchJSON();
      expect(json._class).toBe('page');
      expect(json.frame.width).toEqual(0);
      expect(json.frame.height).toEqual(0);
      expect(json.frame.x).toEqual(0);
      expect(json.frame.y).toEqual(0);
    });
  });
});
