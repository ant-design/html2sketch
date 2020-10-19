import Gradient from 'html2sketch/models/Style/Gradient';

describe('Gradient 类', () => {
  describe('线性渐变', () => {
    it('默认创建', () => {
      const gradient = new Gradient();
      expect(gradient.name).toBe('gradient');
    });
    it('三色渐变', () => {
      const gradient = new Gradient({ stops: ['yellow', 'red', 'green'] });
      expect(gradient.stops.length).toBe(3);
      expect(gradient.toSketchJSON().stops).toStrictEqual([
        {
          _class: 'gradientStop',
          color: {
            _class: 'color',
            alpha: 1,
            blue: 0,
            green: 1,
            red: 1,
          },
          position: 0,
        },
        {
          _class: 'gradientStop',
          color: {
            _class: 'color',
            alpha: 1,
            blue: 0,
            green: 0,
            red: 1,
          },
          position: 0.5,
        },
        {
          _class: 'gradientStop',
          color: {
            _class: 'color',
            alpha: 1,
            blue: 0,
            green: 0.5019607843137255,
            red: 0,
          },
          position: 1,
        },
      ]);
    });
  });
  describe('圆形渐变', () => {});
});
