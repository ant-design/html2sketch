import Rectangle from '../Rectangle';

describe('Rectangle 类', function() {
  describe('toKonvaJSON 转换正常', function() {
    it('普通 Rectangle 转换正常', function() {
      const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
        },
        className: 'Rect',
      });
    });
    it('等圆角 Rectangle 转换正常', function() {
      const rect = new Rectangle({
        height: 100,
        width: 50,
        x: 280,
        y: 100,
        cornerRadius: 10,
      });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
          cornerRadius: 10,
        },
        className: 'Rect',
      });
    });
    it('不等圆角 Rectangle 转换正常', function() {
      const rect = new Rectangle({
        height: 100,
        width: 50,
        x: 280,
        y: 100,
        cornerRadius: {
          bottomLeft: 10,
          bottomRight: 2,
          topLeft: 3,
          topRight: 2,
        },
      });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
          cornerRadius: [3, 2, 2, 10],
        },
        className: 'Rect',
      });
    });
    it('不等圆角 Rectangle2 转换正常', function() {
      const rect = new Rectangle({
        height: 100,
        width: 50,
        x: 280,
        y: 100,
        cornerRadius: [10, 10, 2, 4],
      });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
          cornerRadius: [10, 10, 2, 4],
        },
        className: 'Rect',
      });
    });
  });
});
