import Style from 'html2sketch/model/Style/Style';

describe('Style 类', () => {
  describe('parserStyleString', () => {
    it('', () => {
      const string = 'fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65);';
      expect(Style.parserStyleString(string)).toBeTruthy();
    });
  });
});
