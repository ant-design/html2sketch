import Color from 'html2sketch/models/Style/Color';

describe('Color 类', () => {
  describe('正常创建', () => {
    it('初始化颜色为黑色', () => {
      const color = new Color();

      expect(color.hex).toBe('#000000');
    });
    it('支持数组', () => {
      const color = new Color([20, 30, 40]);

      expect(color.rgba).toBe('rgba(20,30,40,1)');
    });
    it('支持 rgb + 不透明度', () => {
      const color = new Color('rgb(100,200 ,200) 10%');
      expect(color.rgba).toBe('rgba(100,200,200,0.1)');
      const color2 = new Color('rgb(242, 242, 242) 25%');
      expect(color2.rgba).toBe('rgba(242,242,242,0.25)');
    });
  });
  describe('调用方法正常', () => {
    const inputColor = 'rgba(50,50,10,0.5)';
    const color = new Color(inputColor);
    it('rgba', () => {
      expect(color.rgba).toBe('rgba(50,50,10,0.5)');
    });
    it('alpha', () => {
      expect(color.alpha).toBe(0.5);
    });
    it('red', () => {
      expect(color.red).toBe(50);
    });
    it('green', () => {
      expect(color.green).toBe(50);
    });
    it('blue', () => {
      expect(color.blue).toBe(10);
    });
    it('hue', () => {
      expect(color.hue).toBe(60);
    });
    it('saturation', () => {
      expect(color.saturation).toBe(80);
    });
    it('brightness', () => {
      expect(color.brightness).toBe(19.607843137254903);
    });
    it('b', () => {
      expect(color.b).toBe(23.983300680602255);
    });
    it('l', () => {
      expect(color.l).toBe(19.968562554120787);
    });
    it('lightness', () => {
      expect(color.lightness).toBe(11.76470588235294);
    });
    it('value', () => {
      expect(color.value).toBe(19.607843137254903);
    });
    it('saturationl', () => {
      expect(color.saturationl).toBe(66.66666666666666);
    });
    it('s', () => {
      expect(color.s).toBe(80);
    });
    it('saturationv', () => {
      expect(color.saturationv).toBe(80);
    });
  });

  describe('toJSON', () => {
    it('正常解析', () => {
      const color = new Color('rgb(50,50,10)');
      expect(color.toJSON()).toStrictEqual({ r: 50, g: 50, b: 10, a: 1 });
    });
  });
  describe('toSketchJSON', () => {
    it('正常解析', () => {
      const color = new Color();

      expect(color.toSketchJSON()).toMatchSnapshot();
    });
  });
});
