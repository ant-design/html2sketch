import BaseShadow from '../../Base/BaseShadow';

const { shadowStringToObject, splitShadowString } = BaseShadow;
describe('Shadow 类', () => {
  describe('splitShadowString', function () {
    it('should return array of split shadowStrings', () => {
      const boxShadow =
        'rgb(0, 0, 0) 0px 0px 5px 2px, red 0px 0px 5px 2px inset, ' +
        '#0F0 0 0px 5px 2px, rgba(0, 0, 0, 0) 3.5px 1px 0 0';

      expect(splitShadowString(boxShadow)).toEqual([
        'rgb(0, 0, 0) 0px 0px 5px 2px',
        'red 0px 0px 5px 2px inset',
        '#0F0 0 0px 5px 2px',
        'rgba(0, 0, 0, 0) 3.5px 1px 0 0',
      ]);
    });

    it('只有一个阴影', () => {
      const boxShadow = 'rgb(0, 0, 0) 0px 0px 5px 2px';

      expect(splitShadowString(boxShadow)).toEqual([
        'rgb(0, 0, 0) 0px 0px 5px 2px',
      ]);
    });

    it('没有阴影', () => {
      const boxShadow = '';

      expect(splitShadowString(boxShadow)).toEqual([]);
    });

    it('多个阴影', () => {
      const boxShadow = 'rgb(0, 0, 0) 0px 0px 5px 2px';

      expect(splitShadowString(boxShadow)).toEqual([
        'rgb(0, 0, 0) 0px 0px 5px 2px',
      ]);
    });
  });
  describe('shadowStringToObject', function () {
    test('返回多个阴影', () => {
      const shadowString1 = 'rgb(0, 0, 0) 0px 0px 5px 2px';
      const shadowString2 = 'rgba(0, 0, 0, 0) 0px 0px 5.5px 2.2px inset';

      expect(shadowStringToObject(shadowString1)).toEqual({
        color: 'rgb(0, 0, 0)',
        offsetX: 0,
        offsetY: 0,
        blur: 5,
        spread: 2,
        inset: false,
      });
      expect(shadowStringToObject(shadowString2)).toEqual({
        color: 'rgba(0, 0, 0, 0)',
        offsetX: 0,
        offsetY: 0,
        blur: 5.5,
        spread: 2.2,
        inset: true,
      });
    });
  });
});
