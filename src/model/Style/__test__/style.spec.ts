import Style from '../Style';

describe('Style 类', function() {
  describe('parserStyleString', function() {
    it('', function() {
      const string =
        'fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.65); text-rendering: optimizelegibility;';
      expect(Style.parserStyleString(string)).toStrictEqual({
        fill: '',
      });
    });
  });
});
