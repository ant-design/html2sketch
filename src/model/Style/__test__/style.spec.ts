import Style from '../Style';

describe('Style 类', function () {
  describe('parserStyleString', function () {
    it('', function () {
      const string = 'fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65);';
      expect(Style.parserStyleString(string)).toBeTruthy();
    });
  });
});
