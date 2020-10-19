import { Frame } from 'html2sketch';

describe('Frame 类', () => {
  describe('正常生成 Frame ', () => {
    it('传参', () => {
      const frame = new Frame({ height: 100, width: 100, x: 5, y: 5 });
      expect(frame).toMatchSnapshot();
    });
    it('不传参', () => {
      const frame = new Frame();
      expect(frame).toMatchSnapshot();
    });
  });

  describe('调用方法', () => {
    it('get 方法 ', () => {
      const frame = new Frame({ height: 100, width: 100, x: 5, y: 5 });
      expect(frame.left).toBe(5);
      expect(frame.right).toBe(105);
      expect(frame.bottom).toBe(105);
      expect(frame.top).toBe(5);
    });
    it('set 方法 ', () => {
      const frame = new Frame({ height: 10, width: 10, x: 5, y: 5 });
      expect(frame.left).toBe(5);
      expect(frame.right).toBe(15);
      expect(frame.bottom).toBe(15);
      expect(frame.top).toBe(5);

      frame.left = 10;
      frame.top = 20;

      expect(frame.left).toBe(10);
      expect(frame.right).toBe(20);
      expect(frame.top).toBe(20);
      expect(frame.bottom).toBe(30);

      frame.right = 30;
      frame.bottom = 50;

      expect(frame.left).toBe(20);
      expect(frame.right).toBe(30);
      expect(frame.top).toBe(40);
      expect(frame.bottom).toBe(50);
    });
  });

  describe('center', () => {
    it('centerX', () => {
      const frame = new Frame({ height: 100, width: 100, x: 0, y: 0 });
      expect(frame.centerX).toBe(50);

      frame.centerX = 100;
      expect(frame.x).toBe(50);
    });
    it('centerY', () => {
      const frame = new Frame({ height: 100, width: 100, x: 0, y: 0 });
      expect(frame.centerY).toBe(50);

      frame.centerY = 100;
      expect(frame.y).toBe(50);
    });
  });

  describe('矩阵', () => {
    it('应用矩阵变换', () => {
      const frame = new Frame();

      frame.applyMatrix({
        a: 0.9659258262890683,
        b: 0.25881904510252074,
        c: -0.25881904510252074,
        d: 0.9659258262890683,
        e: 958.787513927271,
        f: 11.999797857406975,
      });
      expect(frame.x).toBe(958.787513927271);
      expect(frame.y).toBe(11.999797857406975);
      expect(frame.rotation).toBe(15);
    });
  });
  describe('ToSketchJSON', () => {
    it('不传参导出正常', () => {
      const frame = new Frame();
      expect(frame.toSketchJSON()).toStrictEqual({
        _class: 'rect',
        constrainProportions: false,
        height: 0,
        width: 0,
        x: 0,
        y: 0,
      });
    });
    it('传参导出正常', () => {
      const frame = new Frame({ height: 100, width: 100, x: 5, y: 5 });

      expect(frame.toSketchJSON()).toStrictEqual({
        _class: 'rect',
        constrainProportions: false,
        height: 100,
        width: 100,
        x: 5,
        y: 5,
      });
    });
  });
});
